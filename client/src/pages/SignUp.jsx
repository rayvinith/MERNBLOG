import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "flowbite-react";
export default function SignUp() {
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
<form className='flex flex-col gap-4'>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your username">Your Username</label>
<TextInput type="text" placeholder="Username" id="username"/>
</div>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your email">Your Email</label>
<TextInput type="text" placeholder="Email" id="email"/>
</div>
<div className=''>
{/* <Label value="Your username" className='bg-gray-600'/> */}
<label value="Your Password">Your Password</label>
<TextInput type="text" placeholder="Password" id="password"/>
</div>
<Button gradientDuoTone='purpleToPink' type='submit'>Sign up</Button>
</form>
<div className='flex gap-2 text-sm mt-5'>
  <span>Have an account ?</span>
  <Link to='/sign-in'>Sign In</Link>
</div>
</div>
     </div>
    </div>
  )
}
