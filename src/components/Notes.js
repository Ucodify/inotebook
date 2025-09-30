import React, { useContext } from "react";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className='row m-3'>
      <h3>Your Notes</h3>
      {notes.map((note) => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
}

export default Notes;
