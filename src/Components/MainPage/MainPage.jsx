import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainPage() {
  return (
    <>
    <Navbar/>
    <section className="main-page">
        <div className="container">
            <div className="row justify-content-center align-items-center py-4">
                <div className="col-md-6">
                    <h2 className='headerrr'>UNLOCK YOUR POTENTIAL AND STREAMLINE YOUR TRAINING JOURNEY, THIS IS YOUR CHANCE TO MANAGE, LEARN, AND GROW WITH EASE!</h2>
                </div>
                <div className="col-md-6 ps-3">
<iframe src="https://lottie.host/embed/26305ffa-37c6-480f-a413-1d7cb796c90c/RPwb5N9NSK.json" width="500px" height="500px" />
                </div>
            </div>
        </div>
        
    </section>
    <Footer/>
    </>
    
  )
}
