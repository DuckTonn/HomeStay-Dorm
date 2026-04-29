import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'

import MainLayout from './layouts/MainLayout'
import HomeLayout from './layouts/HomeLayout'

// Pages
import Homepage from './pages/Homepage';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { ForgetPasswordPage } from './pages/Auth/ForgotPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Homepage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {}
    ]
  },
  { path: "/login", element: <LoginPage />, }, { path: "/register", element: <RegisterPage />, }, { path: "/forget-password", element: <ForgetPasswordPage />, },
]);

const App = () => {
  return <RouterProvider router={router} />
}
export default App
