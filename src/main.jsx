import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './component/layout/Main';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import RgisterRBS from './component/RegisterRBS/RgisterRBS';
import RegisterBS from './component/RegisterBS/RegisterBS';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"login",
        element: <Login/>
      },
      {
        path:"register",
        element: <Register/>
      },
      {
        path: "register-rbs",
        element: <RgisterRBS></RgisterRBS>
      },
      {
        path:'/register-bs',
        element: <RegisterBS></RegisterBS>
      }
    ]

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
