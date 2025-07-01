import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/authState";
import { useNavigate } from "react-router-dom";
import useRetrieveNotes from "../hooks/RetrieveNotes";
import { notearrayState } from "../recoil/states";
import SearchBar from "../hooks/SearchBar";
import { SideBarState } from "../recoil/sidebarstate";
import { pagetypeState } from "../recoil/pagetype";
import CircularProgress from "@mui/material/CircularProgress";
import { profileoverlayState } from "../recoil/profileOverlay";
import ProfileOverlay from "./Profileoverlay";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

function SidebarBut() {
  const SetsidebarStatus = useSetRecoilState(SideBarState);
  return (
    <div className="mr-12 ">
      <button
        onClick={() => SetsidebarStatus((e) => !e)}
        className="text-3xl ml-3 transtition all duration-500 hover:scale-110"
      >
        ☰
      </button>
    </div>
  );
}
function AppIcon() {
  const navigate = useNavigate();
  const Setpage = useSetRecoilState(pagetypeState);
  return (
    <div className="mr-64 cursor-pointer ">
      <img
        onClick={() => {
          Setpage("notes");
          navigate("/notes");
        }}
        src="./images-icons/logo"
        alt=""
        width={80}
      />
    </div>
  );
}

function RefreshButton() {
  const { loading: notesLoading } = useRetrieveNotes();

  function HandleRefresh() {
    if (notesLoading) {
      console.log("Notes are still loading...");
      return <div>Refreshing...</div>;
    }
    console.log("Refresh clicked");
  }
  return (
    <div>
      <button
        className="text-3xl flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 hover:bg-black hover:text-white"
        onClick={HandleRefresh}
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
          class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
}

function SettingsButton() {
  const [page, Setpage] = useRecoilState(pagetypeState);
  const navigate = useNavigate();
  return (
    <div
      className=" "
      onClick={() => {
        Setpage("settings");
        navigate("/settings");
      }}
    >
      <button className="text-3xl flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 hover:bg-black hover:text-white ">
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
          class="lucide lucide-settings-icon lucide-settings"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  );
}
function Logoutbut() {
  const [profileOverlayState, SetrofileOverlayState] =
    useRecoilState(profileoverlayState);
  return (
    <div className="relative ">
      <button
        // onClick={handleLogout}
        onMouseEnter={() => SetrofileOverlayState(true)}
        onMouseLeave={() => {
          SetrofileOverlayState(false);
        }}
        className="cursor-pointer  transition-all duration-500 hover:bg-black hover:text-white  flex items-center justify-center w-9 h-9 rounded-full relative "
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
          class="lucide lucide-circle-user-round-icon lucide-circle-user-round"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>

      {profileOverlayState && <ProfileOverlay />}
    </div>
  );
}

export default function Header() {
  const [token, setToken] = useRecoilState(tokenState);
  const setpagetype = useSetRecoilState(pagetypeState);
  const navigate = useNavigate();
  const [notes, setnotesArr] = useRecoilState(notearrayState);

  return (
    <header className="flex h-[10vh] px-[10px]   items-center  border-b-2 border-black ">
      <SidebarBut></SidebarBut>
      <AppIcon> navigate={navigate}</AppIcon>
      <SearchBar />
      <div className="flex gap-[20px] justify-center items-center ">
        <RefreshButton />
        <SettingsButton />
        
        
        <Logoutbut />
      </div>
    </header>
  );
}
