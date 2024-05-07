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
import Dashboard from "../pages/layouts/student/Dashboard";
import Course from "../pages/layouts/Course";
import Content from "../pages/layouts/courses/Content";
import Reading from "../pages/layouts/courses/Reading";
import Messaging from "../pages/layouts/Messaging";
import Challenge from "../pages/layouts/Challenge";
//
import InitChallenge from "../pages/layouts/challenge/InitChallenge";
import JoinQuiz from "../pages/layouts/challenge/play/JoinQuiz";
import Play from "../pages/layouts/challenge/play/Play";
import Quiz from "../pages/layouts/challenge/Quiz";
import QuestionAnswers from "../pages/layouts/challenge/QuestionAnswers";
import QuizPlay from "../pages/layouts/challenge/QuizPlay";
// Quiz-Play fragments
import LeaderBoard from "../pages/layouts/challenge/play/LeaderBoard";
//
import Favorite from "../pages/layouts/Favorite";
import Library from "../pages/layouts/Library";
import StudyLevel from "../pages/layouts/StudyLevel";
import Programs from "../pages/layouts/Programs";
import Setting from "../pages/layouts/Setting";
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
                  { path: "/admin", element: <Dashboard /> },
                  {
                    path: "courses",
                    element: <Course />,
                    children: [
                      { index: true, element: <Content /> },
                      { path: "reading/:param1/", element: <Reading /> },
                    ],
                  },
                  { path: "messaging", element: <Messaging /> },
                  {
                    path: "challenge",
                    element: <Challenge />,
                    children: [
                      { index: true, element: <InitChallenge /> },
                      { path: "join-quiz", element: <JoinQuiz /> },
                      { path: "play", element: <Play /> },
                      { path: "quiz", element: <Quiz /> },
                      { path: "questions", element: <QuestionAnswers /> },
                      {
                        path: "quiz-play",
                        element: <QuizPlay />,
                        children: [
                          { index: true, element: <LeaderBoard /> },
                          { path: "qa", element: <p>QA</p> },
                        ],
                      },
                    ],
                  },
                  { path: "favorite", element: <Favorite /> },
                  { path: "library", element: <Library /> },
                  { path: "levels", element: <StudyLevel /> },
                  { path: "programs", element: <Programs /> },
                  { path: "users", element: <p>Users</p> },
                  { path: "settings", element: <Setting /> },
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
                  { path: "/student", element: <Dashboard /> },
                  {
                    path: "courses",
                    element: <Course />,
                    children: [
                      { index: true, element: <Content /> },
                      { path: "reading/:param1", element: <Reading /> },
                    ],
                  },
                  { path: "messaging", element: <Messaging /> },
                  { path: "challenge", element: <Challenge /> },
                  { path: "favorite", element: <Favorite /> },
                  { path: "library", element: <Library /> },
                  { path: "settings", element: <Setting /> },
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
