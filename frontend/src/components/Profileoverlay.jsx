import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, userEmail } from "../recoil/authState";
import { useNavigate } from "react-router-dom";
import useRetrieveNotes from "../hooks/RetrieveNotes";
import { notearrayState } from "../recoil/states";
import SearchBar from "../hooks/SearchBar";
import { SideBarState } from "../recoil/sidebarstate";
import { pagetypeState } from "../recoil/pagetype";
import CircularProgress from "@mui/material/CircularProgress";
import { profileoverlayState } from "../recoil/profileOverlay";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

export default function ProfileOverlay() {
  const Email = useRecoilValue(userEmail);
  const [profileOverlayState, SetrofileOverlayState] =
    useRecoilState(profileoverlayState);

  const [token, setToken] = useRecoilState(tokenState);
  const setpagetype = useSetRecoilState(pagetypeState);
  const navigate = useNavigate();
  const [notes, setnotesArr] = useRecoilState(notearrayState);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setnotesArr([]);
    setpagetype("notes");
    SetrofileOverlayState(false);
    navigate("/login");
  };

  return (
    <div
      onMouseEnter={() => SetrofileOverlayState(true)}
      onMouseLeave={() => SetrofileOverlayState(false)}
      className="w-96 h-36 bg-black/90 flex p-4 flex-col rounded-lg bg-opacity-95 absolute top-9 z-[9999] right-1 shadow-2xl shadow-gray-600 backdrop-blur-lg "
    >
      <div className="text-white">{Email} </div>
      <button
        onClick={handleLogout}
        className="transition-all duration-500 hover:text-black hover:bg-white  text-white w-20 h-8 hover:shadow-md hover:shadow-white rounded-full absolute bottom-4 right-4 border border-white"
      >
        LOGOUT
      </button>
    </div>
  );
}
