import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Group_Details from "./pages/Group_Details";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Group_Details />,
      },
    ],
  },
];

export default routes;
