import React, { useEffect } from  "react"
import { useState } from "react";
import { Link } from "react-router-dom";



const CountTract = () =>{
    const [count,setcount] = useState(0)
    useEffect(()=>{
        document.title =`(${count} clicks`

    },)
    return(
        <center>
        <div className="flex flex-col h-screen justify-center items-center gap-2">
            
            <button onClick={()=>setcount(count +1)}className="bg- text-blue-600 p-2 px-5 font-bold">onClick</button>
            <button onClick={()=>setcount(count -1)}className="bg- text-blue-600 p-2 px-5 font-bold">onClick</button>
<h3>This button has been clicked{count}times</h3>
        </div>  
        </center>
    )
}
export default CountTract