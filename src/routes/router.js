import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error/error-page';
import Home from '../pages/Home/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage/>,

  }
])
