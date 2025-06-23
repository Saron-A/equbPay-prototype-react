import React from "react";
import HomePage from "./pages/Homepage";
import Group_Details from "./pages/Group_Details";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/group_details/:id",
    element: <Group_Details />,
  },
];

export default routes;
