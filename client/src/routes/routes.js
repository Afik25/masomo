import MainLayout from "../MainLayout";
import PersistLogin from "../hooks/context/state/PersistLogin";
import RequireAuth from "../hooks/context/state/RequireAuth";
// pages
import Home from "../pages/Home";
import Research from "../pages/Research";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Student from "../pages/Student";
//
// Layouts
import Dashboard from "../pages/layouts/student/Dashboard"
import Course from "../pages/layouts/Course";
import Content from "../pages/layouts/courses/Content";
import Reading from "../pages/layouts/courses/Reading";
import Favorite from "../pages/layouts/Favorite";
import Library from "../pages/layouts/Library";
import StudyLevel from "../pages/layouts/StudyLevel";
import Programs from "../pages/layouts/Programs";
import Setting from "../pages/layouts/Setting"
import NotFound from "../pages/404";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
  admin: "admin",
  user: "user",
  student: "student",
  parent: "parent",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search/:content", element: <Research /> },
      { path: "/about", element: <About /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.admin]} />,
            children: [
              {
                path: "/admin",
                element: <Admin />,
                children: [
                  { path: "/admin", element: <Dashboard/> },
                  {
                    path: "courses",
                    element: <Course />,
                    children: [
                      { index: true, element: <Content/> },
                      { path: "reading", element: <Reading/> },
                    ],
                  },
                  { path: "favorite", element: <Favorite/> },
                  { path: "library", element: <Library/> },
                  { path: "levels", element: <StudyLevel/> },
                  { path: "programs", element: <Programs/> },
                  { path: "users", element: <p>Users</p> },
                  { path: "settings", element: <Setting/> },
                ],
              },
            ],
          },
          {
            element: <RequireAuth allowedRoles={[ROLES.student]} />,
            children: [
              {
                path: "/student",
                element: <Student />,
                children: [
                  { path: "/student", element: <Dashboard/> },
                  {
                    path: "courses",
                    element: <Course />,
                    children: [
                      { index: true, element: <Content/> },
                      { path: "reading", element: <Reading/> },
                    ],
                  },
                  { path: "favorite", element: <Favorite/> },
                  { path: "library", element: <Library/> },
                  { path: "settings", element: <Setting/> },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
];
