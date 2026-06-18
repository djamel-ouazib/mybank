import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/settings'
import App from './App'

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <DashboardLayout />,
//         children: [
//             { index: true, element: <Dashboard /> }, // page par défaut sur /
//             { path: 'dashboard', element: <Dashboard /> },
//         ],
//     },
// ])
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // ma page d'accueil
    },
    {
        path: '/app',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
])
