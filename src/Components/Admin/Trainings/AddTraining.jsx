import React, { useContext } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { addTrainer, addTraining } from '../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';


export default function AddTraining() {
    let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);

    const initialValues={
        name: '',
        description:'',
    };

    const navigate = useNavigate();

    const onSubmit = async (users) => {
        try {
            const { data } = await axios.post(
                `https://localhost:7107/api/TrainingField`,
                users,
                {
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            if(data.succeeded){
           formik.resetForm();
           toast.success(`Training Added Successfully`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            navigate('/dashboard/trainings')
         }
            
            
           }catch (error) {
            console.error('Error submitting form:', error);
            console.log('Error response:', error.response);
          }
        };

        const formik = useFormik({
            initialValues : initialValues,
            onSubmit,
            validationSchema:addTraining
          })
          const inputs =[
            {
              type : 'text',
                id:'name',
                name:'name',
                title:'Training Name',
                value:formik.values.name,
          },
          
            {
                type : 'text',
                id:'description',
                name:'description',
                title:'Description',
                value:formik.values.description,
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
                      colSize="col-md-12" 
                      />
                  
              )
  return (
    
    
    <>
    {console.log(userData)}
    <h2 className='ps-4 pt-4'>Add Training</h2>
    <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5 gap-3">
        {renderInputs}
        <button className='w-auto btn btn-outline-primary'  type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 }>Add</button>
    </form>
    </>
    
  )
}
