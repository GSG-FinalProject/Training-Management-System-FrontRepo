import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import StudentLayout from './TraineeLayout';
import AdminLayout from './AdminLayout';
import TrainerLayout from './TrainerLayout';
import Login from '../Components/Shared/Login/Login';
import Home from '../Components/Admin/DashHome/Home';
import Trainers from '../Components/Admin/Trainers/Trainers';
import AddTrainer from '../Components/Admin/Trainers/AddTrainer';
import AddTrainee from '../Components/Admin/Trainees/AddTrainee';
import Trainees from '../Components/Admin/Trainees/Trainees';
import EditTrainer from '../Components/Admin/Trainers/EditTrainer';
import EditTrainee from '../Components/Admin/Trainees/EditTrainee';
import Trainings from '../Components/Admin/Trainings/Trainings';
import AddTraining from '../Components/Admin/Trainings/AddTraining';
import EditTraining from '../Components/Admin/Trainings/EditTraining';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentLayout />,
    children: [
      // {
      //   path: "login",
      //   element: <Login/>,
      // },
      {
        path: "*",
        element: <h2>page not found --- Student</h2>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "trainers",
        element: <Trainers/>,
      },
      {
        path: "trainees",
        element: <Trainees/>,
      },
      
      {
        path: "trainings",
        element: <Trainings/>,
      },
      {
        path: "addTrainer",
        element: <AddTrainer/>
      },
      {
        path: "addTrainee",
        element: <AddTrainee/>
      },
      {
        path: "addTraining",
        element: <AddTraining/>
      },
      {
        path: "editTrainer/:id",
        element: <EditTrainer/>
      },
      {
        path: "editTrainee/:id",
        element: <EditTrainee/>
      },
      {
        path: "editTraining/:id",
        element: <EditTraining/>
      },
      {
        path: "*",
        element: <h2>page not found --- DashboardAdmin</h2>,
      },
    ],
  },
  {
    path: "classroom",
    element: <TrainerLayout />,
    children: [
      {
        path: "*",
        element: <h2>page not found --- Trainer</h2>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  }
]);
