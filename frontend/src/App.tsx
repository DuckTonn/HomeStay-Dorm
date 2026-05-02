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
import { RoomDetailPage } from './pages/RoomDetail';
import MeetUpList from './pages/MeetUpList';

import RentHistory from './pages/RentHistory';

import PaymentManagement from './pages/Employee/PaymentManagement';
import ReportsStatistics from './pages/Employee/ReportsStatistics';
import RenterList from './pages/Employee/RenterList';
import RenterManagement from './pages/Employee/RenterManagement';
import UserManagement from './pages/Employee/UserManagement';
import RoomSearch from './pages/RoomSearch';
import RoomManagement from './pages/Employee/RoomManagement';

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
      { path: "room-detail", element: <RoomDetailPage /> },
      { path: "meet-up", element: <MeetUpList /> },
      { path: "rent-history", element: <RentHistory /> },
      { path: "payment-management", element: <PaymentManagement /> },
      { path: "reports-statistics", element: <ReportsStatistics /> },
      { path: "renter-list", element: <RenterList /> },
      { path: "renter-management", element: <RenterManagement /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "room-management", element: <RoomManagement /> },
      { path: "rooms", element: <RoomSearch /> }
    ]
  },
  { path: "/login", element: <LoginPage />, }, { path: "/register", element: <RegisterPage />, }, { path: "/forget-password", element: <ForgetPasswordPage />, },
]);

const App = () => {
  return <RouterProvider router={router} />
}
export default App
