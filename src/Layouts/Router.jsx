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
      {
        path: "*",
        element: <h2>page not found --- Trainee dashboard</h2>,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path:"*",
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
      {
        path: "*",
        element: <h2>page not found --- Trainer dashboard</h2>,
      }
    ],
  },
]);
