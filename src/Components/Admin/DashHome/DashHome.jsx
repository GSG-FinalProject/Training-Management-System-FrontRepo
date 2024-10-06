import React, { useContext, useEffect } from 'react'
import { BsJustify } from 'react-icons/bs'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext';

export default function DashHome({OpenSidebar}) {
  const navigate = useNavigate()
  // let {userToken,setUserToken} = useContext(UserContext);
  // useEffect(()=>{
  //   if (!userToken) {
  //       // If no userToken, redirect to login page or handle it accordingly
  //       navigate('/login');
  //       return null; // Prevent rendering of the component
  //   }
  // },[])
    
  return (
    <>
    <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
    <Outlet/>
    </>
  )
}
// import React, { useContext, useEffect } from 'react';
// import { BsJustify } from 'react-icons/bs';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../../Context/UserContext';

// export default function DashHome({ OpenSidebar }) {
//   const navigate = useNavigate();
//   let { userToken } = useContext(UserContext);

//   useEffect(() => {
//     if (!userToken) {
//       // If no userToken, navigate to login page
//       navigate('/login');
//     }
//     // No need to return anything in this useEffect
//   }, [userToken, navigate]); // Adding dependencies to prevent unnecessary renders

//   // Conditional rendering based on userToken
//   if (!userToken) {
//     return null; // Prevents rendering the component until the token is present
//   }

//   return (
//     <>
//       <div className='menu-icon'>
//         <BsJustify className='icon' onClick={OpenSidebar} />
//       </div>
//       <Outlet />
//     </>
//   );
// }
