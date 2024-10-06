// import axios from 'axios';
// import { useFormik } from 'formik';
// import React from 'react'
// import Input from '../../Shared/Input/Input';
// import { editTrainer } from '../../../Validation/validation';

// export default function EditComponent({id,firstName,lastName,email}) {
//     console.log(firstName)
    
//     const onSubmit = async (updatedData) => {
//         try {
//           const formData = new FormData();
//           formData.append('id', updatedData.id);
//           formData.append('firstName', updatedData.firstName);
//           formData.append('lastName', updatedData.lastName);
//           formData.append('email', updatedData.email);
  
//           const {data} = await axios.put(`https://localhost:7105/api/Trainer/${id}`);
//           if(data.succeeded){
//             console.log('kjjhjhvhgvhgvh')
//           }
//           else{
//               formik.resetForm();
//               setOpenUpdate(false);
//               Swal.fire({
//                   title: "Trainer Account updated successfully",
//                   text: "You can see the modified account in dashboard",
//                   icon: "success"
//                 });
              
  
//         } }catch (error) {
//           console.error('Error updating employee:', error);
//         }
//       };
    
//       const formik = useFormik({
//         initialValues: {
//             id:`${id}`,
//           firstName: `${firstName}`,
//           lastName: `${lastName}`,
//           email: `${email}`,
//         },
//         validationSchema:editTrainer,
//         onSubmit,
//       });
//       const inputs =[
//         {
//             type : 'text',
//               id:'id',
//               name:'id',
//               title:'ID',
//               value:formik.values.id,
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
//             />
        
//     )

//   return (
//     <>
//     <form onSubmit={formik.handleSubmit} className="row justify-content-center">
//       {renderInputs}
      
      
//       <button sx={{px:2}} variant="contained"
//               className="m-2 btn primaryBg"
//               type="submit"
//               disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0  }
//             >
//               Update
//             </button>
//             {/* <p className='text-danger'>{errmsg}</p> */}
      
//     </form>
//     </>
//   )
// }

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import Input from '../../Shared/Input/Input';
import { editTrainer } from '../../../Validation/validation';
import Swal from 'sweetalert2';

export default function EditComponent({ id, firstName, lastName, email }) {
    console.log("Props received:", { id, firstName, lastName, email });

    const onSubmit = async (updatedData) => {
        try {
            const formData = new FormData();
            formData.append('id', updatedData.id);
            formData.append('firstName', updatedData.firstName);
            formData.append('lastName', updatedData.lastName);
            formData.append('email', updatedData.email);

            const { data } = await axios.put(`https://localhost:7105/api/Trainer/${id}`, formData);
            if (data.succeeded) {
                Swal.fire({
                    title: "Trainer Account updated successfully",
                    text: "You can see the modified account in dashboard",
                    icon: "success"
                });
            } else {
                formik.resetForm();
                // Assuming setOpenUpdate is a state function you have defined
                setOpenUpdate(false);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: `${id}`,
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            email: `${email}`,
        },
        validationSchema: editTrainer,
        onSubmit,
    });

    console.log("Initial Values:", formik.initialValues);
    console.log("Current Formik Values:", formik.values);

    const inputs = [
        {
            type: 'text',
            id: 'id',
            name: 'id',
            title: 'ID',
        },
        {
            type: 'text',
            id: 'firstName',
            name: 'firstName',
            title: 'First Name',
        },
        {
            type: 'text',
            id: 'lastName',
            name: 'lastName',
            title: 'Last Name',
        },
        {
            type: 'email',
            id: 'email',
            name: 'email',
            title: 'User Email',
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input
            key={index}
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            value={formik.values[input.name]} // Directly binding from Formik values
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
        />
    ));

    return (
        <>
        {id}
        <form onSubmit={formik.handleSubmit} className="row justify-content-center">
            {renderInputs}
            <button
                sx={{ px: 2 }}
                variant="contained"
                className="m-2 btn primaryBg"
                type="submit"
                disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
            >
                Update
            </button>
        </form>
        </>
        
    );
}
