import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../components/Togglebut";

export default function SettingsPage() {
  console.log("settings page is clicked");

  return (
    <div className="p-20 flex-col border border-black w-[60vw] m-auto justify-center items-center">
      <div>
        <h1 className="">Settings</h1>
      </div>

      <div className="flex justify-center">
        <div>
          <div>Appearance</div>
          <div><ToggleSwitch></ToggleSwitch></div>
        </div>
      </div>
      <div>there will be settings</div>
    </div>
  );
}
