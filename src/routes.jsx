import React from "react";
import HomePage from "./pages/Homepage";
import Edit_Page from "./pages/Edit_page";
import Login from "./components/login.jsx";
import Signup_Login from "./pages/Signup_Login";
import Sign_up from "./components/Sign_up";
import Group_List from "./components/Group_List.jsx";
import Group_Details from "./pages/Group_Details.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/group_details/:group_id",
    element: <Group_Details />,
  },

  {
    path: "/edit_group/:group_id",
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
