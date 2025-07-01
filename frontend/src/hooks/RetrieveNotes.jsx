import axios from "axios";
import { notearrayState } from "../recoil/states";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

const useRetrieveNotes = () => {
  const setNotes = useSetRecoilState(notearrayState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found. User must be logged in.");
          setLoading(false);
          return;
        }

        console.log("RetrieveNotes: Sending GET request to backend...");
        const response = await axios.get(`/api/notes/`, {
          headers: { token },
        });

        if (isMounted) {
          if (response?.data?.formattednotes) {
            console.log(
              `${response.data.formattednotes.length} notes retrieved successfully`
            );
            setNotes(response.data.formattednotes);
          } else {
            console.warn("No notes found.");
            setNotes([]);
          }
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("RetrieveNotes: GET request failed", error);
          setError(error.response?.data?.error || "Failed to retrieve notes");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      isMounted = false; 
    };
  }, []);

  return { loading, error };
};

export default useRetrieveNotes;
