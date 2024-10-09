import * as yup from 'yup';

export const loginScheme = yup.object({
    email:yup.string().required('Email is required').email('Please enter a valid email address'),
    password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
    
 })

 export const addTrainer = yup.object({
    email:yup.string().required('Email is required').email('Please enter a valid email address'),
    password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
    firstName:yup.string().required('First name is required'),
    lastName:yup.string().required('Last name is required'),
    
 })
 export const addTraining = yup.object({
   name:yup.string().required('name is required'),
   description:yup.string().required('description is required'),
   
   
})
 export const editTrainer = yup.object({
    email:yup.string().required('Email is required').email('Please enter a valid email address'),
    firstName:yup.string().required('First name is required'),
    lastName:yup.string().required('Last name is required'),
    bio:yup.string().required('Bio is required'),
 })
 export const editTraining = yup.object({
   name:yup.string().required('Training name is required'),
   description:yup.string().required('Description is required'),
   
})
 export const editTrainee = yup.object({
   email:yup.string().required('Email is required').email('Please enter a valid email address'),
   firstName:yup.string().required('First name is required'),
   lastName:yup.string().required('Last name is required'),
  
})

 export const addTrainee = yup.object({
    email:yup.string().required('Email is required').email('Please enter a valid email address'),
    password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
    firstName:yup.string().required('First name is required'),
    lastName:yup.string().required('Last name is required'),
 })