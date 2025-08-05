import React, { useContext, useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";

import NoteContext from "../Contexts/NotesContext/NoteContext";
import NotesItem from "../Components/NotesItem";
import Alert from "../Components/Alert";
import AuthContext from "../Contexts/AuthContext/AuthContext";
const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;

    const { isAuthenticated } = useContext(AuthContext);

    const [alert, setAlert] = useState(null);
    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const onDeleteAlert = () => {
        showAlert("success", "Note deleted successfully!");
    };
    const OnUpdateAlert = () => {
        showAlert("info", "Note updated successfully!");
    };
    const onPinnedAlert = () => {
        showAlert("info", "Note Pinned successfully!");
    }
    const onUnPinnedAlert = () => {
        showAlert("info", "Note Unpinned successfully!");
    }
    useEffect(() => {
        if (isAuthenticated)
            getAllNotes();
    }, [isAuthenticated]);


    return (
        <>
            <div className="pt-21 px-6 pb-6 bg-gray-200 text-gray-900 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 ml-10 flex items-center gap-2"><NotebookPen size={32} /> All Notes</h2>
                {notes.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg mt-10">
                        📭 No notes available. Start by adding one!
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {[...notes.filter(n => n.isPinned), ...notes.filter(n => !n.isPinned)].map((note) => {
                            return <NotesItem key={note._id} note={note} onDelete={onDeleteAlert} onUpdate={OnUpdateAlert} onPinnedAlert={onPinnedAlert} onUnPinnedAlert={onUnPinnedAlert} />
                        })}
                    </div>
                )}
            </div>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    duration={3000}
                    onClose={() => setAlert(null)}
                />
            )}
        </>
    );
};

export default Notes;
