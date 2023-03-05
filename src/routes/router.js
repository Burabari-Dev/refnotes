import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error/error-page';
import Home from '../pages/Home/home';
import DataPage from '../pages/Data/data-page';
import Login from '../pages/Login/login';
import TechDetail from '../pages/Tech-Detail/tech-detail';
import Technologies from '../pages/Technologies/technologies';
import UserProfile from '../pages/User-Profile/user-profile';
import ContentEditor from '../features/content-editor/contentEditor';
import Demo from '../pages/Demo/demo';

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
      },
      {
        path: '/login',
        element: <Login/>,
        // errorElement: <ErrorPage/>
      },
      {
        path: '/tech/:techId',
        element: <TechDetail/>,
        errorElement: <ErrorPage/>
      },
      {
        path: '/user/:userId',
        element: <UserProfile/>,
        errorElement: <ErrorPage/>
      },
      {
        path: '/data',
        element: <DataPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: '/demo',
        element: <Demo/>,
        errorElement: <ErrorPage/>
      },
    ]
  }
])
