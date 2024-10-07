// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import Input from '../../Shared/Input/Input';
// import { addTrainer, editTrainer } from '../../../Validation/validation';

// export default function EditTrainer() {
//     const {id} = useParams('id');
//     let [trainer,setTrainer] = useState({})
//     const fetchTrainer = async ()  => {
//         try{
//         const { data } = await axios.get(`https://localhost:7105/api/Trainer/${id}`);
//         console.log(data.data)
//         setTrainer(data.data);
//       }
//         catch(error){
//          console.log(error);
//         }
//       };
//       useEffect(() => {
//         fetchTrainer();
//       }, []);
//       const navigate = useNavigate();
//       const onSubmit = async (updatedData) => {
//         try {
//           const { data } = await axios.put(`https://localhost:7105/api/Trainer/${id}`, {
//             firstName: updatedData.firstName, // Ensure this matches your `initialValues` key
//             lastName: updatedData.lastName,
//             email: updatedData.email,
//           }, {
//             headers: {
//               'Content-Type': 'application/json', // Ensure that the content type is JSON
//             }
//           });
      
//           if (data.succeeded) {
//             navigate('/dashboard/trainers');
//           }
//         } catch (error) {
//           console.error('Error updating trainer:', error);
//         }
//       };
      
//       const formik = useFormik({
//         initialValues: {
//           id:trainer.id,
//           firstName: trainer.firstName || '',
//           lastName: trainer.lastName || '',
//           email: trainer.email || '',
//         },
//         validationSchema: editTrainer,  // Use the correct schema
//         onSubmit,
//       });

//       const inputs =[
//         {
//             type : 'text',
//               id:'id',
//               name:'id',
//               title:'ID',
//               value:formik.values.id,
//               disabled: true, 
//         },
//         {
//           type : 'text',
//             id:'firstName',
//             name:'firstName',
//             title:'First Name',
//             value:formik.values.firstName,
//       },
      
//         {
//             type : 'text',
//             id:'lastName',
//             name:'lastName',
//             title:'Last Name',
//             value:formik.values.lastName,
//         },
       
//           {
//               type : 'email',
//               id:'email',
//               name:'email',
//               title:'User Email',
//               value:formik.values.email,
//           },
        
//       ]

//       const renderInputs = inputs.map((input,index)=>
//   <Input type={input.type} 
//         id={input.id}
        
//          name={input.name}
//           title={input.title} 
//           value={input.value || ''}
//           key={index} 
//           errors={formik.errors} 
//           onChange={formik.handleChange}
//            onBlur={formik.handleBlur}
//             touched={formik.touched}
//             disabled={input.disabled || false}
//             />
        
//     )
//   return (
//     <>
//     <h2 className='ps-4 pt-4'>Edit Trainer Account " {trainer.firstName} {trainer.lastName}"</h2>
//     <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3">
//         {renderInputs}
//         <button className='w-auto btn btn-outline-warning'  type="submit"
//               disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 }>Edit</button>
//     </form>
//     </>
//   )
// }
// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Input from '../../Shared/Input/Input';
// import { editTrainer } from '../../../Validation/validation';

// export default function EditTrainer() {
//   const { id } = useParams();  // Get the trainer ID from the URL parameters
//   const [trainer, setTrainer] = useState(null);  // Initialize trainer state to null
//   const navigate = useNavigate();

//   // Fetch trainer data from the API
//   const fetchTrainer = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7105/api/Trainer/${id}`);
//       console.log('Fetched Trainer:', response.data.data); // Log the trainer data
//       setTrainer(response.data.data);  // Set trainer data to state
//     } catch (error) {
//       console.error('Error fetching trainer:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTrainer();  // Fetch trainer data when component mounts
//   }, []); // Adding `id` as a dependency to refetch if it changes

//   const onSubmit = async (updatedData) => {
//     try {
//       const response = await axios.put(
//         `https://localhost:7105/api/Trainer/${id}`,
//         {
//             id: updatedData.id,
//           firstName: updatedData.firstName,
//           lastName: updatedData.lastName,
//           email: updatedData.email,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.succeeded) {
//         navigate('/dashboard/trainers');  // Navigate to trainers list on success
//       }
//     } catch (error) {
//       console.error('Error updating trainer:', error);
//     }
//   };

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       id: id,  // Initialize ID
//       firstName: '',  // Initialize firstName
//       lastName: '',  // Initialize lastName
//       email: '',  // Initialize email
//     },
//     validationSchema: editTrainer,
//     onSubmit,
//     enableReinitialize: true,  // Allow form to reinitialize when trainer data changes
//   });

