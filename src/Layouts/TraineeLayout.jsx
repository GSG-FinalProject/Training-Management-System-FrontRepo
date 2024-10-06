import React from 'react'
import Navbar from '../Components/Trainee/Navbar/Navbar'
import Footer from '../Components/Trainee/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function TraineeLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
