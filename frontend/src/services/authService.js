import axios from "axios";

export async function signup(email, password) {
  try {
    const response = await axios.post("/api/users/signup", {
      email,
      password,
    });
    console.log("singup  response from server-", response.data);
    return response.data;
  } catch (error) {
    throw new Error("User already exists,try login");
  }
}
export async function login(email, password) {
  try {
    console.log("sending login request to backend");
    const response = await axios.post("/api/users/login", {
      email,
      password,
    });
    if (response) {
      console.log("login successful,token-", response.data.token);
    }

    return { token: response.data.token };
  } catch (error) {
    console.log("authservice:login request to backend failed", error);

    // Get the specific error message from the server response if available
    const errorMessage =
      error.response?.data?.error ||
      "Login failed. Please check your credentials.";
    throw new Error(errorMessage);
  }
}
