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

// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3


// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// // Create the context
// export let UserContext = createContext(null);

// // Create the provider component
// export default function UserContextProvider({ children }) {
//     const [userToken, setUserToken] = useState(null);
//     const [userId,setUserId] = useState(null)
//     const[userData,setUserData]=useState({});

//     const getUserID= async() =>{
//         if(userToken){
//             const {data} = await axios.get(`https://localhost:7107/api/Users/get-user-id-from-token`,
//             {headers :{'Authorization':`Bearer ${userToken}`}})
//             if(data!=null){
//             setUserId(data.data);
//             console.log(userId);
//             } 
//         }
//     }

//     const getUserInfo= async() =>{
//         if(userId){ 

//             const {data} = await axios.get(`https://localhost:7107/api/Users/${userId}`,
//             // {headers :{Authorization:`Bearer ${userToken}`}}
//             )
//             setUserData(data.data);
//           }}


//     useEffect(() => {
//         if (localStorage.getItem('userToken') != null) {
//             setUserToken(localStorage.getItem('userToken'));
//         }
//         getUserID();
//         getUserInfo();
//     }, []);

//     return (
//         <UserContext.Provider value={{ userToken, setUserToken,userId , setUserId,userData,setUserData}}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3
// #############################################################################################################3

import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context
export let UserContext = createContext(null);

// Create the provider component
export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});

    // Fetch user ID from token
    const getUserID = async () => {
        if (userToken) {
            try {
                const { data } = await axios.get(`https://localhost:7107/api/Users/get-user-id-from-token`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                if (data && data.data) {
                    setUserId(data.data);  // Set user ID
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        }
    };

    // Fetch user info from user ID
    const getUserInfo = async () => {
        if (userId) {
            try {
                const { data } = await axios.get(`https://localhost:7107/api/Users/${userId}`);
                if (data && data.data) {
                    setUserData(data.data);  // Set user data
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    // UseEffect to check token in local storage
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);  // Set user token from local storage
        }
    }, []);  // Empty dependency array ensures this runs once when the component mounts

    // UseEffect to fetch user ID when token is available
    useEffect(() => {
        if (userToken) {
            getUserID();  // Fetch user ID when token is set
        }
    }, [userToken]);  // Depend on userToken

    // UseEffect to fetch user data when userId is available
    useEffect(() => {
        if (userId) {
            getUserInfo();  // Fetch user info when userId is set
        }
    }, [userId]);  // Depend on userId

    return (
        <UserContext.Provider value={{ userToken, setUserToken, userId, setUserId, userData, setUserData }}>
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
