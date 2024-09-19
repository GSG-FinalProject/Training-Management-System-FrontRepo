import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import StudentLayout from './StudentLayout';
import AdminLayout from './AdminLayout';
import TrainerLayout from './TrainerLayout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentLayout />,
    children: [
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
        path: "*",
        element: <h2>page not found --- DashboardAdmin</h2>,
      },
    ],
  },
  {
    path: "/classroom",
    element: <TrainerLayout />,
    children: [
      {
        path: "*",
        element: <h2>page not found --- Trainer</h2>,
      },
    ],
  },
]);
