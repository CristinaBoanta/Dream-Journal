import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

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
            <span className="px-6">{user.email}</span>
            <Button gradientDuoTone="purpleToBlue" onClick={handleClick}>Log out</Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
