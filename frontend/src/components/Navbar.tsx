import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useState } from "react";

import ReactSwitch from "react-switch";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      {/* <header className="flex justify-between py-6">
        <div>
          <Link to="/">
            <h1>DreamLog</h1>
          </Link>
        </div>

        <nav>
          {!user && (
            <div className="flex gap-4">
              <Link to="/login">
                <Button gradientDuoTone="purpleToBlue">Login</Button>
              </Link>
              <Link to="/signup">
                <Button gradientDuoTone="purpleToBlue">Sign Up</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-theme px-6">Dark mode</span>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div>
              <span className="px-6 text-theme">{user.email}</span>
              <Button gradientDuoTone="purpleToBlue" onClick={handleClick}>
                Log out
              </Button>
            </div>
          )}
        </nav>
      </header> */}

      <nav className="w-full">
        <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div>
                <Link to="/">
                  <h1>DreamLog</h1>
                </Link>
              </div>

              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              {/* <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-indigo-200">
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <a href="javascript:void(0)">Blog</a>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <a href="javascript:void(0)">About US</a>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <a href="javascript:void(0)">Contact US</a>
                </li>
              </ul> */}

              <div className="space-y-2 lg:hidden md:inline-block">
                {!user && (
                  <div className="flex gap-4 flex-col md:flex-row">
                    <Link to="/login">
                      <Button gradientDuoTone="purpleToBlue">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button gradientDuoTone="purpleToBlue">Sign Up</Button>
                    </Link>
                  </div>
                )}

                {user && (
                  <div className="flex md:items-center md:flex-row flex-col items-start">
                    <div className="flex md:p-0">
                      <span className="text-theme pb-4 md:pb-0 pr-4">
                        Dark mode
                      </span>
                      <ReactSwitch
                        onChange={toggleTheme}
                        checked={theme === "dark"}
                      />
                    </div>
                    <div className="py-4 md:p-0">
                      <span className="md:px-6 text-theme">{user.email}</span>
                    </div>
                    <div className="py-4 md:p-0">
                      <Button
                        gradientDuoTone="purpleToBlue"
                        onClick={handleClick}
                      >
                        Log out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 lg:inline-block">
            {/* <a
              href="javascript:void(0)"
              className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
            >
              Sign in
            </a>
            <a
              href="javascript:void(0)"
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            >
              Sign up
            </a> */}

            <nav>
              {!user && (
                <div className="flex gap-4">
                  <Link to="/login">
                    <Button gradientDuoTone="purpleToBlue">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button gradientDuoTone="purpleToBlue">Sign Up</Button>
                  </Link>
                </div>
              )}

              {user && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-theme px-6">Dark mode</span>
                    <ReactSwitch
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />
                  </div>
                  <span className="px-6 text-theme">{user.email}</span>
                  <Button gradientDuoTone="purpleToBlue" onClick={handleClick}>
                    Log out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
