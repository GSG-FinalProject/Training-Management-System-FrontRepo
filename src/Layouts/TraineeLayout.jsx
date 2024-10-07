import React from 'react'

import { Outlet } from 'react-router-dom'
import TraineeRoute from '../Components/Auth/ProtectedRoutes/TraineeRoute'

export default function StudentLayout() {
  return (
    <>
    <TraineeRoute>
      {/* <Navbar/> */}
      <Outlet/>
      {/* <Footer/> */}
    </TraineeRoute>
    
    </>
  )
}
