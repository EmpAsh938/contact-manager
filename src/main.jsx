import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import ErrorPage from './components/ErrorPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AppProvider from './context'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Toaster } from "react-hot-toast";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/home',
        element: <Home />,
        loader: async () => {
            const localstorage_item = JSON.parse(localStorage.getItem("user"));
            if (!localstorage_item) {
                return redirect('/login');
            }

            return localstorage_item;
        }
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AppProvider>
    </React.StrictMode>,
)
