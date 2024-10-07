import React from 'react'

import { Outlet } from 'react-router-dom'
import TrainerRoute from '../Components/Auth/ProtectedRoutes/TrainerRoute'

export default function TrainerLayout() {
  return (
    <TrainerRoute>
      {/* <Navbar/> */}
    <Outlet/>
    {/* <Footer/> */}
    </TrainerRoute>
    
    
  )
}
