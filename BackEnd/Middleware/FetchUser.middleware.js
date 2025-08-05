import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = data.user; // Attach user data to the request object
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default fetchUser;