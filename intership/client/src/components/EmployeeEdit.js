import React, { useEffect, useRef, useState } from 'react'
import TopNavigation from './TopNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmployeeEdit() {
    
    const {i}= useParams();
    
    useEffect(()=>{
        employeeDetails();
    },[]);
    
    let storeObj=useSelector((store)=>{
        // console.log(store);
        return store;
    });
    
    
    let employeeDetails=()=>{
        try
        {
            nameInputRef.current.value=storeObj.employeeData[i].name;
            emailInputRef.current.value=storeObj.employeeData[i].email;
            mobileNoInputRef.current.value=storeObj.employeeData[i].mobileNo;
            designationSelectRef.current.value=storeObj.employeeData[i].designation;
            imgInputRef.current.file=storeObj.employeeData[i].profilePic;
            gender=storeObj.employeeData[i].gender;
            course=storeObj.employeeData[i].courses;
        }
        catch(err)
        {
            console.log("Unable to get employee data");
            console.log(err);
        }
    };
    
    let [selectedImage,setSelectedImage]=useState(`http://localhost:1234/${storeObj.employeeData[i].profilePic}`);
    let [gender,setGender]=useState();
    let [course,setCourse]=useState([]);
    
    let date= new Date();
    // console.log(date.toLocaleString());
    let today=new Intl.DateTimeFormat({
        dateStyle:"short",
    });
    let dateToday;

    let navigate=useNavigate();
    
    let nameInputRef=useRef();
    let emailInputRef=useRef();
    let mobileNoInputRef=useRef();
    let imgInputRef=useRef();
    let designationSelectRef=useRef();
    
    let submitButtonRef=useRef();
    
    let nameSpanRef=useRef();
    let emailSpanRef=useRef();
    let mobileNoSpanRef=useRef();
    let designationSpanRef=useRef();
    let genderSpanRef=useRef();
    let courseSpanRef=useRef();
    let imgSpanRef=useRef();


    let nameRegExp=/^[A-Za-z]{3,20}([ ][A-Za-z]{3,20})*$/;
    let emailRegExp= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let mobileNoRegExp= /^[6-9]\d{9}$/;

    let nameValidate=()=>{
        let result=nameRegExp.test(nameInputRef.current.value);
        // console.log(result);
        if(result===true)
        {
            nameSpanRef.current.innerHTML="";
        }
        else
        {
            nameSpanRef.current.innerHTML="Please Enter Valid Name";
        }
    };

    let emailValidate=()=>{
        let result=emailRegExp.test(emailInputRef.current.value);
        if(result===true)
        {
            emailSpanRef.current.innerHTML="";
        }
        else
        {
            emailSpanRef.current.innerHTML="Please Enter Valid Email ID";
        }
    };

    let mobileNoValidate=()=>{
        let result=mobileNoRegExp.test(mobileNoInputRef.current.value);
        if(result===true)
        {
            mobileNoSpanRef.current.innerHTML="";
        }
        else
        {
            mobileNoSpanRef.current.innerHTML="Please Enter Valid Mobile No.(India)";
        }
    };

    let validateFields=(inputRef,spanRef)=>{
        if(inputRef.current.value==="")
        {
            spanRef.current.innerHTML="This Field Is Required";
        }
        else
        {
            spanRef.current.innerHTML="";
        }
    };

    let designationValidate=()=>{
        if(designationSelectRef.current.value==="Select")
        {
            designationSpanRef.current.innerHTML="Please Choose Designation";
        }
        else
        {
            designationSpanRef.current.innerHTML="";
        }
    };
    
    let genderValidate=()=>{
        if(gender==="Male" || gender==="Female")
        {
            genderSpanRef.current.innerHTML="";
        }
        else
        {
            genderSpanRef.current.innerHTML="Please Choose Gender";
        }
    };

    let courseValidation=()=>{
        if(course.length===0)
        {
            courseSpanRef.current.innerHTML="Please Choose Your Course";
        }
        else
        {
            courseSpanRef.current.innerHTML="";
        }
    };

    console.log(course.length)

    // let imgValidate=()=>{
    //     if(imgInputRef.current.value==="")
    //     {
    //         imgSpanRef.current.innerHTML="Please Select Image";
    //     }
    //     else
    //     {
    //         imgSpanRef.current.innerHTML="";
    //     }
    // }
    
    let onFocusFields=(inputRef)=>{
        inputRef.current.style.backgroundColor="lightgrey";
        inputRef.current.style.height="25px";
    };
    
    let onBlurFields=(inputRef)=>{
        inputRef.current.style.backgroundColor="";
        inputRef.current.style.height="";
    }
    
    let onUpdateNavigation=()=>{
        let validate={
            name:nameSpanRef.current.innerHTML,
            email:emailSpanRef.current.innerHTML,
            designation:designationSpanRef.current.innerHTML,
            mobileNo:mobileNoSpanRef.current.innerHTML,
            gender:genderSpanRef.current.innerHTML,
            course:courseSpanRef.current.innerHTML,
            profilePic:imgSpanRef.current.innerHTML,
        };
        
        if(validate.name!==""||validate.email!==""||validate.designation!==""||validate.mobileNo!==""||validate.gender!==""||validate.course!==""||validate.profilePic!=="")
        {
            alert("Please Enter Employee Details");
        }
        else
        {
            alert("Successfully Updated Employee");
            dateToday=today.format(date);
            navigate('/employeeList');
        }
    };

    let onUpdateValidations=()=>{
        
        let validate={
            name:nameInputRef.current.value,
            email:emailInputRef.current.value,
            mobileNo:mobileNoInputRef.current.value,
            designationSelectRef:designationSelectRef.current.value,
        };
        
        if(validate.name!=="")
        {
            nameValidate();
        }
        else
        {
            validateFields(nameInputRef,nameSpanRef);
        }
            
        if(validate.email!=="")
        {
            emailValidate();
        }
        else
        {
            validateFields(emailInputRef,emailSpanRef);
        }
                
        if(validate.mobileNo!=="")
        {
            mobileNoValidate();
        }
        else
        {
            validateFields(mobileNoInputRef,mobileNoSpanRef);
        }
    
        designationValidate();
        genderValidate();
        courseValidation();
    };    
    
   
    let onUpdate= async()=>{

        let dataToSend=new FormData();
        dataToSend.append("name",nameInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value);
        dataToSend.append("designation",designationSelectRef.current.value);
        dataToSend.append("gender",gender);
        dataToSend.append("courses",course);
        dataToSend.append("date",dateToday);

        for(let i=0;i<imgInputRef.current.files.length;i++)
        {
            dataToSend.append("profilePic",imgInputRef.current.files[i]);
        }
        
        let reqOptions={
            method:"PUT",
            body:dataToSend,
        };

        try
        {
            let JSONDataEmployee=await fetch("http://localhost:1234/editEmployee",reqOptions);
            let JSODataEmployee=await JSONDataEmployee.json();
            console.log(JSODataEmployee);
            // alert(JSODataEmployee.mes);
        }
        catch(err)
        {
            console.log("Unable to receive response(Create Employee)")
            console.log(err);
        }
    };

    return (
        <div className='alignCenter'>
        <TopNavigation/>
        
        <div className='createEmployeeDiv'>
        <form>
            <div className='headingDiv'><h2>EDIT EMPLOYEE</h2></div>
            <div className='formFlexDiv'>
            <div className='formInputDiv'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} 
                onChange={()=>{
                    nameValidate();
                }}

                onBlur={()=>{
                    validateFields(nameInputRef,nameSpanRef);
                    onBlurFields(nameInputRef);
                }}

                onFocus={()=>{
                    onFocusFields(nameInputRef);
                }}
                ></input>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={nameSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='formInputDiv'>
                <label htmlFor='email'>Email</label>
                <input id='email' readOnly ref={emailInputRef} 
                onChange={()=>{
                    emailValidate();
                }}
                
                onBlur={()=>{
                    validateFields(emailInputRef,emailSpanRef);
                    onBlurFields(emailInputRef);
                }}

                onFocus={()=>{
                    onFocusFields(emailInputRef);
                }}
                ></input>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={emailSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='formInputDiv'>
                <label htmlFor='mobileNo'>Mobile No</label>
                <input id='mobileNo' ref={mobileNoInputRef} 
                onChange={()=>{
                    mobileNoValidate();
                }}
                
                onBlur={()=>{
                    validateFields(mobileNoInputRef,mobileNoSpanRef);
                    onBlurFields(mobileNoInputRef);
                }}

                onFocus={()=>{
                    onFocusFields(mobileNoInputRef);
                }}
                ></input>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={mobileNoSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='formInputDiv'>
                <label htmlFor='designation'>Designation</label>
                <select id='designation' ref={designationSelectRef} onChange={()=>{
                    designationValidate();
                }}>
                    <option>Select</option>
                    <option value='HR'>HR</option>
                    <option value='Manager'>Manager</option>
                    <option value='Sales'>Sales</option>
                </select>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={designationSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='genderDiv'>
                <label>Gender</label>
                <div className='genderRadioDiv'>
                <div>
                <input type='radio' name='gender' value='Male' id='male' onChange={(eObj)=>{
                    if(eObj.target.checked===true)
                    {
                        setGender(eObj.target.value);
                        genderSpanRef.current.innerHTML="";
                    }
                }}
                ></input>
                <label htmlFor='male'>Male</label>
                </div>
                
                <div>
                <input type='radio' name='gender' value='Female' id='female' onChange={(eObj)=>{
                    if(eObj.target.checked===true)
                    {
                        setGender(eObj.target.value);
                        genderSpanRef.current.innerHTML="";
                    }
                }}
                ></input>
                <label htmlFor='female'>Female</label>
                </div>
                </div>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={genderSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='genderDiv'>
                <label>Course</label>
                <div className='genderRadioDiv'>
                <div>
                <input type='checkbox' id='mca' value='MCA' onChange={(eObj)=>{
                    
                    let value=eObj.target.value;

                    if(eObj.target.checked===true)
                    {
                        setCourse([...course,value]);
                        courseSpanRef.current.innerHTML="";
                    }
                    else
                    {
                        setCourse(course.filter(i=>i!==value));
                    }
                    
                }}></input>
                <label htmlFor='mca'>MCA</label>
                </div>
                <div>
                <input type='checkbox' id='bca' value='BCA' onChange={(eObj)=>{
                    let value=eObj.target.value;
                    
                    if(eObj.target.checked===true)
                    {
                        setCourse([...course,value]);
                        courseSpanRef.current.innerHTML="";
                    }
                    else
                    {
                        setCourse(course.filter(i=>i!==value));
                    }
                    
                }}></input>
                <label htmlFor='bca'>BCA</label>
                </div>
                <div>
                <input type='checkbox' id='bsc' value='BSC' onChange={(eObj)=>{
                    
                    let value=eObj.target.value;

                    if(eObj.target.checked===true)
                    {
                        setCourse([...course,value]);
                        courseSpanRef.current.innerHTML="";
                    }
                    else
                    {
                        setCourse(course.filter(i=>i!==value));
                    }
                    
                }}></input>
                <label htmlFor='bsc'>BSC</label>
                </div>
                </div>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={courseSpanRef}></span>
            </div>
            </div>

            <div className='formFlexDiv'>
            <div className='imgDiv'>
                <label htmlFor='imgs'>Img Upload</label>
                <div className='imgInputDiv'>
                <div><img src={selectedImage} alt='defalutImg'></img></div>
                <div><label htmlFor='imgs'>Select Image</label><input id='imgs' type='file' ref={imgInputRef} onChange={(eObj)=>{
                    let selectedImageURL=URL.createObjectURL(eObj.target.files[0]);
                    setSelectedImage(selectedImageURL);
                }}></input></div>
                </div>
            </div>
            <div className='spanAlerts'>
                <label></label>
                <span ref={imgSpanRef}></span>
            </div>
            </div>

            <div className='alignCenter buttonsDiv'>
                <button type='button' ref={submitButtonRef} onClick={()=>{ 
                    onUpdateValidations();
                    onUpdateNavigation();
                    onUpdate();
                }}>Submit</button>
            </div>
        </form>
        </div>

    </div>
  )
}

export default EmployeeEdit
