import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  //Initializes the notes state variable as an empty array.
  //notes Holds the list of all notes in the app.
  //setNotes is a function to update the notes state.
  const [notes, setNotes] = useState([]);

  //A function to add a new note to the state.
  //newNote: The note object (with properties like title and content) passed as an argument.
  function addNote(newNote) {
    //setNotes: Updates the state by appending newNote to the existing notes array.
    //prevNotes: The previous state of notes.
    setNotes((prevNotes) => {
      //Combines the previous notes with the new note using the spread operator (...).
      return [...prevNotes, newNote];
    });
  }

  //function to delete note, id: The index of the note to be deleted.
  function deleteNote(id) {
    //setNotes: Updates the state by filtering out the note with the given id.
    setNotes((prevNotes) => {
      //prevNotes.filter: Creates a new array containing only the notes that don’t match the id.
      return prevNotes.filter((noteItem, index) => {
        //keeps all notes except the one with the specified id clicked
        return index != id;
      });
    });
  }

  return (
    <div>
      <Header />
      <h1>Hi Dreamer!</h1>
      <h2>Load your thoughts in here</h2>
      <CreateArea onAdd={addNote} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
