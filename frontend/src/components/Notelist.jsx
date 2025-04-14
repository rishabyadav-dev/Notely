import React from "react";
import Note from "./Note";
import { useRecoilValue, useRecoilState } from "recoil";
import { notearrayState } from "../recoil/states";
function Notelist() {
  const [notes, setNotes] = useRecoilState(notearrayState);

  return (
    <div className=" flex flex-wrap gap-[10px] p-9 w-auto justify-center m-auto   opacity-0  transition-all  translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]  translate-x-4 text-black">
      {notes
        .filter((note) => note.deletestatus === false)
        .map((note) => (
          <Note
            key={note.id}
            title={note.title}
            content={note.content || ""}
            id={note.id}
          ></Note>
        ))}
    </div>
  );
}
export default Notelist;
