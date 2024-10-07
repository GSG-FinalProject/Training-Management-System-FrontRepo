import React from 'react'

import { Outlet } from 'react-router-dom'
import TrainerRoute from '../Components/Auth/ProtectedRoutes/TrainerRoute'
import Navbar from '../Components/Trainer/Navbar/Navbar'
import Footer from '../Components/Trainee/Footer/Footer'


export default function TrainerLayout() {
  return (
    <TrainerRoute>
      <Navbar/>
    <Outlet/>
    <Footer/>
    </TrainerRoute>
    
    
  )
}
