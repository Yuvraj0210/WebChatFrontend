import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from  "../main_logo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from "../utils/APIRoutes";

const toastOptions = {
  position:"bottom-right",
  autoClose:8000,
  pauseOnHover:true,
  dragable:true,
}

function Login() {
  const navigate = useNavigate();

  const [values,setValues] = useState({
    username:"",
    password:"",
    
  })

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/Chat")
    }
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    if(handleValidation()){
      const {password,username} = values;
      const {data} = await axios.post(loginRoute,{
        username,
        password,
      })
      if(data.status === false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status ===true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        console.log(data.user);
        navigate("/Chat");
        
      }

    }
  }
  
  const handleChange = (e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const handleValidation = ()=>{
    const {username,password} = values;
    
    
    if(username.length === ""){
      toast.error("username is required",toastOptions)
      return false;
    }
    else if(password === ""<7){
      toast.error("password is required",toastOptions)
      return false;
    }
    return true;
  }
  return (
    <>
    <FormContainer>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <div className = "brand">
      <img src = {logo} alt = ""/>
      <h1>WebChat!</h1>
    </div>
    <input
    type = "text"
    placeholder="Username"
    name = "username"
    onChange = {(e)=>{handleChange(e)}}
    />
    
    <input
    type = "password"
    placeholder="Password"
    name = "password"
    onChange = {(e)=>{handleChange(e)}}
    />
    
    <button type = "submit">Login</button>
    <span>
      Don't have an Account? <Link to="/register">Register</Link>
    </span>
    </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}

const FormContainer  = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;

.brand{

  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform:uppercase;
  }
}
form{
  
  z-index:1;
  display:flex;
  flex-direction:column;
  gap:2rem;
  background-color:#00000076;
  
  border-radius:2rem;
  padding:3rem 5rem;
  input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    border-radius:0.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border:0.1rem solid #997af0;
      outline:none;
    }

  }
  button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    &:hover:{
      background-color:#4e0eff;
    }
  }
  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0eff;
      text-decoration:none;
      font-weight:bold;
    }
  }
}

`;

export default Login;
