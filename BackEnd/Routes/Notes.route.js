import express, { Router } from "express";
import fetchUser from "../Middleware/FetchUser.middleware.js";
import { Note } from "../Models/Notes.model.js";
import { body, validationResult } from "express-validator";

const router = Router();

// ROUTE 1 : Fetch all notes using GET request
// Endpoint: /api/notes/fetchAllNotes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        // console.error("Error fetching notes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ROUTE 2 : Add a new note using POST request
// Endpoint: /api/notes/addNote
router.post("/addNote", fetchUser, [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // Validate the request body against the defined validation rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tags } = req.body;

        const note = new Note({
            title,
            description,
            tags,
            user: req.user.id // Associate the note with the logged-in user
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        // console.error("Error saving note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// ROUTE 3 : Update an existing note using PUT request
// Endpoint: /api/notes/updateNote/:id

router.put("/updateNote/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tags) { newNote.tags = tags; }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to update this note" });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

})

// ROUTE 4 : Delete a note using Delete request
// Endpoint: /api/notes/deleteNote/:id
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to delete this note" });
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted", note: note });

    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// ROUTE 5 : Pinned a note
// PUT /api/notes/togglePin/:id
router.put("/togglePin/:id", fetchUser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).send("Note not found");
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Toggle the pin
        note.isPinned = !note.isPinned;
        await note.save();

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;