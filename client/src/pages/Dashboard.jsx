import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
export default function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('profile');
  useEffect(() => {
    
  const urlParams=new URLSearchParams(location.search)
  const tabFormUrl=urlParams.get('tab')
   //console.log(tabFormUrl);
   if(tabFormUrl){
setTab(tabFormUrl)
   }
  }, [location.search])
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 '>
        {/* Sidebar */}
        <DashSidebar/>
       
      </div>
      {tab === 'profile' &&  <DashProfile/>}
    </div>
  )
}
