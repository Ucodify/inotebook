import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3 my-3'>
      <div className='card my-3 shadow-sm'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{note.title}</h5>
            <i
              className='fa-regular fa-trash-can'
              style={{ cursor: "pointer" }}
              title='delete note'
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this note?")
                ) {
                  deleteNote(note._id);
                  props.showAlert("Deleted successfully", "success");
                }
              }}
            ></i>
            <i
              className='fa-regular fa-pen-to-square'
              style={{ cursor: "pointer" }}
              title='edit note'
              onClick={() => {
                updateNote(note);
               
              }}
            ></i>
          </div>
          <p className='card-text'>{note.description}</p>
          <p className='card-text'>{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
