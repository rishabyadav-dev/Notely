import { useRecoilState, useRecoilValue } from "recoil";
import { pagetypeState } from "../recoil/pagetype";
import { Navigate, useNavigate } from "react-router-dom";
export default function SidebarBut({ children, path, page }) {
  const navigate = useNavigate();
  const [Page, SetPage] = useRecoilState(pagetypeState);
  function handleClick() {
    SetPage(page);
    navigate(path);
  }
  console.log(Page);

  return (
    <button
      onClick={handleClick}
      className={`w-full text-black h-[50px]   rounded-r-full  transition-all duration-500  ${
        Page !== page ? "hover:bg-gray-400 hover:text-white" : ""
      }  ${Page === page ? "bg-black text-white" : ""} `}
    >
      {children}
    </button>
  );
}
