import React from "react";
import HomePage from "./pages/Homepage";
import Edit_Page from "./pages/Edit_page";
import Login from "./components/Login.jsx";
import Signup_Login from "./pages/Signup_Login";
import Sign_up from "./components/Sign_up";
import Group_List from "./components/Group_list.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/edit_group/:id",
    element: <Edit_Page />,
  },
  {
    path: "/signup_login",
    element: <Signup_Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Sign_up />,
  },
  {
    path: "/group_list",
    element: <Group_List />,
  },
];

export default routes;
