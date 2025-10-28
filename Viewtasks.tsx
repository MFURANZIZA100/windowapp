import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Navbar";
import {Link, useNavigate} from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description: string;
  author: string;
  created_at: string;
  updated_at: string;
};

export default function View() {
  const [tasks, setTasks] = useState<Task[]>([]); // Use the Task type
const navigateTo = useNavigate();
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:6500/view/tasks");
        if (Array.isArray(response.data)) {
          setTasks(response.data); // Update the tasks state
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);
  
  const deleteTask = async (task) => {
 const responce = await axios.delete(`http://localhost:6500/tasks/delete/${task}`)
 if(responce.status===200) {
  window.alert("Task deleted.")
  //navigateTo("/home")
 }
  }

  return (
    <>
      <Nav />
      <div className="relative overflow-x-auto">
        <h1>HB-LAB / Tasks available</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Created at</th>
              <th scope="col" className="px-6 py-3">Updated at</th>
              <th colSpan={"2"} className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id || index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{task.id}</td>
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.author}</td>
                <td className="px-6 py-4">{task.created_at}</td>
                <td className="px-6 py-4">{task.updated_at}</td>
                <td className="px-6 py-4"><button
                onClick={(() => navigateTo(`/edit/${task.id}`,{state:{
                  title:task.title,
                  description:task.description
                }})
                )} 
                className="px-5 py-2 bg-teal-700 text-white font-bold text-md"
                >
                  Update</button></td>
                 <td> <button
               onClick={()=>deleteTask(task.id)}
                className="px-5 py-2 bg-red-700 text-white font-bold text-md"
                >
                  Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}