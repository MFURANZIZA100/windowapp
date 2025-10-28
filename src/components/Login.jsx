import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:6500/login", {
        username,
        password,
      });

      // Save token in localStorage for later API use
      localStorage.setItem("token", res.data.token);
      setMessage(`✅ ${res.data.message}`);

      // Redirect after 1 second
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data) {
        setMessage(`❌ ${err.response.data}`);
      } else {
        setMessage("❌ Login failed. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center shadow-lg p-8 bg-white rounded-2xl w-[350px]">
        <h2 className="font-black text-2xl mb-6 text-center">
          Task Management / <span className="text-red-500">Login</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-red-500">{message}</p>
          )}

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
