import { Schema, model } from "mongoose";

const notesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    tags: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Note = model("Note", notesSchema);