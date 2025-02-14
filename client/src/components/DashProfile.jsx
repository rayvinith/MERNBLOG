import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {updateFailure, updateStart,updateSuccess} from "../redux/user/userSlice"

export default function DashProfile() {
  const {currentUser} =useSelector(state=>state.user)
//  user image functionality

const [imageFile,setImageFile]=useState(null);
const [imageFileUrl,setImageFileUrl]=useState(null)
const [formdata,setFormData]=useState({});
const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
const [updateUserError,setUpdateUserError]=useState(null);
const filePickerRef=useRef();

const handleImageChange=(e)=>{
  const file=e.target.files[0];
if(file){
  setImageFile(file);
 setImageFileUrl(URL.createObjectURL(file));
}
}
  console.log(imageFile,imageFileUrl);
  
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile]);

  const uploadImage=async()=>{
  console.log('uploading image');
  
  }
  
// handle form data 
const dispatch=useDispatch();

const handleInputChange=(e)=>{
setFormData({...formdata,[e.target.id]:e.target.value})
}
console.log(formdata);

// handleSubmit
const handleSubmit=async(e)=>{
// prevent default behaviour of submission

e.preventDefault();
// no erorr here 
setUpdateUserError(null);
setUpdateUserSuccess(null);


// update user data in backend using API

try {
  dispatch(updateStart())
  const res=await fetch(`/api/user/update/${currentUser._id}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formdata)
  })
  const data=await res.json();
  if(!res.ok){
  dispatch(updateFailure(data.message))
  setUpdateUserError(data.message)
  }
 else{
  dispatch(updateSuccess(data))
  setUpdateUserSuccess("Successfully updated user")
 }
} catch (error) {
  dispatch(updateFailure(error.message))
}

}





  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className='flex flex-col space-y-4 ' onSubmit={handleSubmit}>
        {/* complete user image upload functionality */}
   {/* <input type='file' ref={filePickerRef}  accept='image/*' className='bg-white text-black' onChange={handleImageChange}/>
       <div 
       className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
       onClick={()=>filePickerRef.current.click()}
       > 
        <img 
        src={imageFileUrl || currentUser.profilePicture} 
        alt="user" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover '/>
        </div> */}
     <TextInput 
     type="text" 
     id="username" 
     placeholder="Username" onChange={handleInputChange}
     defaultValue={currentUser.username}/>

<TextInput 
     type="email" 
     id="email" 
     placeholder="email" onChange={handleInputChange}
     defaultValue={currentUser.email}/>

<TextInput 
     type="password" 
     id="password" 
     placeholder="password" onChange={handleInputChange}
     defaultValue="**********"/>
   
     <Button gradientDuoTone='purpleToPink' type='submit' outline> 
        Update
     </Button>


      </form>

    <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
    </div>
{
  updateUserSuccess && (
    <Alert color="success" className='mt-5'>{updateUserSuccess}</Alert>
  )}

{
  updateUserError && (
    <Alert color="failure" className='mt-5'>{updateUserError}</Alert>
  )}

    </div>
  )
}
