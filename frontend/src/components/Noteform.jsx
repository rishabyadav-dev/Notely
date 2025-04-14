import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { notearrayState } from "../recoil/states";
import { addnote } from "../services/noteService";

export default function Noteform() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const setNoteArray = useSetRecoilState(notearrayState);

  const handleBlur = async (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (title.trim() || content.trim()) {
        try {
          const noteData = await addnote(title, content);
          setNoteArray((prev) => [noteData, ...prev]);
          console.log("Note added successfully:", noteData);
          setTitle("");
          setContent("");
        } catch (error) {
          console.error("Failed to add note:", error);
        }
      }
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 mx-auto p-3 rounded-lg w-[400px] bg-white border ease-out border-black  
      transition-all  duration-1000 ${
        isExpanded ? "max-h-[150px]" : "max-h-[62px]"
      } overflow-hidden`}
      tabIndex={0}
      onBlur={handleBlur}
    >
      {isExpanded && (
        <input
          className="h-[35px] border-b border-gray-300 focus:border-gray-900 outline-none bg-white transition-all duration-300"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      <input
        onClick={() => setIsExpanded(true)}
        type="text"
        className="h-[35px] border-b border-gray-300 focus:border-gray-900 outline-none transition-all duration-300"
        placeholder="Note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
