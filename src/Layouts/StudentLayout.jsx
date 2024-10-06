import React from 'react'
import Navbar from '../Components/Student/Navbar/Navbar'
import Footer from '../Components/Student/Footer/Footer'
import { Outlet } from 'react-router-dom'
import TraineeRoute from '../Components/Auth/ProtectedRoutes/TraineeRoute'

export default function StudentLayout() {
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
