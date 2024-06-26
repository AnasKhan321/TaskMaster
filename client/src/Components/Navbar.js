import React ,{useEffect ,useState  , useContext} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import {TaskContext}  from '../Context/ContextApi.js' ; 
const Navbar = () => {
  const [username, setusername] = useState(null)

  const [isHovered, setIsHovered] = useState(false);
  const navigation = useNavigate()

  const {islogin , setislogin }  = useContext(TaskContext)

  useEffect(()=>{
    ChangeName()

  },[])

  const ChangeName  = ()=>{
    if(localStorage.getItem("TodoName") !== null){
      setusername(localStorage.getItem("TodoName"))
      setislogin(true)
    }else{
      setusername(null)
      setislogin(false)
    }
  }

  useEffect(()=>{
    ChangeName()
  },[islogin])

  const LogOut = ()=>{
    localStorage.removeItem('TodoName');
    localStorage.removeItem("TodoToken"); 
    ChangeName()
    navigation('/login')
   

  }

  return (
    <nav className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200  p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-gray-900 text-2xl font-bold">

        <Link to="/">    TaskMaster  </Link>
      
      </div>

     
      
      <div className='flex flex-col items-center justify-center'>

      
    {username && 
          <div className='flex flex-col items-center justify-center cursor-pointer relative'   onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                          <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      
                            <div>
                              {username}
                      
                            </div>

                            {isHovered && (
              <button 
                className="absolute top-0 right-0 mt-12   mr-0  bg-lime-500 text-white px-4 py-2 rounded" 
                onClick={LogOut}
              >
                Logout
              </button>
            )}
          </div> 

           

    }




    {!username && 
    <Link className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br 
    px-4 py-2 shadow-xl" to="/login">Sign In</Link>
    
    
    }
 

       
      </div>
    </div>
  </nav>
  )
}

export default Navbar; 