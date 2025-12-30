import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

// import { ProductPage } from './shop/pages/product/ProductPage';
import { LoginPage } from './auth/pages/login/LoginPage';
import { RegisterPage } from './auth/pages/register/RegisterPage';
import { NotAuthenticatedRoute } from './components/routes/ProtectedRoutes';
import {DashboardLayout} from './dashboard/layouts/DashboardLayout';
import { DashboardPage } from './dashboard/pages/dashboard/DashboardPage';
import { SettingsPage } from './dashboard/pages/settings/SettingsPage';

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
// const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
  // Main routes
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'settings',
         element: <SettingsPage />,
       },
      // {
      //   path: 'gender/:gender',
      //   element: <GenderPage />,
      // },
    ],
  },

  // Auth Routes
  {
    path: '/auth',
    element: 
             <NotAuthenticatedRoute>
                  <AuthLayout />
             </NotAuthenticatedRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  // {
  //   path: '/admin',
  //   element: <AdminRoute>
  //              <AdminLayout />
  //            </AdminRoute>,
  //   children: [
  //     {
  //       index: true,
  //       element: <DashboardPage />,
  //     },
  //     {
  //       path: 'products',
  //       element: <AdminProductsPage />,
  //     },
  //     {
  //       path: 'products/:id',
  //       element: <AdminProductPage />,
  //     },
  //   ],
  // },
  // {
  //   path: '*',
  //   element: <Navigate to="/" />,
  // },
]);