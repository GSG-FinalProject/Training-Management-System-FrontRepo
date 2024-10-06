// import React, { useContext } from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
// import {
//   RouterProvider,
// } from "react-router-dom";
// import {router} from './Layouts/Router.jsx' 
// import { UserContext } from './Context/UserContext.jsx';
// export default function App() {
//   let{setUserToken} = useContext(UserContext);
//   useEffect(()=>{
//     if(localStorage.getItem('userToken')!=null){
//       setUserToken(localStorage.getItem('userToken'));
//     }
//   },[])

//   return (
//     <RouterProvider router={router} />
//   )
//}

import React, { useContext, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { RouterProvider } from "react-router-dom";
import { router } from './Layouts/Router.jsx'; 
import UserContextProvider, { UserContext } from './Context/UserContext.jsx';  // Import the default and named exports

export default function App() {
  return (
    <UserContextProvider>
      <MainApp />
    </UserContextProvider>
  );
}

function MainApp() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [setUserToken]);

  return (
    <RouterProvider router={router} />
  );
}



// import React, { useContext, useEffect } from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './Layouts/Router.jsx'; 
// import { UserContext } from './Context/UserContext.jsx';

// export default function App() {
//   const { setUserToken } = useContext(UserContext); // Destructure from UserContext

//   useEffect(() => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//       setUserToken(userToken); // Set token if available in local storage
//     }
//   }, [setUserToken]); // Include setUserToken in dependencies to avoid warnings

//   return (
//     <RouterProvider router={router} />
//   );
// }
