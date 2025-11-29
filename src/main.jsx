import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GroupProvider } from "./contexts/GroupContext.jsx";
import { UserProvider } from "./contexts/UserContext_1.jsx";

import App from "./App.jsx";

import routes from "./routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <GroupProvider>
        <RouterProvider router={router} />
      </GroupProvider>
    </UserProvider>
  </StrictMode>
);
