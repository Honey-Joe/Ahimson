import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Alumni Portal</h1>
      <div>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/event" className="px-4">Events</Link>
        <Link to="/about" className="px-4">About</Link>
        <Link to="/register" className="px-4">Register</Link>
        <Link to="/login" className="px-4">Login</Link>
        
      </div>
    </nav>
  );
}
