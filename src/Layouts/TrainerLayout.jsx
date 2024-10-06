import React from 'react'
import Navbar from '../Components/Trainer/Navbar/Navbar'
import Footer from '../Components/Trainer/Footer/Footer'
import { Outlet } from 'react-router-dom'
import TrainerRoute from '../Components/Auth/ProtectedRoutes/TrainerRoute'

export default function TrainerLayout() {
  return (
    <TrainerRoute>
      <Navbar/>
    <Outlet/>
    <Footer/>
    </TrainerRoute>
    
    
  )
}
