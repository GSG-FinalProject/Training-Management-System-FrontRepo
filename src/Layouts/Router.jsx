import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import TraineeLayout from './TraineeLayout';
import AdminLayout from './AdminLayout';
import TrainerLayout from './TrainerLayout';
import TrainerDashboard from '../Components/Trainer/TrainerDashboard/TrainerDashboard'
import TraineeDashboard from '../Components/Trainee/TraineeDashboard/TraineeDashboard'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TraineeLayout />,
    children: [
      {
        path: "",
        element: <TraineeDashboard />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        element: <h2>page not found --- DashboardAdmin</h2>,
      },
    ],
  },
  {
    path: "/classroom",
    element: <TrainerLayout />,
    children: [
      {
        path: "",
        element: <TrainerDashboard />,
      },
    ],
  },
]);