//   // Update Formik values when trainer data is fetched
//   useEffect(() => {
//     if (trainer) {
//       console.log('Setting Formik values:', trainer); // Log the trainer data being set
//       formik.setValues({
//         id: id || '',
//         firstName: trainer.firstName || '',
//         lastName: trainer.lastName || '',
//         email: trainer.email || '',
//       });
//     }
//   }, [trainer]);  // Run this effect whenever trainer data changes

//   // const inputs = [
//   //   {
//   //     type: 'text',
//   //     id: 'id',
//   //     name: 'id',
//   //     title: 'ID',
//   //     value:formik.values.id
//   //   //   disabled: true,  // Disable the ID input
//   //   },
//   //   {
//   //     type: 'text',
//   //     id: 'firstName',
//   //     name: 'firstName',
//   //     title: 'First Name',
//   //   },
//   //   {
//   //     type: 'text',
//   //     id: 'lastName',
//   //     name: 'lastName',
//   //     title: 'Last Name',
//   //   },
//   //   {
//   //     type: 'email',
//   //     id: 'email',
//   //     name: 'email',
//   //     title: 'User Email',
//   //   },
//   // ];

//   // const renderInputs = inputs.map((input, index) => (
//   //   <Input
//   //     type={input.type}
//   //     id={input.id}
//   //     name={input.name}
//   //     title={input.title}
//   //     value={formik.values[input.name]} // Use Formik values
//   //     key={index}
//   //     errors={formik.errors}
//   //     onChange={formik.handleChange}
//   //     onBlur={formik.handleBlur}
//   //     touched={formik.touched}
//   //     disabled={input.disabled || false}
//   //   />
//   // ));

//   // Show loading state until the trainer data is fetched
//   if (!trainer) {
//     return <div>Loading...</div>;  // Display loading message
//   }

//   return (
//     <>
//       <h2 className='ps-4 pt-4'>Edit Trainer Account "{trainer.firstName} {trainer.lastName}"</h2>
//       <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5">
//         {/* {renderInputs} */}
//         {/* *************************************************************************/}
//         {/* <label for="firstName" className="form-label">
//             First Name
//           </label>
//         <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             name="firstName"
//             value={trainer.firstName}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched}
//           /> */}
//           {/* *********************************************************************************** */}
//           {/* <form className="form-floating"> */}
//   {/* <input type="text"
//             className="form-control"
//             id="firstName"
//             name="firstName"
//             value={trainer.firstName}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
//   <label htmlFor="firstName">First Name</label>

//   <input type="text"
//             className="form-control"
//             id="lastName"
//             name="lastName"
//             value={trainer.lastName}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
//   <label htmlFor="lastName">Last Name</label> */}
//   {/* *********************************************************************************************888 */}
// {/* </form> */}
// <div className="form-item col-md-6">
//   <label className="form-label ps-2" htmlFor="id">ID</label>
//                       <input type="text"
//             className="form-control mb-4"
//             id="id"
//             name="id"
//             value={trainer.id}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
// </div>
// <div className="form-item col-md-6">
//   <label className="form-label ps-2" htmlFor="firstName">firstName</label>
//                       <input type="text"
//             className="form-control mb-4"
//             id="firstName"
//             name="firstName"
//             value={trainer.firstName}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
// </div>
// <div className="form-item col-md-6">
//   <label className="form-label ps-2" htmlFor="lastName">lastName</label>
//                       <input type="text"
//             className="form-control mb-4"
//             id="lastName"
//             name="lastName"
//             value={trainer.lastName}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
// </div>
// <div className="form-item col-md-6">
//   <label className="form-label ps-2" htmlFor="email">email</label>
//                       <input type="email"
//             className="form-control mb-4"
//             id="email"
//             name="email"
//             value={trainer.email}
//             onChange={formik.handleChange}
//                   errors={formik.errors}
//       onBlur={formik.handleBlur}
//       touched={formik.touched} />
// </div>



//         <button
//           className='w-auto btn btn-outline-warning'
//           type="submit"
//           disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
//         >
//           Edit
//         </button>
//       </form>
//     </>
//   );
// }

