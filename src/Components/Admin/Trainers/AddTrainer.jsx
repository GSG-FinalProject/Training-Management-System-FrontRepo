import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { addTrainer } from '../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';


export default function AddTrainer() {
  const [trainings,setTrainings] = useState([]);
  let [selectedTraining,setSelectedTraining] = useState(null);
  let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);

  const initialValues={
        firstName: '',
        lastName:'',
        email: '',
        password:'',
        bio:'',
        trainingFieldId:'',
    };

  const fetchTrainings = async ()  => {
    try{
    const { data } = await axios.get(`https://localhost:7107/api/TrainingField`);
    console.log(data)
    setTrainings(data.data);
  }
    catch(error){
     console.log(error);
    }
  };
  useEffect(()=>{
    fetchTrainings();
  },[])
    

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
          const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('bio', values.bio);
    formData.append('trainingFieldId', selectedTraining);
            const { data } = await axios.post(
                `https://localhost:7107/api/Auth/register/trainer`,
                formData, // Sending the users object directly
                {
                  headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${userToken}`,
                },
                }
            );
            if(data.succeeded){
           formik.resetForm();
           toast.success(`Trainer Added Successfully`, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
                navigate('/dashboard/trainers')
         }
            
            
           }catch (error) {
            console.error('Error submitting form:', error);
            console.log('Error response:', error.response);
          }
        };

        const formik = useFormik({
            initialValues : initialValues,
            onSubmit,
            validationSchema:addTrainer
          })
          const inputs =[
            {
              type : 'text',
                id:'firstName',
                name:'firstName',
                title:'First Name',
                value:formik.values.firstName,
          },
          
            {
                type : 'text',
                id:'lastName',
                name:'lastName',
                title:'Last Name',
                value:formik.values.lastName,
            },
           
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
            {
              type : 'text',
              id:'bio',
              name:'bio',
              title:'Bio',
              value:formik.values.bio,
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
    
    
    <>
    <h2 className='ps-4 pt-4'>Add Trainer</h2>
    <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3">
        {renderInputs}
        <div className="col-md-6">
          <select
          className="form-select p-3"
          aria-label="Default select example"
          value={selectedTraining}
          
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedTraining(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Training Field
          </option>
          {trainings.map((training) => (
            <option key={training.id} value={training.id}>{training.name}</option>
          ))}
        </select>
        </div>
        
        <button className='w-auto btn btn-outline-primary'  type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 || !selectedTraining}>Add</button>
    </form>
    </>
    
  )
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import Input from '../../Shared/Input/Input';
// import { addTrainer } from '../../../Validation/validation';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function AddTrainer() {
//   const [trainings, setTrainings] = useState([]);

//   const fetchTrainings = async () => {
//     try {
//       const { data } = await axios.get(`https://localhost:7107/api/TrainingField`);
//       console.log(data);
//       setTrainings(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchTrainings();
//   }, []);

//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     trainingFieldId: '', // Add trainingFieldId to initial form values
//   };

//   const navigate = useNavigate();

//   const onSubmit = async (users) => {
//     try {
//       const { data } = await axios.post(
//         `https://localhost:7105/api/Auth/register/trainer`,
//         users, // Sending the users object directly
//         {
//           headers: {
//             'Content-Type': 'application/json', // Set the content type
//           },
//         }
//       );
//       if (data.succeeded) {
//         formik.resetForm();
//         toast.success(`Trainer Added Successfully`, {
//           position: 'top-right',
//           autoClose: true,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'dark',
//         });
//         navigate('/dashboard/trainers');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       console.log('Error response:', error.response);
//     }
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     onSubmit,
//     validationSchema: addTrainer,
//   });

//   const inputs = [
//     {
//       type: 'text',
//       id: 'firstName',
//       name: 'firstName',
//       title: 'First Name',
//       value: formik.values.firstName,
//     },
//     {
//       type: 'text',
//       id: 'lastName',
//       name: 'lastName',
//       title: 'Last Name',
//       value: formik.values.lastName,
//     },
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
//     <>
//       <h2 className="ps-4 pt-4">Add Trainer</h2>
//       <form
//         onSubmit={formik.handleSubmit}
//         className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3"
//       >
//         {renderInputs}
//         <select
//           className="form-select p-3"
//           aria-label="Default select example"
//           name="trainingFieldId" // Link this to formik
//           value={formik.values.trainingFieldId}
//           onChange={formik.handleChange} // Formik will now manage this value
//           onBlur={formik.handleBlur}
//         >
//           <option value="" disabled>
//             Select Training Field
//           </option>
//           {trainings.map((training) => (
//             <option key={training.id} value={training.id}>
//               {training.name}
//             </option>
//           ))}
//         </select>
//         <button
//           className="w-auto btn btn-outline-primary"
//           type="submit"
//           disabled={
//             formik.isSubmitting ||
//             Object.keys(formik.errors).length > 0 ||
//             Object.keys(formik.touched).length === 0 ||
//             !formik.values.trainingFieldId
//           }
//         >
//           Add
//         </button>
//       </form>
//     </>
//   );
// }
