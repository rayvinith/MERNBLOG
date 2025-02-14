import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
export default function DashSidebar() {
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
    <Sidebar className='w-full md:w-56 '>
      <Sidebar.Items className=''>
      <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
        <Sidebar.Item as="div" active={tab==='profile'} icon={HiUser} label="USER" labelColor="dark">
           Profile 
      </Sidebar.Item>
      </Link>
      <Sidebar.Item as="div" active icon={HiArrowSmRight} className="cursor-pointer">
          Sign Out
      </Sidebar.Item>

        </Sidebar.ItemGroup>  
      </Sidebar.Items>
    </Sidebar>
  )
}
