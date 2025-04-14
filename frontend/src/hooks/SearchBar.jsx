import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchbarState } from "../recoil/searchbarState";
import { notearrayState } from "../recoil/states";
import useRetrieveNotes from "./RetrieveNotes";
import { useRef } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchbarStatus, setSearchbarStatus] = useRecoilState(searchbarState);
  const [notes, setNotes] = useRecoilState(notearrayState);
  const allNotes = useRef([]);

  useEffect(() => {
    if (search.trim() !== "") {
      let findnotes = allNotes.current.filter(
        (note) => note.title.includes(search) || note.content.includes(search)
      );
      setNotes(findnotes);
    } else {
      setNotes(allNotes.current);
    }
  }, [search]);

  return (
    <div className=" ">
      <input
        className="  transition-all focus:text-white hover:text-white   hover:bg-black   duration-500 rounded-full  w-[600px] h-[45px] p-4 bg-black border text-white border-black focus:bg-black   focus:shadow-md  hover:shadow-md ease-out focus:border focus:scale-105 focus:ring-2 focus:ring-white hover:ring-2 hover:ring-white outline-none mr-72 hover:scale-105  focus:shadow-black hover:shadow-black "
        type="search"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => {
          if (allNotes.current.length === 0) {
            allNotes.current = [...notes];
          }
        }}
        value={search}
        name="search"
      />
    </div>
  );
}
