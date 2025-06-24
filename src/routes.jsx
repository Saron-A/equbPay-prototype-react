import React from "react";
import HomePage from "./pages/Homepage";
import Group_Details from "./pages/Group_Details";
import Edit_Page from "./pages/Edit_page";

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
];

export default routes;
