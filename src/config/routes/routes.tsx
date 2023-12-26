import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import Navbar from '../../layouts/Navbar'

export const AppLayout = () => {
  return (
    <div className='w-screen'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export const router = createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
        ]
    },
])
