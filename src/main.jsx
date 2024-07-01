import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import Login from "./views/LoginUsuario";
import Registro from "./views/RegistroUsuario";
import AboutUs from "./views/AboutUs";
import Productos from "./views/productos"; 
import AdminRoutes from "./admin/routes/AdminRoutes";



const router = createBrowserRouter([
  {path: "/",element: <App/>},
  {path: "/login",element: <Login/>},
  {path: "/singup",element: <Registro/>},
  {path: "/Aboutus",element: <AboutUs/>},
  { path: "/productos", element: <Productos /> }, 

  { path:"/admin", element: <AdminRoutes/> }


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);