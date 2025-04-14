import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default:
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
});

export const userState = atom({
  key: "userState",
  default: null,
});
export const userEmail = atom({
  key: "userEmail",
  default: null,
});
