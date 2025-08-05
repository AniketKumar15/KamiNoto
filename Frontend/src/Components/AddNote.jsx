import React, { useState, useContext } from "react";
import { Plus, X } from "lucide-react";
import NoteContext from "../Contexts/NotesContext/NoteContext";
import Alert from "./Alert";

const AddNote = () => {

    const context = useContext(NoteContext);
    const { addNewNote } = context;

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Form state (optional for later connection to context/API)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewNote(title, description, tag || "General");
        triggerAlert()
        // Add logic to add the note to context/database
        setTitle("");
        setDescription("");
        setTag("");
        setIsOpen(false); // Close panel after submit
    };

    const [showAlert, setShowAlert] = useState(false);

    const triggerAlert = () => {
        setShowAlert(true);
    };
    return (
        <>
            {/* Toggle Button */}
            <button
                className="fixed bottom-10 right-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
                onClick={toggleSidebar}
                aria-label="Toggle Add Note"
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={24} /> : <Plus size={24} />}
            </button>

            {/* Slide-up Form Panel */}
            <aside
                className={`h-[440px] w-[90%] sm:w-96 bg-gray-900 text-white rounded-2xl shadow-xl fixed bottom-10 right-4 z-40 transform transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100" : "scale-0"
                    }`}
            >
                <form onSubmit={handleSubmit} className="flex flex-col p-5 space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-2">
                        📝 Add New Note
                    </h3>

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Note Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="px-4 py-2 h-24 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                    ></textarea>

                    {/* Tag */}
                    <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                    >
                        <option value="">Select Tag</option>
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Study">Study</option>
                        <option value="Personal">Personal</option>
                        <option value="Ideas">Ideas</option>
                        <option value="Important">Important</option>
                        <option value="Other">Other</option>

                    </select>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition"
                    >
                        Add Note
                    </button>
                </form>
            </aside>
            {showAlert && (
                <Alert
                    type="success"
                    message="Note added successfully!"
                    duration={3000}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </>
    );
};

export default AddNote;
