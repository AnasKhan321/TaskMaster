import React,{useState ,useEffect ,useContext} from "react"
import { useNavigate , Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import  Taskitem from './TaskUi.js'; 
import {TaskContext}  from '../Context/ContextApi.js' ; 
import {HashLoader } from "react-spinners" ; 


export default function Home(){

    const navigate = useNavigate()

    const {items  ,  isloading,fetchData  , getTasksByQuery } = useContext(TaskContext)

 


    const [form, setform] = useState({
        title : "" ,
        description : ""
    })
  

    const [status, setStatus] = useState('To Do');

    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };

    const [query ,setquery ]  = useState("All")

    const onChange = (e)=>{
        setform({...form , [e.target.name]  : e.target.value})
    }


    useEffect(()=>{

        if(localStorage.getItem("TodoToken") == null){
            navigate('/login')
        }else{
            fetchData()
        }


    },[])

  
    


    const handleSubmit = async ()=>{

    
        const token  = localStorage.getItem("TodoToken")

        const datatoSend = {
            title : form.title , 
            description : form.description , 
            status : status
        }
        console.log(datatoSend)
    
        const response = await fetch('http://localhost:8000/api/task/create'  , {
            method : 'POST'  , 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(datatoSend) 
        })

        const data = await response.json()

        if(data.success){
            toast.success("Task Created Successfully")
            fetchData()

        }else{

            toast.error("Something Went Wrong")
        }

        setform({
            title : "" ,
            description : ""})



        setStatus('To Do')

    
    }

    const  handleQueryChange = async(e)=>{
        setquery(e.target.value)
        if(e.target.value.trim() == "All"){
            fetchData()
            return ; 
        }
      

            const trimquery = e.target.value.trim()
            getTasksByQuery(trimquery)
         
       
    }


    return(
        <> 
            <div className="w-[85%] mx-auto md:w-[60%]" > 

            


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



        <button type="button" className="  w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 
         hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Add </button>
</form>

<div>
    



<form className="max-w-sm mx-auto">
  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"   value={query}  onChange={handleQueryChange}  >

    <option>All </option>
    <option>To Do</option>
    <option>In Progress</option>
    <option>Done</option>
  </select>
</form>

    
</div> 



{!isloading && 





    <div>
      
       
        
        {items.map((item)=>{
            return(
                <Taskitem data={item} key={item._id} />
            )
        })}
   
    </div> 
    
    }

        <div className="flex justify-center items-center mt-5 " > 
        {isloading && <HashLoader/>}
            </div> 

   

            </div>
        </>
    )
}