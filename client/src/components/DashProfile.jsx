import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {updateFailure, updateStart,updateSuccess,deleteUserStart,deleteUserSuccess,deleteUserFailure} from "../redux/user/userSlice"
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function DashProfile() {
  const {currentUser,error} =useSelector(state=>state.user)
//  user image functionality

const [imageFile,setImageFile]=useState(null);
const [imageFileUrl,setImageFileUrl]=useState(null)
const [formdata,setFormData]=useState({});
const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
const [updateUserError,setUpdateUserError]=useState(null);
const [showModal,setShowModal]=useState(false)

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

// onClick={handleDeleteUser} IN MODEL 
const handleDeleteUser=async()=>{
setShowModal(false)  
try {
  dispatch(deleteUserStart())
  const res=await fetch(`/api/user/delete/${currentUser._id}`,{
    method:'DELETE',
    headers:{'Content-Type':'application/json'}
  })
  const data=await res.json();
  if(!res.ok){
  dispatch(deleteUserFailure(data.message))
  }
  else{
  dispatch(deleteUserSuccess())
  }

} catch (error) {
  dispatch(deleteUserFailure(error.message))
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
      <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
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

{
  error && (
    <Alert color="failure" className='mt-5'>{error}</Alert>
  )}


<Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md' >
<Modal.Header/>
   <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account  </h3>
    </div>
    <div className='flex justify-between gap-4'>
      <Button color='failure' onClick={handleDeleteUser}>Yes I'm Sure</Button>
      <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
    </div>
   </Modal.Body>
</Modal>

    </div>
  )
}
