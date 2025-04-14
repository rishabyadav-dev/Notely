import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState, useCallback } from "react";
import { tokenState, userState } from "../recoil/authState";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userEmail } from "../recoil/authState";

const useAuthCheck = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const setUseremail = useSetRecoilState(userEmail);
  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }, [setToken, setUser]);

  useEffect(() => {
    let isMounted = true;

    const validateToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get("/api/verifyuser/validate-token", {
          headers: { token },
        });

        if (isMounted) {
          if (res.data && res.data.user) {
            setUser(res.data.user);
            setUseremail(res.data.useremail);
            console.log(res.data.useremail);

            console.log("email from authcheck hook:" + res.data.useremail);

            setIsLoading(false);
          } else {
            clearAuth();
            setError("Invalid user data received");
            setIsLoading(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          clearAuth();
          setError(error.response?.data?.error || "Token validation failed");
          setIsLoading(false);
        }
      }
    };

    validateToken();

    return () => {
      isMounted = false;
    };
  }, [token, clearAuth]);

  return { token, isLoading, error };
};

export default useAuthCheck;
