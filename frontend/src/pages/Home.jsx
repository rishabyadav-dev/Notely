import React from "react";
import Bin from "./Bin";
import SettingsPage from "./Settings";
import MainLayout from "../layouts/mainlayout";
import Notes from "./Notes";
import { useRecoilValue } from "recoil";
import { pagetypeState } from "../recoil/pagetype";
function Home() {
  const pagetype = useRecoilValue(pagetypeState);
  return (
    <div className="h-[100vh]">
      <MainLayout>
        {pagetype === "notes" && <Notes />}
        {pagetype === "bin" && <Bin />}

        {pagetype === "settings" && <SettingsPage />}
      </MainLayout>
    </div>
  );
}

export default Home;