// ********************************************************************************************************88
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loading from '../../Shared/Loading/Loading';
// import Input from '../../Shared/Input/Input';
// import { editTrainer } from '../../../Validation/validation';

// export default function EditTrainer() {
//   let [loader, setLoader] = useState(false);
//   let [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: ""
//   });
//   let [touched, setTouched] = useState({
//     firstName: false,
//     lastName: false,
//     email: false
//   });
//   const { id } = useParams('id');

//   const [user, setUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//   });

//   const [errorBack, setErrorBack] = useState('');
//   const navigate = useNavigate();

//   const getTrainer = async () => {
//     try {
//       const { data } = await axios.get(`https://localhost:7105/api/Trainer/${id}`);
//       console.log("API Response:", data); // Log the response data
//       if (data && data.data) {
//         setUser(data.data); // Populate user state with fetched data
//         console.log("User State Set:", data.data); // Log the new user state
//       }
//     } catch (error) {
//       console.error("Error fetching trainer data:", error);
//     }
//   };

//   useEffect(() => {
//     getTrainer();
//   }, []);

//   const changeData = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({ ...touched, [name]: true });
//   };

//   const sendData = async (e) => {
//     e.preventDefault();
//     setLoader(true);
//     if (Object.keys(editTrainer(user)).length > 0) {
//       setErrors(editTrainer(user));
//       setLoader(false);
//     } else {
//       try {
//         const { data } = await axios.put(`https://localhost:7105/api/Trainer/${id}`, user);
//         if (data.message === 'success') {
//           toast.success('USER updated SUCCESSFULLY');
//           navigate('/dashboard/trainers');
//         }
//       } catch (error) {
//         setErrorBack(error.response?.data?.message || "Error updating trainer");
//         setErrors({});
//       } finally {
//         setLoader(false);
//       }
//     }
//   };

//   if (loader) {
//     return <Loading />;
//   }

//   console.log("Current User State:", user); // Check if the state is updating

//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         {/* Sidebar and other layout code */}
//         <div className="col py-3">
//           {errorBack && <p className='text text-danger'>{errorBack}</p>}
//           <form onSubmit={sendData}>
//             <Input
//               errors={errors}
//               id={'firstName'}
//               value={user.firstName} // Bind input value to user.firstName
//               title={'User firstName'}
//               type={'text'}
//               name={'firstName'}
//               onChange={changeData}
//               onBlur={handleBlur}
//               touched={touched}
//             />
//             <Input
//               errors={errors}
//               id={'email'}
//               value={user.email} // Bind input value to user.email
//               title={'User Email'}
//               type={'email'}
//               name={'email'}
//               onChange={changeData}
//               onBlur={handleBlur}
//               touched={touched}
//             />
//             <Input
//               errors={errors}
//               id={'lastName'}
//               value={user.lastName} // Bind input value to user.lastName
//               title={'User lastName'}
//               type={'text'}
//               name={'lastName'}
//               onChange={changeData}
//               onBlur={handleBlur}
//               touched={touched}
//             />
//             <div className="mb-3">
//               <input type='submit' className='form-control' value='UPDATE' />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import EditComponent from './EditComponent';

// export default function EditTrainer() {
//         const {id} = useParams('id');
//     let [trainer,setTrainer] = useState({})
//     const fetchTrainer = async ()  => {
//         try{
//         const { data } = await axios.get(`https://localhost:7105/api/Trainer/${id}`);
//         console.log(data.data)
//         setTrainer(data.data);
//       }
//         catch(error){
//          console.log(error);
//         }
//       };
//       useEffect(() => {
//         fetchTrainer();
//       }, []);

//   return (
//     <>
//     <EditComponent id = {trainer.id} firstName = {trainer.firstName} lastName = {trainer.lastName} email={trainer.email} />
//     </>
//   )
// }

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Shared/Input/Input';
import { editTrainer } from '../../../Validation/validation';

