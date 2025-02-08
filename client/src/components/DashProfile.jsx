import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashProfile() {
  const {currentUser} =useSelector(state=>state.user)
  console.log("hello");
  
  console.log(currentUser.profilePicture);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className='flex flex-col space-y-4 '>
       <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'> 
        <img 
        src={currentUser.profilePicture} 
        alt="user" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover '/>
        </div>
     <TextInput 
     type="text" 
     id="username" 
     placeholder="Username" 
     defaultValue={currentUser.username}/>

<TextInput 
     type="email" 
     id="email" 
     placeholder="email" 
     defaultValue={currentUser.email}/>

<TextInput 
     type="password" 
     id="password" 
     placeholder="password" 
     defaultValue="**********"/>
   
     <Button gradientDuoTone='purpleToPink' type='submit' outline> 
        Update
     </Button>


      </form>

    <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
    </div>

    </div>
  )
}
