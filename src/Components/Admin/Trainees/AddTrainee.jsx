// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { useFormik } from 'formik';
// import Input from '../../Shared/Input/Input';
// import { addTrainee } from '../../../Validation/validation';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


// export default function AddTrainee() {
//   const [trainers,setTrainers] = useState([]);
//   let [selectedTrainer,setSelectedTrainer] = useState(null);
  
//   const initialValues={
//         firstName: '',
//         lastName:'',
//         email: '',
//         password:'',
//         trainerId:'',
//     };

//   const fetchTrainer = async ()  => {
//     try{
//     const { data } = await axios.get(`https://localhost:7107/api/Trainer`);
//     console.log(data)
//     setTrainers(data.data);
//   }
//     catch(error){
//      console.log(error);
//     }
//   };
//   useEffect(()=>{
//     fetchTrainer();
//   },[])
    

//     const navigate = useNavigate();

//     const onSubmit = async (values) => {
//         try {
//           const formData = new FormData();
//     formData.append('firstName', values.firstName);
//     formData.append('lastName', values.lastName);
//     formData.append('email', values.email);
//     formData.append('password', values.password);
//     formData.append('trainerId', selectedTrainer);
//             const { data } = await axios.post(
//                 `https://localhost:7107/api/Auth/register/trainee`,
//                 formData, // Sending the users object directly
//                 {
//                     headers: {
//                         'Content-Type': 'application/json', // Set the content type
//                     },
//                 }
//             );
//             console.log('hvhgcgchgcgcyhg')

//             if(data.succeeded){
//            formik.resetForm();
//            toast.success(`Trainer Added Successfully`, {
//             position: "top-right",
//             autoClose: true,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//             });
//                 navigate('/dashboard/trainees')
//          }
            
            
//            }catch (error) {
//             console.error('Error submitting form:', error);
//             console.log('Error response:', error.response);
//           }
//         };

//         const formik = useFormik({
//             initialValues : initialValues,
//             onSubmit,
//             validationSchema:addTrainee
//           })
//           const inputs =[
//             {
//               type : 'text',
//                 id:'firstName',
//                 name:'firstName',
//                 title:'First Name',
//                 value:formik.values.firstName,
//           },
          
//             {
//                 type : 'text',
//                 id:'lastName',
//                 name:'lastName',
//                 title:'Last Name',
//                 value:formik.values.lastName,
//             },
           
//               {
//                   type : 'email',
//                   id:'email',
//                   name:'email',
//                   title:'User Email',
//                   value:formik.values.email,
//               },
              
//             {
//                 type : 'password',
//                 id:'password',
//                 name:'password',
//                 title:'User Password',
//                 value:formik.values.password,
//             },
            
//           ]
          
          
          
          
          
//           const renderInputs = inputs.map((input,index)=>
//             <Input type={input.type} 
//                   id={input.id}
//                    name={input.name}
//                     title={input.title} 
//                     key={index} 
//                     errors={formik.errors} 
//                     onChange={formik.handleChange}
//                      onBlur={formik.handleBlur}
//                       touched={formik.touched}
//                       />
                  
//               )
//   return (
    
    
//     <>
//     <h2 className='ps-4 pt-4'>Add Trainee</h2>
//     <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3">
//         {renderInputs}
//         <div className="col-md-6">
//           <select
//           className="form-select p-3"
//           aria-label="Default select example"
//           value={selectedTrainer}
          
//           onChange={(e) => {
//             formik.handleChange(e);
//             setSelectedTrainer(e.target.value);
//           }}
//         >
//           <option value="" disabled>
//             Select Trainer
//           </option>
//           {trainers.map((trainer) => (
//             <option key={trainer.id} value={trainer.id}>{trainer.firstName} {trainer.lastName}</option>
//           ))}
//         </select>
//         </div>
//         <div className="row justify-content-center align-items-center">
//     <button
//           className='w-auto btn btn-outline-primary mt-4'
//           type="submit"
//           disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
//         >
//           Add
//         </button>
// </div>
//         {/* <button className='w-auto btn btn-outline-primary'  type="submit"
//               disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 }>Add</button> */}
//     </form>
//     </>
    
//   )
// }


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { addTrainee } from '../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';

export default function AddTrainee() {
  const [trainers, setTrainers] = useState([]);
  let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);


  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    trainerId: '',  // Ensure trainerId is in formik initialValues
  };

  const fetchTrainer = async () => {
    try {
      const { data } = await axios.get(`https://localhost:7107/api/Trainer`);
      setTrainers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        trainerId: values.trainerId,  // Using formik's trainerId value
      };

      const { data } = await axios.post(
        `https://localhost:7107/api/Auth/register/trainee`,
        formData,  // Sending form values directly as JSON
        {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${userToken}`,
        },
        }
      );

      if (data.succeeded) {
        formik.resetForm();
        toast.success(`Trainee Added Successfully`, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/dashboard/trainees');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addTrainee,
  });

  const inputs = [
    {
      type: 'text',
      id: 'firstName',
      name: 'firstName',
      title: 'First Name',
      value: formik.values.firstName,
    },
    {
      type: 'text',
      id: 'lastName',
      name: 'lastName',
      title: 'Last Name',
      value: formik.values.lastName,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email,
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      title: 'User Password',
      value: formik.values.password,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  return (
    <>
      <h2 className="ps-4 pt-4">Add Trainee</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3">
        {renderInputs}
        <div className="col-md-6">
          <select
            className="form-select p-3"
            name="trainerId"  // Ensure formik handles trainerId
            value={formik.values.trainerId}  // Bind to formik's trainerId value
            onChange={formik.handleChange}  // Formik change handler
            onBlur={formik.handleBlur}  // Formik blur handler
          >
            <option value="" disabled>
              Select Trainer
            </option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.firstName} {trainer.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="row justify-content-center align-items-center">
          <button
            className="w-auto btn btn-outline-primary mt-4"
            type="submit"
            disabled={
              formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0
            }
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
