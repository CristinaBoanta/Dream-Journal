//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

// import "./css/index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

const App = () => {
  const { user } = useAuthContext();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App w-full main-wrapper" id={theme}>
      <div className="background-image"></div>
      <div className="relative container mx-auto min-h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="pages py-6">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
