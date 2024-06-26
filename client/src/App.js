import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login'; 
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Update from './Components/Update.js'
function App() {
  return (
    <>

    <Router>
    <ToastContainer />
      <Navbar/>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={ <SignUp/> }/>
      <Route path="/update/:id" element={ <Update/> }/>
      </Routes>

    </Router>
    
      
    
    </>
  );
}

export default App;
