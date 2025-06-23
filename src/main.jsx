import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GroupProvider } from "./contexts/GroupContext.jsx";

import App from "./App.jsx";

import routes from "./routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GroupProvider>
      <RouterProvider router={router} />
    </GroupProvider>
  </StrictMode>
);
