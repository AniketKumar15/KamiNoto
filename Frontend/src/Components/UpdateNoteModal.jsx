import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../Contexts/NotesContext/NoteContext";

const UpdateNoteModal = ({ note, onClose, OnUpdate }) => {
    const { updateNote } = useContext(NoteContext);

    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [tags, setTags] = useState(note.tags || "General");

    const handleSubmit = (e) => {
        e.preventDefault();
        OnUpdate()
        updateNote(note._id, title, description, tags);
        onClose(); // close modal after update
    };
    const tagColors = {
        General: "bg-white text-slate-800 border border-gray-400",
        Work: "bg-blue-100 text-blue-800 border border-blue-300",
        Study: "bg-purple-100 text-purple-800 border border-purple-300",
        Personal: "bg-green-100 text-green-800 border border-green-300",
        Ideas: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        Health: "bg-lime-300 text-green-900 border border-lime-600",
        Important: "bg-red-100 text-red-800 border border-red-300",
        Other: "bg-pink-100 text-pink-800 border border-pink-300"

    };
    return (
        <>
            <div className="inset-0 flex items-center justify-center z-50 absolute bg-white/30 backdrop-blur-xs top-18 h-[calc(100vh-75px)]">
                <div className={`${tagColors[note.tags] || "bg-gray-200 text-gray-800"} rounded-xl shadow-lg p-6 w-full max-w-md`}>
                    <h2 className="text-xl font-semibold mb-4">✏️ Update Note</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            rows="4"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <select
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            {["General", "Work", "Study", "Personal", "Ideas", "Health", "Important", "Other"].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateNoteModal;
