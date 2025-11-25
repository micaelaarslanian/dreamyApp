import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";


function Note(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState({
        title: props.title,
        content: props.content,
    });


    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditedNote((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    function handleSaveClick() {
        axios
            .put(`http://localhost:5050/notes/${props.id}`, editedNote)
            .then((response) => {
                props.onEdit(response.data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error updating note:", error);
            });
    }


    return (
        <div className="bg-white rounded-lg shadow-md px-6 py-10 mb-16 flex flex-col justify-between">
            {isEditing ? (
                <form className="space-y-3">
                    <input
                        name="title"
                        value={editedNote.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-lg font-[Forum] outline-none focus:ring-2 focus:ring-[#557791] focus:border-transparent"
                    />
                    <textarea
                        name="content"
                        value={editedNote.content}
                        onChange={handleInputChange}
                        placeholder="What did you dream?"
                        rows={6}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-lg font-[Forum] outline-none resize-none focus:ring-2 focus:ring-[#557791] focus:border-transparent"
                    />
                    <button
                        type="button"
                        onClick={handleSaveClick}
                        className="mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#557791] text-[#efedc0] shadow-sm hover:bg-[#3c5569] transition"
                    >
                        <SaveIcon fontSize="small" />
                    </button>
                </form>
            ) : (
                <>
                    <h1 className="text-2xl font-bold font-[Forum] text-[#2d413f] mb-2 break-words hyphens-auto">
                        {props.title}
                    </h1>
                    <p className="text-xl font-[Forum] text-gray-800 whitespace-pre-wrap break-words hyphens-auto mb-4">
                        {props.content}
                    </p>

                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={handleEditClick}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[#557791] hover:bg-[#3c5569] hover:text-[#efedc0] transition"
                        >
                            <EditIcon fontSize="small" />
                        </button>

                        <button
                            onClick={handleDeleteClick}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[#557791] hover:bg-red-600 hover:text-[#efedc0] transition"
                        >
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Note;
