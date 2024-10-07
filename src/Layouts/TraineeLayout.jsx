import React from 'react'

import { Outlet } from 'react-router-dom'
import TraineeRoute from '../Components/Auth/ProtectedRoutes/TraineeRoute'
import Navbar from '../Components/Trainee/Navbar/Navbar'
import Footer from '../Components/Trainee/Footer/Footer'

export default function TraineeLayout() {
  return (
    <>
    <TraineeRoute>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </TraineeRoute>
    
    </>
  )
}
