import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert("Login successful!");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
    </div>
  );
}
