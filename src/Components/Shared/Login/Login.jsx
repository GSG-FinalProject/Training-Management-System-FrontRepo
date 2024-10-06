import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import { useFormik } from 'formik';
import { loginScheme } from '../../../Validation/validation';
import Input from '../Input/Input';
import './login.css'
import axios from 'axios';

export default function Login() {

    const initialValues={
        email: '',
        password: '',
    };
    const navigate = useNavigate();
    let {userToken,setUserToken} = useContext(UserContext);
    
    const [user,setUser] = useState({});
    // const[userToken,setUserToken] = useState('');
    useEffect(() => {
    if(userToken){
      if(user.userType == 0){
        navigate('/dashboard')
      }
      else if(user.userType == 1){
        navigate('/classRoom')
      }
      else if(user.userType == 2){
        navigate('/')
      }
  }},[userToken,user,navigate])
    const onSubmit=async users=>{
        const {data} = await axios.post('https://localhost:7107/api/Auth/login',users);
        if(data.succeeded){
          setUser(data.data)
            localStorage.setItem('userToken' , data.data.token);
            setUserToken(data.data.token);
            if(data.data.userType == 0){
              navigate('/dashboard')
            }
            else if(data.data.userType == 1){
              navigate('/classRoom')
            }
            else if(data.data.userType == 2){
              navigate('/')
            }
            
            console.log('jjjjjjjjjjj',data)
        }
        //console.log(data); 
    }
    
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
        validationSchema:loginScheme
    })
    const inputs =[
        {
            type : 'email',
            id:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,
        },
        {
            type : 'password',
            id:'password',
            name:'password',
            title:'User Password',
            value:formik.values.password,
        },
    ]
    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
         name={input.name}
          title={input.title} 
          key={index} 
          errors={formik.errors} 
          onChange={formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            />
    )
  return (
    <section className="h-100 p-4" style={{backgroundColor: '#eee'}} >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 head">Sign in</p>
                <form className="d-flex flex-column justify-content-center align-items-center" id="registrationForm" onSubmit={formik.handleSubmit}>
                  
                  {/* <div className="mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0"> */}
                      {/* <label className="form-label" htmlFor="email">Your Email</label>
                      <input type="email" id="email" name="email" className="form-control" oninput="validateEmail()" /> */}
                      {renderInputs}
                      {/* <div className="error" id="emailError" />
                    </div>
                  </div> */}
                  {/* <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control" name="password" oninput="validatePassword()" />
                      <div className="error" id="passwordError" />
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="loginBtn btn  btn-lg">Login</button>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
<iframe src="https://lottie.host/embed/c35aeee0-43de-4224-a14e-a5c2dbc46c5f/OTS2D9dxhX.json" width='500px' height='500px' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../../Context/UserContext';
// import { useFormik } from 'formik';
// import { loginScheme } from '../../../Validation/validation';
// import Input from '../Input/Input';
// import './login.css';
// import axios from 'axios';

// export default function Login() {
//   const initialValues = {
//     email: '',
//     password: '',
//   };
  
//   const navigate = useNavigate();
//   const userContext = useContext(UserContext);

//   // Check if the context is available
//   if (!userContext) {
//     return <p>Loading...</p>;
//   }

//   let { userToken, setUserToken } = userContext;

//   if (userToken) {
//     navigate(-1); // Redirect if user is already logged in
//   }

//   const onSubmit = async (users) => {
//     const { data } = await axios.post('https://localhost:7107/api/Auth/login', users);
//     if (data.succeeded) {
//       localStorage.setItem('userToken', data.data.token);
//       setUserToken(data.data.token);

//       if (data.data.userType === 0) {
//         navigate('/dashboard');
//       } else if (data.data.userType === 1) {
//         navigate('/classRoom');
//       } else if (data.data.userType === 2) {
//         navigate('/');
//       }
//     }
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     onSubmit,
//     validationSchema: loginScheme,
//   });

//   const inputs = [
//     {
//       type: 'email',
//       id: 'email',
//       name: 'email',
//       title: 'User Email',
//       value: formik.values.email,
//     },
//     {
//       type: 'password',
//       id: 'password',
//       name: 'password',
//       title: 'User Password',
//       value: formik.values.password,
//     },
//   ];

//   const renderInputs = inputs.map((input, index) => (
//     <Input
//       type={input.type}
//       id={input.id}
//       name={input.name}
//       title={input.title}
//       key={index}
//       errors={formik.errors}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       touched={formik.touched}
//     />
//   ));

//   return (
//     <section className="h-100 p-4" style={{ backgroundColor: '#eee' }}>
//       <div className="container h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-lg-12 col-xl-11">
//             <div className="card text-black" style={{ borderRadius: 25 }}>
//               <div className="card-body p-md-5">
//                 <div className="row justify-content-center">
//                   <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
//                     <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 head">Sign in</p>
//                     <form
//                       className="row justify-content-center align-items-center"
//                       id="registrationForm"
//                       onSubmit={formik.handleSubmit}
//                     >
//                       {renderInputs}
//                       <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                         <button type="submit" className="loginBtn btn btn-lg">Login</button>
//                       </div>
//                     </form>
//                   </div>
//                   <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
//                     <iframe
//                       src="https://lottie.host/embed/c35aeee0-43de-4224-a14e-a5c2dbc46c5f/OTS2D9dxhX.json"
//                       width="500px"
//                       height="500px"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
