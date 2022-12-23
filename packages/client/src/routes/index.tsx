import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signin',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
