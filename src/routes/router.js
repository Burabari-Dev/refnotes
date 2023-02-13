import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error/error-page';
import Home from '../pages/Home/home';
import Technologies from '../pages/Technologies/technologies';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Technologies />,
        errorElement: <ErrorPage/>
      }
    ]
  }
])
