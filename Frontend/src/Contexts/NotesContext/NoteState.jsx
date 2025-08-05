import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const AllNotes = [];

    const [notes, SetNotes] = useState(AllNotes);
    const hostUrl = "http://localhost:5000"
    // const tempAuth_token = localStorage.getItem("token");

    const getAllNotes = async () => {
        try {
            const response = await fetch(`${hostUrl}/api/notes/fetchAllNotes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });

            const data = await response.json();

            if (response.ok) {
                SetNotes(data);
            } else {
                console.error("Failed to fetch notes:", data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching notes:", error.message);
        }

    }

    // ADD NOTE FUNCTION
    const addNewNote = async (title, description, tags) => {
        try {
            const response = await fetch(`${hostUrl}/api/notes/addNote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tags })
            });

            const newNote = await response.json();

            // Optionally check for response.ok to confirm success
            if (response.ok) {
                SetNotes((prevNotes) => [...prevNotes, newNote]);
            } else {
                console.error("Failed to add note:", newNote.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    }

    // DELETE NOTE FUNCTION
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${hostUrl}/api/notes/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });

            const result = await response.json();

            if (response.ok) {
                // Update local state only after successful deletion
                const updatedNotes = notes.filter((note) => note._id !== id);
                SetNotes(updatedNotes);
            } else {
                console.error("Failed to delete note:", result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    }

    // UPDATE NOTE FUNTION
    const updateNote = async (id, title, description, tags) => {
        try {
            const response = await fetch(`${hostUrl}/api/notes/updateNote/${id}`, {
                method: "PUT", // or PATCH depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tags }) // assuming tag is singular
            });

            const updatedNote = await response.json();

            if (response.ok) {
                // Update the note in the local state
                SetNotes(prevNotes =>
                    prevNotes.map(note =>
                        note._id === id ? updatedNote : note
                    )
                );
            } else {
                console.error("Failed to update note:", updatedNote.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    // Pin and unpin the note
    const togglePin = async (id) => {
        try {
            const response = await fetch(`${hostUrl}/api/notes/togglePin/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });

            const updatedNote = await response.json();

            SetNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, isPinned: updatedNote.isPinned } : note
                )
            );
        } catch (error) {
            console.error("Failed to toggle pin:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, getAllNotes, updateNote, togglePin }}>
            {props.children}
        </NoteContext.Provider>

    );
};

export default NoteState;
