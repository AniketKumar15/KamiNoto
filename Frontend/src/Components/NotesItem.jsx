import React, { useContext, useState } from "react";
import { Pencil, Trash2, Pin, PinOff } from "lucide-react";
import NoteContext from "../Contexts/NotesContext/NoteContext";
import UpdateNoteModal from "./UpdateNoteModal";

const NotesItem = (props) => {

    const [showModal, setShowModal] = useState(false);
    const context = useContext(NoteContext);
    const { deleteNote, togglePin } = context;

    const { note, onDelete, onUpdate, onPinnedAlert, onUnPinnedAlert } = props;

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
            <div className="break-inside-avoid mb-4">
                <div className={`${tagColors[note.tags] || "bg-gray-200 text-gray-800"} rounded-xl p-4 shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02] min-h-[180px] flex flex-col justify-between`}>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            {note.title}
                            <button onClick={() => {
                                togglePin(note._id);
                                if (!note.isPinned)
                                    onPinnedAlert();
                                else
                                    onUnPinnedAlert();
                            }} title={note.isPinned ? "Unpin" : "Pin"}>
                                {note.isPinned ? <PinOff size={15} /> : <Pin size={15} />}
                            </button>
                        </h3>
                        <p className="text-sm">{note.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-600">{new Date(note.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}</span>
                        <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <span>🏷️</span>
                            <span>{note.tags || "No Tag"}</span>
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="p-1.5 rounded-full bg-black hover:bg-orange-500 transition-colors"
                                title="Edit"
                            >
                                <Pencil size={15} className="text-gray-100" />
                            </button>
                            <button
                                onClick={() => {
                                    deleteNote(note._id);
                                    onDelete()
                                }}
                                className="p-1.5 rounded-full bg-black hover:bg-red-200 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={15} className="text-white hover:text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            {showModal && (
                <UpdateNoteModal
                    note={note}
                    onClose={() => setShowModal(false)}
                    OnUpdate={() => onUpdate()}
                />
            )
            }
        </>
    );
};

export default NotesItem;
