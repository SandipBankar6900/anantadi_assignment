import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left Section: Logo and Dashboard */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">AnantaDI</Link>
          </div>
          {/* Dashboard */}
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Right Section: Conditional Rendering for Auth */}
        <div className="flex items-center space-x-4">
          {auth.isAuthenticated ? (
            // If authenticated, show Logout button
            <button
              onClick={logout}
              className="text-white border border-red-700 rounded-md px-4 py-2 font-semibold hover:text-gray-300 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              {/* If not authenticated, show Sign In and Sign Up buttons */}
              <Link
                to="/signin"
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