export default function EditTrainer() {
  const { id } = useParams();  // Get the trainer ID from the URL parameters
  const [trainer, setTrainer] = useState(null);  // Initialize trainer state to null
  const navigate = useNavigate();
  const [trainings,setTrainings] = useState([]);
  let [selectedTraining,setSelectedTraining] = useState('');
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

  // Fetch trainer data from the API
  const fetchTrainer = async () => {
    try {
      const response = await axios.get(`https://localhost:7107/api/Trainer/${id}`);
      console.log('Fetched Trainer:', response.data.data); // Log the trainer data
      setTrainer(response.data.data);  // Set trainer data to state
    } catch (error) {
      console.error('Error fetching trainer:', error);
    }
  };

  useEffect(() => {
    fetchTrainer();  // Fetch trainer data when component mounts
  }, [id]); // Adding `id` as a dependency to refetch if it changes

  const onSubmit = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:7107/api/Trainer/${id}`,
        {
          id: updatedData.id,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          email: updatedData.email,
          bio:updatedData.bio,
          trainingFieldId:selectedTraining,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.succeeded) {
        // console.log(response)
        navigate('/dashboard/trainers'); 
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',  // Initialize ID
      firstName: '',  // Initialize firstName
      lastName: '',  // Initialize lastName
      email: '',  // Initialize email
      bio:'',
      trainingFieldId:'',
    },
    validationSchema: editTrainer,
    onSubmit,
    enableReinitialize: true,  // Allow form to reinitialize when trainer data changes
  });

  // Update Formik values when trainer data is fetched
  useEffect(() => {
    if (trainer) {
      console.log('Setting Formik values:', trainer); // Log the trainer data being set
      formik.setValues({
        id: trainer.id || '',
        firstName: trainer.firstName || '',
        lastName: trainer.lastName || '',
        email: trainer.email || '',
        bio: trainer.bio||'',
        trainingFieldId: trainer.trainingFieldId||'',
      });
    }
  }, [trainer, id]);  // Run this effect whenever trainer data or id changes

  // Show loading state until the trainer data is fetched
  if (!trainer) {
    return <div>Loading...</div>;  // Display loading message
  }

  return (
    <>
      <h2 className='ps-4 pt-4'>Edit Trainer Account "{trainer.firstName} {trainer.lastName}"</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5">
        <div className="form-item col-md-6">
          <label className="form-label ps-2" htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control mb-4"
            id="id"
            name="id"
            value={formik.values.id}  // Bind to Formik values
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors}
            disabled
          />
        </div>

        <div className="form-item col-md-6">
  <label className="form-label ps-2" htmlFor="firstName">First Name</label>
  <input
    type="text"
    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
    id="firstName"
    name="firstName"
    value={formik.values.firstName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.firstName && formik.errors.firstName ? (
    <div className="text-danger">{formik.errors.firstName}</div>  // Display the error in red
  ) : null}
</div>

<div className="form-item col-md-6">
  <label className="form-label ps-2" htmlFor="lastName">Last Name</label>
  <input
    type="text"
    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
    id="lastName"
    name="lastName"
    value={formik.values.lastName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.lastName && formik.errors.lastName ? (
    <div className="text-danger">{formik.errors.lastName}</div>  // Display the error in red
  ) : null}
</div>

<div className="form-item col-md-6">
  <label className="form-label ps-2" htmlFor="email">Email</label>
  <input
    type="email"
    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
    id="email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.email && formik.errors.email ? (
    <div className="text-danger">{formik.errors.email}</div>  // Display the error in red
  ) : null}
</div>

<div className="form-item col-md-6 pt-3">
  <label className="form-label ps-2" htmlFor="Bio">Bio</label>
  <input
    type="text"
    className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`}
    id="bio"
    name="bio"
    value={formik.values.bio}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.bio && formik.errors.bio ? (
    <div className="text-danger">{formik.errors.bio}</div>  // Display the error in red
  ) : null}
</div>
{/* <div className="form-item col-md-6 pt-3">
  <label className="form-label ps-2" htmlFor="trainingFieldId">Training FieldId</label>
  <input
    type="number"
    className={`form-control ${formik.touched.trainingFieldId && formik.errors.trainingFieldId ? 'is-invalid' : ''}`}
    id="trainingFieldId"
    name="trainingFieldId"
    value={formik.values.trainingFieldId}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.trainingFieldId && formik.errors.trainingFieldId ? (
    <div className="text-danger">{formik.errors.trainingFieldId}</div>  // Display the error in red
  ) : null}
</div> */}
<div className="col-md-6 pt-5">
          <select
          className="form-select"
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
        


        <button
          className='w-auto btn btn-outline-warning mt-4'
          type="submit"
          disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
        >
          Edit
        </button>
      </form>
    </>
  );
}
