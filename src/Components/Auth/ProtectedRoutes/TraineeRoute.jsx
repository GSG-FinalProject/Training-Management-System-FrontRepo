import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function TraineeRoute({children}) {
    let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);
    const navigate = useNavigate();

    const TraineeAuth=()=>{
        if(userData){
         
      if(localStorage.getItem("userToken")==null){
        return navigate('/login')
     }}
    }
    useEffect(()=>{
        TraineeAuth()
    },[userData])
    
  return children
}
