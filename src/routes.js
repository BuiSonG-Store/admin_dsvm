import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Bill from './pages/Bill';
import Category from './pages/Category';
import Region from './pages/Region';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to='/dashboard/app' replace /> },
                { path: 'app', element: <DashboardApp /> },
                { path: 'user', element: <User /> },
                { path: 'category', element: <Category /> },
                { path: 'region', element: <Region /> },
                { path: 'products', element: <Products /> },
                { path: 'blog', element: <Blog /> },
                { path: 'bill', element: <Bill /> }
            ]
        },
        {
            path: '/' ,
            element: <LogoOnlyLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to='/login' /> },
                { path: '*', element: <Navigate to='/404' /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> }
    ]);
}
