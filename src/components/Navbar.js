import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import Badge from 'react-bootstrap/Badge' 
import Modal from '../Modal'
import Cart from "../screen/Cart"
import {useCart}from '../components/ContextReducer'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar() {

  const [cartView,setCartView]=useState(false);
  let data=useCart();
  const navigate= useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("authtoken");
  navigate("/login")
}
  return (
    <div >
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to ="/">FOODY</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav me-auto mb-2">
        <Link  className="nav-link active" aria-current="page" to ="/">Home</Link>
        {(localStorage.getItem("authtoken"))?<li className="nav-item">
<Link className="nav-link active fs-5" aria-current="page" to="/">My orders</Link>
        </li>:" "}
       
       
      </div>
      {(!localStorage.getItem("authtoken"))?
      <div className='d-flex'>
      <Link  className="btn bg-white text-success mx-1" to ="/login">Login</Link>
        <Link  className="btn bg-white text-success mx-1" to ="/createuser">SignUp</Link>
        </div>
        :
        <div>
        <div className='btn bg-white text-success mx-2' onClick={() => setCartView(true)}>
       Mycart{" "}
       <Badge pill bg="danger">{data.length}</Badge>
    </div>
    {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
        <div className='btn bg-white text-danger mx-2 ' onClick=
{handleLogout}
      >
        Logout
    </div>
    </div>
      }
  </div>
  </div>
</nav>
</div>
    
  )
}



