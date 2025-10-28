import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function View() {
  const [tasks, setTasks] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:6500/view/tasks");
        console.log(response.data); // Debug
        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:6500/tasks/delete/${taskId}`);
      if (response.status === 200) {
        alert("Task deleted.");
        // Refresh tasks after deletion
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="relative overflow-x-auto">
        <h1>Code Master / Tasks</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Created at</th>
              <th className="px-6 py-3">Updated at</th>
              <th colSpan={2} className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id || index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.author}</td>
                <td className="px-6 py-4">{task.created_at}</td>
                <td className="px-6 py-4">{task.updated_at}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigateTo(`/edit/${task.id}`, {
                        state: { title: task.title, desc: task.description },
                      })
                    }
                    className="px-5 py-2 bg-teal-700 text-white font-bold text-md"
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-5 py-2 bg-red-600 text-white font-bold text-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
