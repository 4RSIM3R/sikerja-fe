import { AppLayout } from "@/layouts/AppLayout";
import { Backoffice } from "@/pages/app/Backoffice";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Home />
  },
  {
    path: "/backoffice",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Backoffice />
      },
      {
        path: "assignment",
        element: <Home />
      },
      {
        path: "activity",
        element: <Home />
      },
      {
        path: "announcement",
        element: <Home />
      },
      {
        path: "user",
        element: <Home />
      },
      {
        path: "settings",
        element: <Home />
      },
    ]
  }
]);