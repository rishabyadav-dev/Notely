import React from "react";

import { useState } from "react";
import { login } from "../services/authService";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { tokenState } from "../recoil/authState";
import { useSetRecoilState } from "recoil";
const Authform = ({ type }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    let signinResponse;
    let signupResponse;
    try {
      if (type === "login") {
        console.log("Authform: waiting for login response from server ");
        signinResponse = await login(formData.email, formData.password);

        if (signinResponse && signinResponse.token) {
          localStorage.setItem("token", signinResponse.token);
          console.log("token saved in local storage,now navigating to home");
          setToken(signinResponse.token);
          console.log("Login credentials correct now moving to home");
          navigate("/notes");
        } else {
          throw new Error("Login successful but no token received");
        }
      } else {
        signupResponse = await signup(formData.email, formData.password);
        if (signupResponse) {
          navigate("/login");
        } else {
          throw new Error("Signup failed");
        }
      }
    } catch (error) {
      console.log("authform :error: ", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
    console.log(`${type} form submitted:`, formData);
  }

  return (
    <div className={`h-screen flex justify-center items-center `}>
      <div
        className={`m-auto w-[500px] flex flex-col  h-[500px] items-center shadow-2xl border border-gray-200 rounded-3xl bg-white relative `}
      >
        <h1 className="  prose font-poppins text-4xl font-semibold  mt-20 mb-12  ">
          {type === "login" ? "LOGIN" : "SIGNUP"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col  gap-[10px]">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className=" font-mono h-[50px] rounded-[10px] w-[400px] pl-4 bg-gray-100 transition-all duration-800 focus:bg-gray-200  border border-gray-300 text-black focus:border-black hover:shadow-md "
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className=" font-mono h-[50px] rounded-[10px] w-[400px] pl-4 bg-gray-100 transition-all duration-800 focus:bg-gray-200  border border-gray-300 text-black focus:border-black hover:shadow-md "
          />
          <button
            className=" m-auto mt-3  w-[350px] h-[40px] bg-slate-100 rounded-[25px] border-[2px] border-black transition-all duration-500
          hover:text-white hover:bg-black font-poppins text-1xl font-medium uppercase hover:shadow-lg hover:shadow-gray-500"
          >
            {type === "login" ? "Login" : "Create account"}
          </button>
        </form>

        {error && <div className="mt-2 text-red-600 ">{error}</div>}

        <div className="absolute bottom-8">
          {type === "login" ? (
            <div>
              <span>New user?</span>
              <Link
                onClick={() => setError(false)}
                className="text-black font-medium  hover:underline transition duration-500"
                to="/signup"
              >
                {" "}
                Register here
              </Link>
            </div>
          ) : (
            <div>
              <span>Already a user?</span>
              <Link
                onClick={() => setError(false)}
                className="text-black font-medium  hover:underline transition duration-500"
                to="/login"
              >
                {" "}
                Login here
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Authform;
