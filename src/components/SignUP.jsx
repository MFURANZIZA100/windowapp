import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUP = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:6500/signup", {
        username,
        password,
      });

      if (res.status === 201) {
        setMessage("✅ User created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage("❌ Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">
          Sign Up
        </h2>

        <label className="font-semibold text-blue-600">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="font-semibold text-blue-600">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Sign Up
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-red-500">{message}</p>
        )}

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link className="text-blue-600 font-bold underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUP;
