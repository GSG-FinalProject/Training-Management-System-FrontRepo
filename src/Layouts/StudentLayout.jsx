import React from 'react'
import Navbar from '../Components/Student/Navbar/Navbar'
import Footer from '../Components/Student/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function StudentLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
