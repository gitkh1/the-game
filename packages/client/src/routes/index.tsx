import { LoginPage } from '../pages/LoginPage'
import { SigninPage } from '../pages/SigninPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
