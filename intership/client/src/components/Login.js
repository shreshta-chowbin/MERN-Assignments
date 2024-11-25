import React, { useRef } from 'react';
import {useNavigate,} from 'react-router-dom';

function Login() {

  let userNameInputRef=useRef();
  let passwordInputRef=useRef();
  let passwordImgRef=useRef();

  let spanRef=useRef();

  let navigate=useNavigate();


  let onLogin=async()=>{

    let validation={
      useName:userNameInputRef.current.value,
      password:passwordInputRef.current.value,
    };

    if(validation.useName===""||validation.password==="")
    {
      spanRef.current.innerHTML="Please Enter User Name & Password";
    }
    if(validation.useName!=="")
    {
      if(validation.useName!=="Shreshta Chowbin")
      {
        spanRef.current.innerHTML="Invalid UserName";
      }
      else if(validation.useName==="Shreshta Chowbin" && validation.password==="")
      {
        spanRef.current.innerHTML="Please Enter Your Password";
      }
      else if(validation.useName==="Shreshta Chowbin" && validation.password!=="Shreshta")
      {
        spanRef.current.innerHTML="Invalid Password";
      }
      else if(validation.useName==="Shreshta Chowbin" && validation.password==="Shreshta")
      {
        localStorage.setItem("username",userNameInputRef.current.value);
        localStorage.setItem("password",passwordInputRef.current.value);
        navigate('/dashboard');
      }
      else if(validation.password!=="Shreshta")
      {
        spanRef.current.innerHTML="Invalid Password";
      }
      else
      {
        spanRef.current.innerHTML="";
      }
    }
  };

  let nullInputs=(inputRef,spanRef)=>{
    if(inputRef.current.value!=="")
    {
      spanRef.current.innerHTML="";
    }
  };

  return (
    <div className='loginDiv alignCenter'>
      <div className='alignCenter'>
      <form>
        <div className='loginHeadingDiv'><h2>ADMIN</h2></div>
        <div><span ref={spanRef}></span></div>
        <div>
            <label>User Name</label>
            <input type='text' ref={userNameInputRef} onChange={()=>{
              nullInputs(userNameInputRef,spanRef);
            }}></input>
        </div>
        <div className='passwordInputImgDiv'>
            <label>Password</label>
            <input type='password' ref={passwordInputRef} onChange={()=>{
              nullInputs(passwordInputRef,spanRef);
            }}></input>
            <img src='./images/eye-close.png' alt='hiddenPassword' ref={passwordImgRef}  onClick={()=>{

              if(passwordInputRef.current.type==="password")
              {
                passwordInputRef.current.type="text";
                passwordImgRef.current.src="./images/eye-open.png";
              }
              else
              {
                passwordInputRef.current.type="password";
                passwordImgRef.current.src="./images/eye-close.png";
              }
            }}></img>
        </div>

        <div className='buttonsDiv loginButton'>
            <label className='hidden'></label>
            <button type='button' onClick={()=>{
            onLogin();
            }}>Login</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
