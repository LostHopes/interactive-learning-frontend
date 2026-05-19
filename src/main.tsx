import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@/index.css'
import App from '@/App'
import Home from '@/pages/Home'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Courses from '@/pages/courses/Courses'
import CourseDetail from '@/pages/courses/CourseDetail'
import CreateCourse from '@/pages/courses/CreateCourse'
import EditCourse from '@/pages/courses/EditCourse'
import Profile from '@/pages/Profile'
import { AuthProvider } from '@/context/AuthContext'
import { AuthRedirect } from '@/components/AuthRedirect'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <AuthRedirect><Login /></AuthRedirect>
      },
      {
        path: "register",
        element: <AuthRedirect><Register /></AuthRedirect>
      },
      {
        path: "courses",
        element: <Courses />
      },
      {
        path: "courses/new",
        element: <CreateCourse />
      },
      {
        path: "courses/:id",
        element: <CourseDetail />
      },
      {
        path: "courses/:id/edit",
        element: <EditCourse />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
