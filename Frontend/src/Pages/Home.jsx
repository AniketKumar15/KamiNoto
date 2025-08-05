import React, { useContext, useEffect } from "react";
import { Laptop } from "lucide-react"

import NoteContext from "../Contexts/NotesContext/NoteContext";

const Home = () => {
    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;



    useEffect(() => {
        getAllNotes();
    }, []);

    const uniqueTags = [...new Set(notes.map(note => note.tags))];
    const totalTags = uniqueTags.length;


    return (
        <div className="pt-21 px-6 pb-6 bg-gray-200 text-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 ml-10 flex items-center gap-2"><Laptop size={32} /> Dashboard</h2>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Total Notes", value: notes.length },
                    { label: "Pinned Notes", value: notes.filter(note => note.isPinned).length },
                    { label: "Folders", value: 3 },
                    { label: "Tags", value: totalTags },
                ].map(({ label, value }) => (
                    <div
                        key={label}
                        className="bg-white p-4 rounded-xl border shadow transition-all hover:shadow-lg hover:scale-105"
                    >
                        <p className="text-sm text-gray-500">{label}</p>
                        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
                    </div>
                ))}
            </div>

            {/* Pinned Notes */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">📌 Pinned Notes</h3>
                {notes && notes.filter(note => note.isPinned).length > 0 ?
                    (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[...notes].filter(note => note.isPinned).slice(0, 3).map((note) => (
                            <div
                                key={note._id}
                                className="p-4 bg-yellow-100 dark:bg-yellow-200 rounded-xl shadow transition-all hover:shadow-lg hover:scale-105"
                            >
                                <h4 className="font-medium text-gray-800 truncate">{note.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{note.description}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(note.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>) :
                    (<div className="text-center text-gray-500 text-lg mt-10">
                        📭 No Pinned notes available. Start by Pinned one note!
                    </div>)
                }
            </section>

            {/* Recently Updated */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">🕘 Recently Added</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...notes]
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by newest first
                        .slice(0, 3) // Get top 3
                        .map((note) => (
                            <div
                                key={note._id}
                                className="p-4 bg-blue-100 dark:bg-blue-200 rounded-xl shadow transition-all hover:shadow-lg hover:scale-105"
                            >
                                <h4 className="font-medium text-gray-800 truncate">{note.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{note.description}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(note.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        ))}
                </div>
            </section>

            {/* Quick Access (Folders) */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">📂 Quick Access</h3>
                <div className="flex gap-4 flex-wrap">
                    {["School", "Projects", "Personal"].map((folder) => (
                        <div
                            key={folder}
                            className="bg-white px-6 py-3 rounded-xl border dark:border-gray-700 shadow transition-all hover:shadow-lg hover:scale-105 cursor-pointer text-gray-800 font-medium"
                        >
                            {folder}
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Tags */}
            <section>
                <h3 className="text-lg font-semibold mb-2">🏷️ Top Tags</h3>
                <div className="flex gap-3 flex-wrap">
                    {Object.entries(
                        notes.reduce((acc, note) => {
                            acc[note.tags] = (acc[note.tags] || 0) + 1;
                            return acc;
                        }, {})
                    )
                        .sort((a, b) => b[1] - a[1]) // sort descending by count
                        .slice(0, 3) // take top 3
                        .map(([tags, count]) => (
                            <span
                                key={tags}
                                className="bg-green-200 text-green-900 px-4 py-1 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:scale-105"
                            >
                                #{tags} ({count})
                            </span>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
