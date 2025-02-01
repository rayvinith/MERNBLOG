import { Alert, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Button } from "flowbite-react";

export default function SignUp() {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
const [loading , setLoading]=useState(null);


  const handleChange=(event)=>{
    setFormData({...formData,[event.target.id]:event.target.value.trim()});
  }
  console.log(formData);
  
  const handleSubmit=async (event)=>{
    event.preventDefault();
    if(!formData.username || !formData.email || !formData.password)
    {
    return  setErrorMessage('All fields are required');
    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
    //  console.log(data);
      if(data.success == false){
        return setErrorMessage(data.message)

      }
      setLoading(false)

if(res.ok == true){
  navigate('/sign-in');
}

    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
    // send data to server
  }

  return (
    <div className='min-h-screen mt-20'>
     <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

      {/* this is left side  */}
<div className='leftSide flex-1'>
<Link to="/" className='
sm:text-xl font-bold dark:text-white text-4xl '>
<span className='px-2 py-1 bg-gradient-to-r from-indigo-500
via-purple-500 to-pink-500 rounded-lg text-hwite'>Yadav Ji</span>Blog
</Link>
<p className='text-small mt-5'>Sign up with email or google</p>
</div>
{/* this is right side  */}
<div className='rightSide flex-1'>
<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your username">Your Username</label>
<TextInput type="text" placeholder="Username" id="username"  onChange={handleChange}/>
</div>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your email">Your Email</label>
<TextInput type="email" placeholder="Email" id="email" onChange={handleChange}/>
</div>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your Password">Your Password</label>
<TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
</div>
<Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
  {
    loading? (<>
    <Spinner size='sm'/>
    <span className='pl-3 '>Loading...</span>
    </>):"Sign Up"
  }
</Button>
</form>
<div className='flex gap-2 text-sm mt-5'>
  <span>Have an account ?</span>
  <Link to='/sign-in'>Sign In</Link>
</div>
{
  errorMessage && (
    <Alert className='mt-5' color='failure'>
      {errorMessage}
    </Alert>
  )
}
</div>
     </div>
    </div>
  )
}
