import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";


export default function Navbar({ user, setUser, toggleTheme }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md dark:bg-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-semibold">
          <Link to="/">CleanCity</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/all-issues">All Issues</Link>
          {user ? (
            <>
              <Link to="/add-issue">Add Issue</Link>
              <Link to="/my-issues">My Issues</Link>
              <Link to="/my-contributions">My Contribution</Link>
              <button
                onClick={() => toggleTheme && toggleTheme()}
                className="px-2 py-1 border rounded"
              >
                Theme
              </button>
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <button onClick={handleLogout} className="text-sm underline">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
