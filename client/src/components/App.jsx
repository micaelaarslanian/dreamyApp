import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
    //Initializes the notes state variable as an empty array.
    //notes Holds the list of all notes in the app.
    //setNotes is a function to update the notes state.
    const [notes, setNotes] = useState([]);

    //Fetch all notes from backend on initial render
    useEffect(() => {
        console.log("Fetching notes from backend...");
        axios
            .get("http://localhost:5050/notes")
            .then((res) => setNotes(res.data))
            .catch((err) => console.error("Error fetching notes:", err));
    }, []);


    //adds note to backend
    //newNote: The note object to be added.
    //This function sends a POST request to the backend with the new note data.
    function addNote(newNote) {
        console.log("Sending note to backend: ", newNote);
        axios
            .post("http://localhost:5050/notes", newNote)
            .then((res) => {
                console.log("Backend response: ", res.data);
                setNotes((prevNotes) => [...prevNotes, res.data]);
            })
            .catch((err) => console.error("Error saving note: ", err));
    }


    function deleteNote(id) {
        console.log("Deleting note with id: ", id);
        axios
            //sends a DELETE request to the backend to delete the note with the specified id.
            .delete(`http://localhost:5050/notes/${id}`)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            })
            .catch((err) => console.error("Error deleting note: ", err));
    }

    function updateNote(updatedNote) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
    }



    return (
        <div>
            <Header />
            <div className="title-container">
                <h1>Wake. Recall. Reflect. </h1>
                <h2>Your dreams hold meaning. Log them here—every detail, every feeling—as soon as you wake up. <br></br> Start building a map of your inner world.</h2>
            </div>
            <CreateArea onAdd={addNote} />

            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={noteItem.id}
                        id={noteItem.id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        onEdit={updateNote}
                    />
                );
            })}
        </div>
    );
}

export default App;
