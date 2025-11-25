import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

function CreateArea(props) {
    const [isExpanded, setExpansion] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
        content: "",
    })

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

        // validate field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === "" ? "This field is required" : ""
        }));

    }

    function expand(event) {
        //conditionally render the 'write your dream....' area.
        //if button is clicked: change rows to 3 , 'take a note' displays, show the + button, and fab is set to true.
        console.log("clicked");
        setExpansion(true);
    }

    // FUNCTION TO SUBMIT THE NOTE TO THE BACKEND
    function submitNote(event) {
        event.preventDefault();

        // Validate the note before submitting
        const newErrors = {
            // Check if title or content is empty and set error messages accordingly
            title: note.title.trim() === "" ? "This field is required" : "",
            content: note.content.trim() === "" ? "This field is required" : "",
        };

        // Update the errors state with the new errors
        // This will trigger re-rendering and display error messages if any
        // If there are no errors, the note will be submitted
        // If there are errors, the note will not be submitted
        setErrors(newErrors);

        // Check if there are any errors
        // Object.values(newErrors) returns an array of error messages
        // some() checks if at least one error message is not an empty string
        // If there are errors, we return early and do not submit the note
        // If there are no errors, we proceed to submit the note
        const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
        if (hasErrors) return;

        console.log("Submitting note: ", note);
        // Call the onAdd function passed from the parent component
        // This function is responsible for adding the note to the list of notes
        props.onAdd(note);

        // Reset the note state to clear the form after submission
        // This will clear the input fields and reset the form
        setNote({ title: "", content: "" });
        setErrors({ title: "", content: "" });
    }



    return (
        <div className="px-10">
            <form className="relative max-w-[720px] mx-auto mt-10 mb-4  px-6  py-4 bg-white rounded-lg shadow-md">
                {isExpanded && (
                    <>
                        {errors.title && (
                            <p className="text-red-500 text-sm mb-1">{errors.title}</p>
                        )}
                        <input
                            name="title"
                            onChange={handleChange}
                            value={note.title}
                            placeholder="Main theme"
                            className="w-full border-b border-gray-200 pb-1 mb-3 outline-none text-xl font-[Forum] placeholder:text-gray-400 focus:border-[#557791]"
                        />
                    </>
                )}

                {errors.content && (
                    <p className="text-red-500 text-sm mb-1">{errors.content}</p>
                )}

                <textarea
                    name="content"
                    onChange={handleChange}
                    onClick={expand}
                    value={note.content}
                    placeholder="What did you dream? Write it here."
                    rows={isExpanded ? 3 : 1}
                    className="w-full border-none outline-none text-xl font-[Forum] resize-none placeholder:text-gray-400"
                />

                <Zoom in={isExpanded}>
                    <button
                        onClick={submitNote}
                        type="button"
                        className="absolute right-4 -bottom-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#557791] text-[#efedc0] shadow-md hover:bg-[#3c5569] transition"
                    >
                        <AddIcon fontSize="small" />
                    </button>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
