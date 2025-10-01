// import { useState } from "react";
import React, { useState, useContext } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhkYTFkZTNhMmM1ZjhiOTJhNjlkZThjIn0sImlhdCI6MTc1OTEyNDk2NH0.uweNgql-h85RKC1q2caof4J97qplSd1XuG6jI6cWT5o",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a note

  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhkYTFkZTNhMmM1ZjhiOTJhNjlkZThjIn0sImlhdCI6MTc1OTEyNDk2NH0.uweNgql-h85RKC1q2caof4J97qplSd1XuG6jI6cWT5o",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //problematic backend pe data add ni hora
    const text = await response.text();
    console.log(text);
    // const json = await response.json();
    // console.log(json);
    // setNotes(json);

    console.log("Adding a new note");
    const note = {
      _id: "68db79238dda3539a06c12e1",
      user: "68da1de3a2c5f8b92a69de8c",
      title: title,
      description: description,
      tag: tag,
      date: "2025-09-30T06:14:12.761Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note

  const deleteNote = async (id) => {
    //Todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhkYTFkZTNhMmM1ZjhiOTJhNjlkZThjIn0sImlhdCI6MTc1OTEyNDk2NH0.uweNgql-h85RKC1q2caof4J97qplSd1XuG6jI6cWT5o",
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhkYTFkZTNhMmM1ZjhiOTJhNjlkZThjIn0sImlhdCI6MTc1OTEyNDk2NH0.uweNgql-h85RKC1q2caof4J97qplSd1XuG6jI6cWT5o",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(id, newNotes);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
