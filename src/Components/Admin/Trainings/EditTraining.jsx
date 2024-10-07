
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Shared/Input/Input';
import { editTrainer, editTraining } from '../../../Validation/validation';
import { UserContext } from '../../../Context/UserContext';

export default function EditTraining() {
    let {userToken,setUserToken} = useContext(UserContext);

  const { id } = useParams();  // Get the trainer ID from the URL parameters
  const [training, setTraining] = useState(null);  // Initialize trainer state to null
  const navigate = useNavigate();

  const fetchTraining = async () => {
    try {
      const response = await axios.get(`https://localhost:7107/api/TrainingField/${id}`);
      console.log('Fetched Trainer:', response.data.data); 
      setTraining(response.data.data);  
    } catch (error) {
      console.error('Error fetching trainer:', error);
    }
  };

  useEffect(() => {
    fetchTraining();  
  }, [id]); 

  const onSubmit = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:7107/api/TrainingField/${id}`,
        {
          id: updatedData.id,
          name: updatedData.name,
          description: updatedData.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );

      if (response.status == 204) {
        // console.log('jkjjnjjjjj')
        navigate('/dashboard/trainings'); 
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',  
      name: '',
      description: '', 
    },
    validationSchema: editTraining,
    onSubmit,
    enableReinitialize: true,  // Allow form to reinitialize when trainer data changes
  });

  // Update Formik values when trainer data is fetched
  useEffect(() => {
    if (training) {
      console.log('Setting Formik values:', training); // Log the trainer data being set
      formik.setValues({
        id: training.id || '',
        name: training.name || '',
        description: training.description || '',
      });
    }
  }, [training, id]);  // Run this effect whenever trainer data or id changes

  // Show loading state until the trainer data is fetched
  if (!training) {
    return <div>Loading...</div>;  // Display loading message
  }

  return (
    <>
      <h2 className='ps-4 pt-4'>Edit Training Account "{training.name}"</h2>
      <form onSubmit={formik.handleSubmit} className=" ps-4 pt-5">
        <div className="row justify-content-center align-items-center w-75">
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
  <label className="form-label ps-2" htmlFor="name">Training Name</label>
  <input
    type="text"
    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
    id="name"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.name && formik.errors.name ? (
    <div className="text-danger">{formik.errors.name}</div>  // Display the error in red
  ) : null}
</div>

<div className="form-item col-md-6">
  <label className="form-label ps-2" htmlFor="description">Description</label>
  <input
    type="text"
    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
    id="description"
    name="description"
    value={formik.values.description}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.description && formik.errors.description ? (
    <div className="text-danger">{formik.errors.description}</div>  // Display the error in red
  ) : null}
</div>
        </div>
        



<div className="d-flex justify-content-center align-items-center">
    <button
          className='w-auto btn btn-outline-warning mt-4'
          type="submit"
          disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
        >
          Edit
        </button>
</div>
        
      </form>
    </>
  );
}
