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
import { ProtectedRoute, PublicRoute } from "./guard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/backoffice",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Backoffice />
      },
      {
        path: "assignments",
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
        path: "activities",
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
        path: "announcements",
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
        path: "users",
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