import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
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
        <div className="min-h-screen bg-[ghostwhite] overflow-x-hidden pb-16">
            <Header />

            {/* Title block is always centered and in the middle of the page.  */}
            <div className="max-w-3xl mt-20 mx-auto px-10 pb-6">
                <h1 className="font-[Forum] text-center text-3xl sm:text-4xl font-semibold text-[#557791]">
                    Wake. Recall. Reflect.
                </h1>
                <h2 className="font-[Forum] text-center text-xl sm:text-2xl font-light text-[#2d413f] mt-6">
                    Your dreams hold meaning. <br />
                    Log them here: every detail, every feeling—as soon as you wake up.{" "}
                    <br />
                    Start building a map of your inner world.
                </h2>
            </div>

            <CreateArea onAdd={addNote} />

            {/* Responsive notes grid */}
            <div className="max-w-6xl mx-auto px-10 mt-10 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((noteItem) => (
                    <Note
                        key={noteItem.id}
                        id={noteItem.id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        onEdit={updateNote}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default App;
