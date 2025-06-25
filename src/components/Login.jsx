import React, { useState } from 'react'
import { CgNametag } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import empServices from '../services/empServices';
import toast from 'react-hot-toast';


const Login = () => {
     let navigate=useNavigate()
  let [formData, setFormData] =useState({

    password:"",
   
    email:""
  })

  let[errorMessage, setErrorMessage]=useState("")
  const handelChange=e=>{
    let {name,value}=e.target
    
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  const handelSubmit=e=>{
    e.preventDefault()
    let {password,email}=formData
    if(!password||!email){
      toast.error("All feilds are mandatory")
      return
    }
    
    // console.log(formData);
    
(async()=>{
let data=await empServices.loginUser(formData)
try {
  if(data.status==200){
  toast.success("Login successfully")
  navigate("/home")
}else{
  toast.error(`${data.response.data.message}`)
}
} catch (error) {
  toast.error("Something went wrong")
}
})()
   
  }
  return (
   <div className='bg-[#efefef] size-full flex justify-center items-center' >
    <form action="" className='bg-white w-1/2 h-[90%] flex justify-center items-center flex-col gap-8 px-[80px] py-40 rounded-2xl max-sm:w-[90%]	overflow-hidden'>
      <div className= 'w-full  flex  justify-center items-center text-3xl font-bold'>
        <h1>Login Form</h1>
        </div>
         <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
                 <input type="text" name='name'  placeholder='Enter Name'  className='w-full outline-none px-4 h-10 ' />
                 <CgNametag />
              </div>
               <div className='border-2 w-full flex justify-center items-center px-3 rounded-sm'>
                       <input type="password"  name='password' placeholder='Enter Password' className='w-full outline-none px-4 h-10'/>
                       <RiLockPasswordLine />
                    </div>
                     <div className='bg-black text-amber-50 w-full  flex  justify-center items-center rounded-sm'>
        <button className='w-full outline-none px-4 h-10 hover:bg-[#777] active:bg-lime-100 active:scale-[0.8]' >Click</button>
      </div>
      <div className='hover:underline'><Link to="register">Click Here to Register</Link></div>
        </form>
        </div>

  )
}

export default Login