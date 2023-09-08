import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <Link to="/">{/* <h1>DreamLog</h1> */}</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>

        <div>
          <button onClick={handleClick}>Log out</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
