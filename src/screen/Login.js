import React,{useState} from 'react'
import {Link,}from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const Navigate=useNavigate();
  const[credentials,setcredentials]= useState({name:"",email:"",password:"",geolocation:""})
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response= await fetch("http://localhost:5000/api/loginuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
    })
const data=await response.json()

console.log(data);
if(!data.success){
  alert("enter valid credentials");
}
if(data.success){
  localStorage.setItem("authtoken",data.authtoken);
  console.log(localStorage.getItem("authtoken"))
  Navigate("/");
}
}
  const  onChange=(event)=>{
     setcredentials({...credentials,[event.target.name]:event.target.value})}
  return (
    <div >
    <Navbar/>
       <div className='container m-5' >
        <form onSubmit={handleSubmit}>
      

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
 
 
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user </Link>

</form>
    </div>
    </div>
  )
}
