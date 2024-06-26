import React,{useState , useEffect  , useContext} from "react"
import { useNavigate , Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {TaskContext}  from '../Context/ContextApi.js' ; 
export default function SignUp(){


  const navigate = useNavigate()
  const {setislogin }  = useContext(TaskContext)
    const [form ,setform ]  = useState({
        username : ""  , 
        email : "" ,
        password : ""
    })
    const [cpassword , setcpassword]  = useState("")

    const onChange = (e)=>{
        setform({...form , [e.target.name]  : e.target.value})
    }


    const handleSubmit = async()=>{
      
        if(form.password !== cpassword || form.password.length < 8 ){
            return 
        }



        const response = await fetch(`http://localhost:8000/api/auth/signup`  , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form) 

        })

        const data = await response.json()
        if(data.success){
          toast.success("Login Successfully ")
          localStorage.setItem("TodoToken"  , data.token)
          localStorage.setItem("TodoName"  , data.username)
          setislogin(true)
          navigate('/')
        }else{
          toast.error(data.error)
        }
            
    }

    return(
        <div className="w-[80%] mx-auto md:w-[40%]"> 


<div class="w-full w-full ">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.username} onChange={onChange} name="username" id="username" type="text" placeholder="Username"/>
    </div>



    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" value={form.email} name="email" onChange={onChange} type="text" placeholder="Email"/>
    </div>


    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={form.password}  name="password" id="password" type="password" placeholder="******************" onChange={onChange}/>
  
    </div>


    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Re type Password
      </label>
      <input class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="cpassword" id="cpassword" value={cpassword} onChange={(e)=>{
        setcpassword(e.target.value)
      }} type="password" placeholder="******************"/>
  
    </div>



    <p className="mb-2" > Already Have Account? <span className="font-bold text-lime-600" >  <Link to="/login"> Login  </Link>  </span></p>


    <div class="flex items-center justify-between">
    <button type="button" className="  w-full  text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Sign Up </button>
   
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>



        </div>
    )
}