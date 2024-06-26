import React, { createContext, useState   , useEffect} from 'react';
import {  toast } from 'react-toastify';


const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [items , setitems]  = useState([])
    const [islogin , setislogin ]  = useState(false)
    const [isloading , setisloading]  = useState(false)

  const fetchData = async()=>{
   

 
    const token  = localStorage.getItem("TodoToken")
    const response = await fetch('http://localhost:8000/api/task/'  , {
        method : 'GET'  , 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
       
    })

    const data = await response.json()
    if(data.success){
        setitems(data.tasks)
        

        }
    }
 




    const deletTask= async(id)=>{


        const token  = localStorage.getItem("TodoToken")

        const response = await fetch(`http://localhost:8000/api/task/${id}` , {
            method : 'DELETE'  , 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        
        })

        const resData =await response.json()

        if(resData.success){
            toast.success("Deleted Successfully !")
            fetchData()
        }

        
    }

    const getTasksByQuery = async(query)=>{
      if(isloading == true){
        return ; 
      }
    
      setisloading(true)
        const token  = localStorage.getItem("TodoToken")

        const response = await fetch(`http://localhost:8000/api/task/query/${query}`  , {
            method : 'GET'  , 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
           
        })

        const data = await response.json()
        if(data.success){
            setitems(data.tasks)

        }
        setTimeout(() => {
          setisloading(false)
        }, 1000);
       
      
    }





  return (
    <TaskContext.Provider value={{ items , setitems  , fetchData  , deletTask  , getTasksByQuery , islogin , setislogin  , isloading }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
