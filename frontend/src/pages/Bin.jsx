import React from "react";
import Note from "../components/Note";
import { useRecoilValue, useRecoilState } from "recoil";
import { delnotearrayState, notearrayState } from "../recoil/states";
import Delnote from "../components/Delnote";

export default function Bin() {
  const [notes, setNotes] = useRecoilState(notearrayState);
  return (
    <div className="p-10 flex flex-col items-center">
      <div>BIN</div>
      <div className=" flex flex-wrap gap-[10px] p-9 w-auto justify-center m-auto   opacity-0  transition-all  translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]  translate-x-4 text-black">
        {notes
          .filter((note) => note.deletestatus === true)
          .map((note) => (
            <Delnote
              key={note.id}
              title={note.title}
              content={note.content || ""}
              id={note.id}
              setNotes={setNotes}
            />
          ))}
      </div>
    </div>
  );
}
