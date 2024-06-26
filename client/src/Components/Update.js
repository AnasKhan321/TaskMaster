import { useParams , Link } from 'react-router-dom';

import {useEffect, useState} from "react"
import {  toast } from 'react-toastify';
export default function Update(){

    const { id } = useParams();
    const [data , setdata ] =useState({})

    const [form, setform] = useState({
        title : "" ,
        description : ""
    })

    const [status, setStatus] = useState('To Do');

    useEffect(()=>{

        fetchData()
    },[])

    const fetchData = async()=>{

        const token  = localStorage.getItem("TodoToken")

        const response = await fetch(`http://localhost:8000/api/task/id/${id}`  ,{
            method : 'GET'  , 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
           
        })

        const resData  = await response.json()
      
        setform(resData.data)
        setStatus(resData.data.status)
    }


    const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };

    const handleSave = async()=>{
        const token  = localStorage.getItem("TodoToken")

       const sendData = {
        ...form , 
        status : status
       }
    const response = await fetch("http://localhost:8000/api/task/"  , {
        method : 'PUT'  , 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        body : JSON.stringify(sendData)
    })

    const data = await response.json()
    if(data.success){
        toast.success("Updated Successfully !")
    }

    }


    const onChange = (e)=>{
        setform({...form , [e.target.name]  : e.target.value})
    }

    return(
        <div  className="w-[60%]  mx-auto ">
            
            <form className="w-full mt-10  mx-auto"   >
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="title" value={form.title} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black  dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " onChange={onChange} required />
      <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
  </div>
  <div className="relative z-0 w-full mb-3  group">
      <input type="text" value={form.description} name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  text-black  dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer" onChange={onChange} placeholder=" " required />
      <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>


        <div className="mb-5 ">
            
            <select id="countries" className="bg-gray-50    border-b-2  text-gray-900  text-sm  focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-lime-500 dark:focus:border-lime-500"  value={status} onChange={handleStatusChange}>

                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
         
            </select>
        </div>



        <button type="button" className="  w-full  text-white bg-gradient-to-r from-lime-500 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSave}>Save </button>
</form>

            
        </div> 
    )


}