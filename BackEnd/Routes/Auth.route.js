// Auth.route.js
// This file defines authentication-related routes for the application using Express Router.
// It currently handles user sign-up with input validation and error handling.
import { Router } from "express";
import { User } from "../Models/User.model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../Middleware/FetchUser.middleware.js";

const router = Router();

// POST /sign-up
// Registers a new user after validating input fields (fullName, email, password).
// - Checks for minimum length and valid email format.
// - Returns 400 if validation fails.
// - Returns 409 if email already exists.
// - Returns 201 on successful registration.
// - Returns 500 for server errors.

// ROUTE 1 :  Route to handle user sign-up to create a new user account -> No Login required
router.post("/sign-up", [
    // Input validation using express-validator in middleware
    body("fullName")
        .isLength({ min: 6 })
        .withMessage("Full name must be at least 6 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
], async (req, res) => {
    // Validate the request body against the defined validation rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already in use" });
        }

        // Make a salt and hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance and save it to the database
        const user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        })

        // Add jwt token generation
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = process.env.JWT_TOKEN_SECRET;
        const authToken = jwt.sign(data, JWT_SECRET);

        res.status(201).json({ authToken });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// ROUTE 2 : Authenticate user login using email and password -> No Login required
router.post("/login", [
    // Input validation using express-validator in middleware
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").exists().withMessage("Password is required"),
], async (req, res) => {
    // Validate the request body against the defined validation rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;
    try {
        // Check if the user exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // Compare the provided password with the hashed password in the database
        const passwordCompare = await bcrypt.compare(password, user.password);
        // If password comparison fails, return an error
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // If login is successful, generate a JWT token
        // The token will include the user's ID in the payload
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = process.env.JWT_TOKEN_SECRET; // Ensure JWT_SECRET is set in your environment variables
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ authToken, message: "Login successful", user: { fullName: user.fullName, email: user.email } });

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }

});


// ROUTE 3 : Route to get the logged In user details -> Login Required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the request object set by fetchUser middleware
        const user = await User.findById(userId).select("-password");
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
});

// ROUTE 4 : Route to update the user info (like : fullname, email, password)
router.put("/updateuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the request object set by fetchUser middleware
        let user = await User.findById(userId);
        const { fullName, email, password } = req.body;

        const newUserInfo = {};
        if (fullName) { newUserInfo.fullName = fullName; }
        if (email) { newUserInfo.email = email; }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            newUserInfo.password = await bcrypt.hash(password, salt);
        }

        user = await User.findByIdAndUpdate(userId, { $set: newUserInfo }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
})


export default router;
