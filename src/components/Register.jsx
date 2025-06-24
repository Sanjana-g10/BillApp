import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { CgNametag } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import {validatePassword} from "val-pass"
import empServices from '../services/empServices';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  let navigate=useNavigate()
  let [formData, setFormData] =useState({
    userName:"",
    password:"",
    name:"",
    email:""
  })

  let [repeatPassword,setRepeatPassword]=useState(true)
  let[errorMessage, setErrorMessage]=useState("")


  let handelChange=e=>{
    let {name,value}=e.target
    if(name=="password"){
      let {validateAll,getAllValidationErrorMessage}=validatePassword(value,8)
      // console.log(validateAll());
      // console.log(getAllValidationErrorMessage());
      
      validateAll()?setErrorMessage(""):setErrorMessage(getAllValidationErrorMessage())
      value==""&&setErrorMessage("")
    }
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  let handelSubmit=e=>{
    e.preventDefault()
    let {name,userName,email,password}=formData
    console.log(formData);
    
    if(!name|| !userName|| !password|| !email){
      // alert("all feilds are mandatory")
      toast.error("All fields are mandatory")
      return
    }
    let {validateAll,getAllValidationErrorMessage}=validatePassword(password)
    if(!validateAll()){
      toast.error(`${getAllValidationErrorMessage()}`)
    }
    if(!repeatPassword){
      toast.error("password and confirm password did not match")
      return
      // console.log(formData);
    };


(async()=>{
  let data= await empServices.regiUser(formData)
  try{
    if(data.status==201){
      toast.success("Registered Succesfully")
    //   navigate("/login")
    }
  else{
      toast.error("Registration failed")
  }
}
   catch(error){
     toast.error("Registration failed")
   }
})()
    
    console.log(formData);
    }

    let handlePasswordCheck=(e)=>{
        // setRepeatPassword(e.target.value)
        // console.log(repeatPassword)
        
        // if(formData.password!=e.target.value){
        //   e.target.style.borderBottom="2px solid red"
        // }else{
        //   e.target.style.borderBottom="2px solid white"
        //         }

           let {value} = e.target
           formData.password !=value?setRepeatPassword(false):setRepeatPassword(true)
           value==""&&setRepeatPassword(false)
        }


  return (
  <div className='bg-[#efefef] size-full flex justify-center items-center' >
    <form action="" className='bg-white w-1/2 h-[90%] flex justify-center items-center flex-col gap-8 px-[80px] py-40 rounded-2xl max-sm:w-[90%]	overflow-hidden' onSubmit={handelSubmit}>
      <div className= 'w-full  flex  justify-center items-center text-3xl font-bold'>
        <h1>Registration Form</h1>
        </div>
      <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
         <input type="text" name='name'  placeholder='Enter Name'  className='w-full outline-none px-4 h-10 ' 
         onChange={handelChange}/>
         <CgNametag />
      </div>

            <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
         <input type="text"name='userName' placeholder='Enter User Name' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
         <CiUser />
      </div>

            <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
         <input type="email" name='email' placeholder='Enter Email'className='w-full outline-none px-4 h-10'  onChange={handelChange}/>
         <MdOutlineMailOutline />
      </div>

            <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
         <input type="password"  name='password' placeholder='Enter Password' className='w-full outline-none px-4 h-10'  onChange={handelChange}/>
         <RiLockPasswordLine />
      </div>

        <div className={errorMessage?'w-full flex justify-center items-center px-3 rounded-sm':'hidden'}>
    <span className='text-red-700'>*{errorMessage}</span>
  </div>


            <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
         <input type="password"  placeholder='Re-type Password' className='w-full outline-none px-4 h-10' onChange={handlePasswordCheck} />
         <RiLockPasswordFill />
      </div>
  



      <div className='bg-black text-amber-50 w-full  flex  justify-center items-center rounded-sm'>
        <button className='w-full outline-none px-4 h-10 hover:bg-[#777] active:bg-lime-100 active:scale-[0.8]' >Click</button>
      </div>
    </form>
  </div>
  )
}

export default Register

