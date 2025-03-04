import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/")
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">Alumni Portal</h1>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <div
        className={`absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent flex flex-col md:flex-row md:items-center md:space-x-4 p-4 md:p-0 transition-transform ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Link to="/" className="px-4 py-2 hover:bg-blue-500 rounded-md">Home</Link>
        <Link to="/event" className="px-4 py-2 hover:bg-blue-500 rounded-md">Events</Link>
        <Link to="/about" className="px-4 py-2 hover:bg-blue-500 rounded-md">About</Link>
        <Link to="/gallery" className="px-4 py-2 hover:bg-blue-500 rounded-md">Gallery</Link>
        <Link to="/register" className="px-4 py-2 hover:bg-blue-500 rounded-md">Register</Link>
        {user ? (
          <>
          <Link to="/admin" onClick={handleLogout} className="px-4 py-2 hover:bg-blue-500 rounded-md">
            Admin
          </Link>
          <Link to="/" onClick={handleLogout} className="px-4 py-2 hover:bg-blue-500 rounded-md">
            Logout
          </Link>
          </>
          
        ) : (
          <Link to="/login" className="px-4 py-2 hover:bg-blue-500 rounded-md">Login</Link>
        )}
      </div>
    </nav>
  );
}
