import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios"
const EditTask = () => {
  const {id} = useParams()
    const location = useLocation()
  const [titleValues, setTitle] = useState(location.state.title)
  const [descriptionValues, setDescription] = useState(location.state.desc)
  const navigateTo = useNavigate()
  
  
    
    const dataSubmit = async ()=>{
        const response = await axios.patch("http://localhost:6500/tasks/update/"+id, {
            title: titleValues,
            description: descriptionValues
        })

        if(response.status === 200){
            window.alert("Task updated.")
            navigateTo("/ViewTasks")
        }
    }


  

  return (
    <div className="w-full flex flex-col mx-auto items-center  gap-2 mt-10">
      <div className="flex flex-col gap-3 border border-gray-300 p-5">
        <h3>Editing existing task into database</h3>
        <div className="flex">
          <div className="w-50 flex justify-start">
            <label className="font-bold text-gray-600 font-md">Title</label>
          </div>
          <div className="flex justify-end w-50">
            <input
              type="text"
              value={titleValues}
              onChange={(e)=> setTitle(e.target.value)}
              className="p-2 border-1 border-gray-400 w-full text-gray-500"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-50 flex justify-start">
            <label className="font-bold text-gray-600 font-md">Description</label>
          </div>
          <div className="flex justify-end w-50">
            <textarea value={descriptionValues}  onChange={(e)=> setDescription(e.target.value)} className="p-2 w-full border-1 border-gray-400 text-gray-500">
              
            </textarea>
          </div>
        </div>
      </div>
      <div>
        <button onClick={()=> dataSubmit()}  className="text-white bg-blue-400 p-2 px-7 font-bold mt-5">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditTask;
