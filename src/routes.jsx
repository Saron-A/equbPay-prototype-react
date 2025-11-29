import React from "react";
import HomePage from "./pages/Homepage";
import Group_Details from "./pages/Group_Details";
import Edit_Page from "./pages/Edit_page";
import Login from "./components/login";
import Signup_Login from "./pages/Signup_Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/group_details/:id",
    element: <Group_Details />,
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
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export default routes;
