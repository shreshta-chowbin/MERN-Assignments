import React from 'react'
import { NavLink, } from 'react-router-dom';

function TopNavigation() {
  return (
    <nav className='topNavigationNav'>
      <NavLink to='/dashboard' style={(obj)=>{
        // console.log(obj);
        if(obj.isActive===true)
        {
         return{color:"black",backgroundColor:"white",padding:"3px",borderRadius:"15px",width:"20%",textAlign:"center",textDecoration:"none",fontSize:"1rem",fontWeight:"600",fontFamily:"cursive",};
        }
        else
        {
          return{color:"white",textDecoration:"none",};
        }
      }}>Home</NavLink>
      <NavLink to='/employeeList' style={(obj)=>{
        // console.log(obj);
        if(obj.isActive===true)
        {
          return{color:"black",backgroundColor:"white",padding:"3px",borderRadius:"15px",width:"20%",textAlign:"center",textDecoration:"none",fontSize:"1rem",fontWeight:"600",fontFamily:"cursive" };
        }
        else
        {
          return{color:"white",textDecoration:"none",};
        }
      }}>Employee List</NavLink>
      <NavLink to='/' style={{color:"white",textDecoration:"none",}}>{localStorage.getItem("username")} - Logout</NavLink>
    </nav>
  )
}

export default TopNavigation
