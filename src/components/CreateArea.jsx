import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpansion] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // this function handles user input in the form.
  function handleChange(event) {
    //destructuring the event. name is the name of the field (ej: title, content)
    //value is the current value the user typed in
    const { name, value } = event.target;
    //updates the state (note) without overwriting the entire object.
    //prevNote is the current state before the change
    setNote((prevNote) => {
      //...prevNote copies all existing fields in the state
      //name:value updates only the field that changed
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function expand(event) {
    //conditionally render the 'write your dream....' area.
    //if button is clicked: change rows to 3 , 'take a note' displays, show the + button, and fab is set to true.
    console.log("clicked");
    setExpansion(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Write your dream..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded ? true : false}>
          <button onClick={submitNote}>
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
