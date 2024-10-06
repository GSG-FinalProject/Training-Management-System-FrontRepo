import React from 'react'
import './Loading.css'
export default function Loading() {
  return (
    <div className='loading bg-white position-fixed vh-100 w-75 d-flex justify-content-center align-items-center z-3'>
      <span className="loader"></span>
    </div>
  )
}
