import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // ✅ Function to submit task
  const dataSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      window.alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      // ✅ If your backend route requires authentication (uses 'aut' middleware), 
      //    you must include the token in headers like this:
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:6500/tasks/add",
        { title, description },
        { headers: { Authorization: token } }
      );

      if (response.status === 201) {
        window.alert("✅ Task created successfully!");
        navigate("/ViewTasks");
      } else {
        window.alert("⚠️ Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response?.status === 401) {
        window.alert("⚠️ Please log in first.");
        navigate("/login");
      } else {
        window.alert("❌ Failed to create task. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h3 className="text-2xl font-bold text-gray-900">🚀 Code Master</h3>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Task Management System — Add a New Task
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            dataSubmit();
          }}
        >
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter task title"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Description:
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Write a short description"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Back Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <a
            href="/Home"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            ← Back Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default AddNewTask;
