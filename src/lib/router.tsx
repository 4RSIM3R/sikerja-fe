import { AppLayout } from "@/layouts/AppLayout";
import { ActivityDetail } from "@/pages/app/activity/Detail";
import { ActivityForm } from "@/pages/app/activity/Form";
import { ActivityIndex } from "@/pages/app/activity/Index";
import { AnnouncementForm } from "@/pages/app/announcement/Form";
import { AnnouncementIndex } from "@/pages/app/announcement/Index";
import { AssignmentForm } from "@/pages/app/assignment/Form";
import { AssignmentIndex } from "@/pages/app/assignment/Index";
import { Backoffice } from "@/pages/app/Backoffice";
import { SettingForm } from "@/pages/app/setting/Form";
import { UserDetail } from "@/pages/app/user/Detail";
import { UserForm } from "@/pages/app/user/Form";
import { UserIndex } from "@/pages/app/user/Index";
import { Login } from "@/pages/auth/Login";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
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
        children: [
          {
            path: "",
            element: <AssignmentIndex />
          },
          {
            path: "form",
            element: <AssignmentForm />
          },
          {
            path: ":id",
            element: <AssignmentForm />
          },
        ]
      },
      {
        path: "activity",
        children: [
          {
            path: "",
            element: <ActivityIndex />
          },
          {
            path: "form",
            element: <ActivityForm />
          },
          {
            path: ":id",
            element: <ActivityDetail />
          }
        ]
      },
      {
        path: "announcement",
        children: [
          {
            path: "",
            element: <AnnouncementIndex />
          },
          {
            path: "form",
            element: <AnnouncementForm />
          },
          {
            path: ":id",
            element: <AnnouncementForm />
          }
        ]
      },
      {
        path: "user",
        children: [
          {
            path: "",
            element: <UserIndex />
          },
          {
            path: "form",
            element: <UserForm />
          },
          {
            path: ":id",
            element: <UserDetail />
          }
        ]
      },
      {
        path: "settings",
        element: <SettingForm />
      },
    ]
  }
]);