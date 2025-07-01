import React, { useState } from "react";
import { deletenote, editnote, softdeletenote } from "../services/noteService";
import { delnotearrayState, notearrayState } from "../recoil/states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SideBarState } from "../recoil/sidebarstate";

function Note({ title, content, id }) {
  const [notes, setNotes] = useRecoilState(notearrayState);
  const [isHovered, setIsHovered] = useState(false);
  const [editstate, setEditstate] = useState(false);
  const [deletenotes, Setdeletenotes] = useRecoilState(delnotearrayState);
  const [Title, SetTitle] = useState(title);
  const [Content, SetContent] = useState(content);
  const setsidebar = useSetRecoilState(SideBarState);
  async function handleupdate() {
    setNotes((prev) =>
      prev.map((note) =>
        note.id == id ? { ...note, title: Title, content: Content } : note
      )
    );
    const response = await editnote(Title, Content, id);
    console.log("message: " + response);

    setEditstate(false);
  }
  return (
    <div
      className="w-[200px] bg-gray-50 duration-700 text-gray-900 border  rounded-[8px] relative shadow-lg p-4 transition-all group h-fit hover:bg-gray-100 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`pl-[5px] pr-[5px] border-none outline-none ${
          isHovered ? "border-[1px]" : "border-none"
        }`}
      >
        <h1 className="text-lg font-bold break-words ">{title}</h1>
        <p className="text-sm break-words">{content}</p>
      </div>
      <div className="relative">
        {editstate && (
          <div className="  bg-black -top-[151px] backdrop-blur-xl   -left-[20px] bg-opacity-65 fixed z-50 h-screen w-screen"></div>
        )}
        {editstate && (
          <div className="   w-[500px] h-[500px] -top-10 right-[495px]   rounded-3xl shadow-2xl shadow-black  bg-white fixed z-50 flex flex-col items-center  border border-black hover ">
            <div className="flex flex-col gap-3 relative">
              <button
                className="mt-2 place-content-end absolute top-1 -right-2"
                onClick={() => {
                  setEditstate(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-x-icon lucide-circle-x"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
              <div className="mt-7">
                <div>Title</div>
                <input
                  value={Title}
                  onChange={(e) => SetTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                  className=" border-black text-xl p-3 border w-[450px]
              h-[50px]"
                />
              </div>
              <div>
                <div>Content</div>
                <textarea
                  value={Content}
                  name="content"
                  type="text"
                  onChange={(e) => SetContent(e.target.value)}
                  className=" border p-3 text-xl resize-none  border-black w-[450px]
              h-auto   "
                  rows={8}
                  id="content"
                  placeholder="content"
                ></textarea>
              </div>
            </div>
            <button
              className=" mt-6 hover:bg-black transition-all duration-500 text-black hover:text-white w-[200px] h-[40px] border border-black font-bold font-mono text-xl"
              onClick={handleupdate}
            >
              UPDATE
            </button>
          </div>
        )}
      </div>

      {isHovered && (
        <div className="absolute bottom-2 right-2 hidden group-hover:flex gap-2">
          <button
            type="button"
            title="edit note"
            onClick={() => {
              setsidebar(false);
              setEditstate(true);
            }}
            className="text-[10px] border  bg-white border-gray-300 p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            ✏️
          </button>
          <button
            type="button"
            title="delete note"
            onClick={async () => {
              try {
                const response = await softdeletenote(id);
                console.log(
                  "note.jsx: softdelete response from noteservice-" + response
                );

                setNotes((prevNotes) =>
                  prevNotes.map((note) =>
                    note.id === id ? { ...note, deletestatus: true } : note
                  )
                );
                console.log("note.jsx: changed delete status of note to true");
              } catch (error) {
                console.error("Failed to delete note:", error);
              }
            }}
            className="text-[10px] border  bg-white border-gray-300 p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
