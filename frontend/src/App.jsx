import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import CircularProgress from "@mui/material/CircularProgress";
import Authform from "./pages/Authform";
import useAuthCheck from "./hooks/useAuthCheck";
import useRetrieveNotes from "./hooks/RetrieveNotes";

import SettingsPage from "./pages/Settings";
function App() {
  const { token, isLoading, error } = useAuthCheck();
  const { loading: notesLoading } = useRetrieveNotes();

  if (isLoading || notesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.error("Auth error:", error);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/notes"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/bin"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={token ? <Home /> : <Authform type="login" />}
        />
        <Route
          path="/signup"
          element={token ? <Home /> : <Authform type="signup" />}
        />
        <Route
          path="/settings"
          element={token ? <Home /> : <Authform type="login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
