import Note from "../components/Note";
import Noteform from "../components/Noteform";
import Notelist from "../components/Notelist";
// import useRetrieveNotes from "../hooks/RetrieveNotes";

function Notes() {
  console.log("notes is opened");

  return (
    <div className={`p-[20px] `}>
      <div className="flex transition-all duration-1000   ">
        <Noteform />
      </div>
      <Notelist />
    </div>
  );
}
export default Notes;
