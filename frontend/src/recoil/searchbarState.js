import { atom } from "recoil";
export const searchbarState = atom({
  key: "searchbarState",
  default: false,
});

export const searchednotesState = atom({
  key: "searchednotesState",
  default: [],
});
