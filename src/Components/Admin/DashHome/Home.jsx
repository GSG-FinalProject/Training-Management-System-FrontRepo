import React, { useContext } from 'react'
import './Home.css'
import { UserContext } from '../../../Context/UserContext';
export default function Home() {
  let {userToken,setUserToken,userData} = useContext(UserContext);

  return (
    <>
    <h1 className='ps-3 pt-3 pb-3'><span className='border border-2 p-2 border-primary-subtle border'>Welcome "{userData.firstName} {userData.lastName}"</span></h1>
    <div className="image-container">
    <img src='/TMS.png' className='TMSImg'/>
  </div>
    </>
    
  )
}
