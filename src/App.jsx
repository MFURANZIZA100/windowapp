import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUP from "./components/SignUP.jsx";
import Login from "./components/Login.jsx";
import CountTract from "./components/CountTract.jsx";
import Home from "./components/Home.jsx";
import ViewTasks from "./components/ViewTasks.jsx";
import EditTask from "./components/EditTask.jsx";
import Navbar from "./components/Navbar.jsx";
import AddNewTask from "./components/AddNewTask.jsx"
import Manage from "./components/Manage.jsx";
import NotFound from "./components/NotFound.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CountTract" element={<CountTract/>} />
        <Route path="/ViewTasks" element={<ViewTasks/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/AddNewTask" element={<AddNewTask/>} />
        <Route path="/Manage" element={<Manage/>} />
        <Route path="*" element={<NotFound />} />
        

      
     
       
        
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
