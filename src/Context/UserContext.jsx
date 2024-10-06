// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// export let UserContext = createContext(null);
// export default function UserContextProvider ({children}){
//     const [userToken,setUserToken] = useState(null);
//     let [userData,setUserData] = useState(null);
//     const[loading,setLoading] = useState(true);
//     // const getUserData = async ()=>{
//     //     if(userToken){
//     //         //const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
//     //         const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/user/profile`,
//     //         {headers:{Authorization:`Tariq__${userToken}`}}
//     //         )
//     //         setUserData(data.user);
//     //         setLoading(false);
//     //        // console.log(data);   
//     //     }
//     // }
    
//     // useEffect(()=>{
//     //     getUserData();
//     // },[userToken,userData]);
//     // useEffect(()=>{
//     //     // getUserData();
//     // },[userToken]);
//     useEffect(()=>{
        
//         if(localStorage.getItem('userToken')!=null){
//           setUserToken(localStorage.getItem('userToken'));
//         }

// },[userToken])

            
// return <UserContext.Provider value={{userToken,setUserToken/*,userData,setUserData,loading,getUserOrdersContext*/}}>
//     {children}
// </UserContext.Provider>
// }



import { createContext, useContext, useEffect, useState } from "react";

// Create the context
export let UserContext = createContext(null);

// Create the provider component
export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    let [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('userToken') != null) {
            setUserToken(localStorage.getItem('userToken'));
        }
    }, []);

    return (
        <UserContext.Provider value={{ userToken, setUserToken}}>
            {children}
        </UserContext.Provider>
    );
}





// import { createContext, useContext, useEffect, useState } from 'react';

// export let UserContext = createContext(null);

// export default function UserContextProvider({ children }) {
//     const [userToken, setUserToken] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // You can implement logic here, like checking if the user is logged in
//         const token = localStorage.getItem('userToken');
//         if (token) {
//             setUserToken(token);
//         }
//         setLoading(false);
//     }, [userToken]);

//     return (
//         <UserContext.Provider value={{ userToken, setUserToken }}>
//             {!loading && children}
//         </UserContext.Provider>
//     );
// }
