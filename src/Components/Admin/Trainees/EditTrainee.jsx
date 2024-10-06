
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTrainee } from '../../../Validation/validation';

export default function EditTrainee() {
  const { id } = useParams();  
  const [trainee, setTrainee] = useState(null);  
  const navigate = useNavigate();

  const fetchTrainee = async () => {
    try {
      const response = await axios.get(`https://localhost:7107/api/Trainee/${id}`);
      console.log('Fetched Trainee:', response.data.data); 
      setTrainee(response.data.data);  
    } catch (error) {
      console.error('Error fetching trainee:', error);
    }
  };

  useEffect(() => {
    fetchTrainee();  
  }, [id]); // Adding `id` as a dependency to refetch if it changes

  const onSubmit = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:7105/api/Trainee/${id}`,
        {
          id: updatedData.id,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          email: updatedData.email,
          trainingProgram: updatedData.trainingProgram,
          trainingHours: updatedData.trainingHours,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log('kdscjnkjed',response.status)
      if (response.status == 204) {
        // console.log('jkjjnjjjjj')
        navigate('/dashboard/trainees'); 
      }
    } catch (error) {
      console.error('Error updating trainee:', error);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',  // Initialize ID
      firstName: '',  // Initialize firstName
      lastName: '',  // Initialize lastName
      email: '',  // Initialize email
      trainingProgram: '',
      trainingHours: '',
    },
    validationSchema: editTrainee,
    onSubmit,
    enableReinitialize: true, 
  });

  useEffect(() => {
    if (trainee) {
      console.log('Setting Formik values:', trainee); 
      formik.setValues({
        id: trainee.id || '',
        firstName: trainee.firstName || '',
        lastName: trainee.lastName || '',
        email: trainee.email || '',
        trainingProgram: trainee.trainingProgram||'',
        trainingHours: trainee.trainingHours||'',
      });
    }
  }, [trainee, id]);  

  
  if (!trainee) {
    return <div>Loading...</div>;  // Display loading message
  }

  return (
    <>
      <h2 className='ps-4 pt-4'>Edit Trainee Account "{trainee.firstName} {trainee.lastName}"</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5">
        <div className="form-item col-md-6 ">
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

        <div className="form-item col-md-6 ">
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

<div className="form-item col-md-6 pt-2">
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

<div className="form-item col-md-6 pt-2">
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

<div className="form-item col-md-6 pt-2">
  <label className="form-label ps-2" htmlFor="trainingProgram">Training Program</label>
  <input
    type="text"
    className={`form-control ${formik.touched.trainingProgram && formik.errors.trainingProgram ? 'is-invalid' : ''}`}
    id="trainingProgram"
    name="trainingProgram"
    value={formik.values.trainingProgram}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.trainingProgram && formik.errors.trainingProgram ? (
    <div className="text-danger">{formik.errors.trainingProgram}</div>  // Display the error in red
  ) : null}
</div>

<div className="form-item col-md-6 pt-2">
  <label className="form-label ps-2" htmlFor="trainingHours">Training Hours</label>
  <input
    type="number"
    className={`form-control ${formik.touched.trainingHours && formik.errors.trainingHours ? 'is-invalid' : ''}`}
    id="trainingHours"
    name="trainingHours"
    value={formik.values.trainingHours}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.trainingHours && formik.errors.trainingHours ? (
    <div className="text-danger">{formik.errors.trainingHours}</div>  // Display the error in red
  ) : null}
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
