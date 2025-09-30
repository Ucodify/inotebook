// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const notesInitial = [
    {
      _id: "68db665007c490e6ac791055",
      user: "68da1de3a2c5f8b92a69de8c",
      title: "jkToken dsjfjdsl",
      description: "study wellkdkls",
      tag: "schooljxcnlk",
      date: "2025-09-30T05:09:20.778Z",
      __v: 0,
    },
    {
      _id: "68db665b07c490e6ac791059",
      user: "68da1de3a2c5f8b92a69de8c",
      title: "jkToken ",
      description: "study ",
      tag: "hbhj",
      date: "2025-09-30T05:09:20.778Z",
      __v: 0,
    },
    {
      _id: "68db666507c490e6ac79105b",
      user: "68da1de3a2c5f8b92a69de8c",
      title: " nn ",
      description: "nkjnkj ",
      tag: "nlkn",
      date: "2025-09-30T05:09:20.778Z",
      __v: 0,
    },
    {
      _id: "68db79038dda3539a06c12df",
      user: "68da1de3a2c5f8b92a69de8c",
      title: " Please Wakeup Early ",
      description: "Sleep at 10:00 ",
      tag: "Wakeup call",
      date: "2025-09-30T06:14:12.761Z",
      __v: 0,
    },
    {
      _id: "68db79238dda3539a06c12e1",
      user: "68da1de3a2c5f8b92a69de8c",
      title: "Exercise ",
      description: "Jogging walk and pushups",
      tag: "warm up",
      date: "2025-09-30T06:14:12.761Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
