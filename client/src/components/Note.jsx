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
        <div className="note">
            {isEditing ? (
                <form form className="edit-form">
                    <input
                        name="title"
                        value={editedNote.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                    <textarea
                        name="Main theme"
                        value={editedNote.content}
                        onChange={handleInputChange}
                        placeholder="What did you dream?"
                        rows={6}
                    />
                    <button type="button" onClick={handleSaveClick}>
                        <SaveIcon />
                    </button>
                </form>
            ) : (
                <>
                    <h1>{props.title}</h1>
                    <p>{props.content}</p>

                    <button onClick={handleEditClick}>
                        <EditIcon />
                    </button>

                    <button onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </button>

                </>
            )}
        </div>
    );
}

export default Note;
