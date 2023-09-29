import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import ReactSwitch from "react-switch";


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useContext(ThemeContext);


  const handleClick = () => {
    logout();
  };

  return (
    <header className="flex justify-between py-6">
      <div>
        <Link to="/">
          <h1>DreamLog</h1>
        </Link>
      </div>

      <nav>
        {!user && (
          <div className="flex gap-4">
              <Link to="/login"><Button gradientDuoTone="purpleToBlue">Login</Button></Link>
              <Link to="/signup"><Button gradientDuoTone="purpleToBlue">Sign Up</Button></Link>
          </div>
        )}

        {user && (
          <div className="flex items-center">
            <div className="flex items-center"><span className="text-theme px-6">Dark mode</span><ReactSwitch onChange={toggleTheme} checked={theme === "dark"} /></div>
            <span className="px-6 text-theme">{user.email}</span>
            <Button gradientDuoTone="purpleToBlue" onClick={handleClick}>Log out</Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
