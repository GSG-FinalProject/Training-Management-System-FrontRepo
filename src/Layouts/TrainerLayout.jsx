import React from 'react'
import Navbar from '../Components/Trainer/Navbar/Navbar'
import Footer from '../Components/Trainer/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function TrainerLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}
