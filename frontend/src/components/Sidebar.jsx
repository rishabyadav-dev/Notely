import React, { useState } from "react";
import SidebarBut from "./sidebarBut";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

import { pagetypeState } from "../recoil/pagetype";
import { SideBarState } from "../recoil/sidebarstate";

function Sidebar() {
  const sidebarState = useRecoilValue(SideBarState);
  const setPage = useSetRecoilState(pagetypeState);
  const navigate = useNavigate();
  async function handleNav(page, path) {
    setPage(page);
    navigate(path);
  }

  return (
    <aside
      className={`  h-[90vh] transition-all duration-300 overflow-hidden ${
        sidebarState ? "w-[150px] " : "w-0 "
      } bg-transparent`}
    >
      <ul
        className={`  list-none text-[20px] flex  flex-col gap-[20px] text-center mt-[30px]
`}
      >
        <li>
          <SidebarBut path={"/notes"} page={"notes"}>
            <div className="flex ml-6 gap-1 items-center">
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
                class="lucide lucide-notebook-icon lucide-notebook"
              >
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <rect width="16" height="20" x="4" y="2" rx="2" />
                <path d="M16 2v20" />
              </svg>
              <div>Notes</div>
            </div>
          </SidebarBut>
        </li>
        <li>
          <SidebarBut path={"/bin"} page={"bin"}>
            <div className="flex ml-6 gap-1 items-center">
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
                class="lucide lucide-trash-icon lucide-trash"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <div>Bin</div>
            </div>
          </SidebarBut>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
