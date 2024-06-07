import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateLayout from "./components/PrivateLayout";

export const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: (
  //     <PublicRouter>
  //       <Login />
  //     </PublicRouter>
  //   ),
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  {
    path: "/",
    element: (
      <PrivateLayout>
        <Dashboard />
      </PrivateLayout>
    ),
  },
]);
