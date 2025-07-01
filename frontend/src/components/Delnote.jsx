import React, { useState } from "react";
import { deletenote } from "../services/noteService";

export default function Delnote({ title, content, id, setNotes }) {
  const [isHovered, setIsHovered] = useState(false);

  async function handlepermdelete() {
    try {
      const response = await deletenote(id);
      console.log("note.jsx: softdelete response from noteservice-" + response);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      console.log("note.jsx: changed delete status of note to true");
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  return (
    <div>
      <div
        className="w-[200px] bg-gray-50 duration-700 text-gray-900 border  rounded-[8px]  shadow-lg p-4 transition-all group h-fit hover:bg-gray-100"
        
      >
        <div
          className={`pl-[5px] pr-[5px] border-none outline-none ${
            isHovered ? "border-[1px]" : "border-none"
          }`}
        >
          <h1 className="text-lg font-bold break-words ">{title}</h1>
          <p className="text-sm break-words">{content}</p>
        </div>
        <div className=" bottom-2 right-2 hidden group-hover:flex gap-2">
          <button
            onClick={() =>
              setNotes((prev) =>
                prev.map((note) =>
                  note.id === id ? { ...note, deletestatus: false } : note
                )
              )
            }
            title="Restore"
            className="text-[10px] border  bg-white border-gray-300 p-2 rounded-full hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Restore
          </button>

          <button
            type="button"
            title="delete note Permanentely"
            onClick={handlepermdelete}
            className="text-[10px] border hover:text-white bg-white border-gray-300 p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            🗑️ Permanentely
          </button>
        </div>
      </div>
    </div>
  );
}
