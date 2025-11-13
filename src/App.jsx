import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AllIssues from "./pages/AllIssues/AllIssues";
import AddIssue from "./pages/AddIssue/AddIssue";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import MyIssues from "./pages/MyIssues/MyIssues";
import MyContributions from "./pages/MyContributions/MyContributions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? {
        email: u.email,
        uid: u.uid,
        displayName: u.displayName,
        photoURL: u.photoURL
      } : null);
    });
    return () => unsub();
  }, []);


  useEffect(() => {
    const title = location.pathname === "/" ? "Home" : location.pathname.replace("/", "").replace("-", " ");
    document.title = `CleanCity - ${title || "Home"}`;
  }, [location]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} toggleTheme={toggleTheme} />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-issues" element={<AllIssues user={user} />} />
          <Route path="/issue/:id" element={<ProtectedRoute user={user}><IssueDetails user={user} /></ProtectedRoute>} />
          <Route path="/add-issue" element={<ProtectedRoute user={user}><AddIssue user={user} /></ProtectedRoute>} />
          <Route path="/my-issues" element={<ProtectedRoute user={user}><MyIssues user={user} /></ProtectedRoute>} />
          <Route path="/my-contributions" element={<ProtectedRoute user={user}><MyContributions user={user} /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="text-center">404 - Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

