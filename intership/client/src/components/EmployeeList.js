import React, { useEffect, useState } from 'react'
import TopNavigation from './TopNavigation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function EmployeeList() {

  useEffect(()=>{
    employeeData();
  },[]);
  
  let dispatch=useDispatch();
  let navigate=useNavigate();
  
  let [employee,setEmployee]=useState([]);
  let [searchInput,setSearchInput]=useState("");
  
  
  let employeeData=async()=>{
    
    let reqOptions={
      method:"GET",
    };

    try
    {
      let JSONDataEmployee=await fetch("http://localhost:1234/employeeData",reqOptions);
      let JSODataEmployee=await JSONDataEmployee.json();
      setEmployee(JSODataEmployee);
      // console.log(JSODataEmployee);
      dispatch({type:"employeeData",data:JSODataEmployee});
    }
    catch(err)
    {
      console.log("Unable to receive response(Employee List)");
      console.log(err);
    }
  };


  let onDelete=async(ele)=>{

    let reqOptions={
      method:"DELETE",
    };
    
    try
    {
      let url=`http://localhost:1234/delete/${ele.email}`;
      let JSONDataDelete=await fetch(url,reqOptions);
      let JSODataDelete=await JSONDataDelete.json();
      console.log(JSODataDelete);
      window.location.reload();
    }
    catch(err)
    {
      console.log("Unable to delete employee data");
      console.log(err);
    }
  };

  return (
    <div className='employeeListDiv'>
      <TopNavigation/>
      <div>
      <table>
        <colgroup>
          <col span={4}></col>
          <col span={1} style={{backgroundColor:"rgb(204, 204, 204)"}}></col>
        </colgroup>
        <caption>
          <div className='captionDiv'>
            <span>{`Total Count : ${employee.length}`}</span>
              <button type='button' onClick={()=>{
          navigate('/createEmployee');
        }}>Create Employee</button>
          </div>
          <div className='captionInputDiv'>
        <input placeholder='Search Name' value={searchInput} onChange={(eObj)=>{
          let userInput=eObj.target.value;
          setSearchInput(userInput);
        }}
        ></input></div>
        </caption>
        <thead>
          <tr><th>SNo</th><th>ID</th><th>Image</th><th>Name</th><th>Email</th><th>Mobile No</th><th>Designation</th><th>Gender</th><th>Courses</th><th>Created Date</th><th>Action</th></tr>
        </thead>
        <tbody className='employeeListTable'>
          {employee.filter((ele)=>{
            // console.log(ele);
            return searchInput===""?ele: ele.name.includes(searchInput);
          }).map((ele,i)=>{
            return (
              <tr key={i}><td>{i+1}</td><td>{ele._id}</td><td><img src={`http://localhost:1234/${ele.profilePic}`} alt=''></img></td><td>{ele.name}</td><td>{ele.email}</td><td>{ele.mobileNo}</td><td>{ele.designation}</td><td>{ele.gender}</td><td>{ele.courses}</td><td>{ele.date}</td>
              <td><div className='editDelete'><button type='button' style={{backgroundColor:"green"}} onClick={()=>{navigate(`/employeeEdit/${i}`)}}>Edit</button><button type='button' onClick={()=>{onDelete(ele)}}>Delete</button></div></td></tr>)
            })}
        </tbody>
        <tfoot></tfoot>
      </table>
      </div>
    </div>
  )
}

export default EmployeeList
