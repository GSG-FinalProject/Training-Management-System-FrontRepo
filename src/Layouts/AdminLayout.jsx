import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../Components/Admin/Dashboard/Dashboard'
import DashHome from '../Components/Admin/DashHome/DashHome'

export default function AdminLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <div className='grid-container'>
    
      <Dashboard openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <DashHome OpenSidebar={OpenSidebar}/>
    </div>
    </>
    
  )
}
