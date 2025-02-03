import { useState } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Notfound from './Components/Notfound/Notfound'
import Audios from './Components/Audios/Audios'
import Blog from './Components/Blog/Blog'
import Gallery from './Components/Gallery/Gallery'
import IslamicTeachings from './Components/IslamicTeachings/IslamicTeachings'
import Services from './Components/Services/Services'
import HomeStyle2 from './Components/HomeStyle2/HomeStyle2'
import HomeStyle3 from './Components/HomeStyle3/HomeStyle3'
import HomeStyle4 from './Components/HomeStyle4/HomeStyle4'
import QuranContextProvider from './Context/QuranContext'
import { Toaster } from 'react-hot-toast';

function App () {
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/audios', element: <Audios /> },
        { path: '/blog', element: <Blog /> },
        { path: '/gallery', element: <Gallery /> },
        { path: '/islamic-teachings', element: <IslamicTeachings /> },
        { path: '/services', element: <Services /> },
        { path: '/contact', element: <Contact /> },
        { path: '/home-style2', element: <HomeStyle2 /> },
        { path: '/home-style3', element: <HomeStyle3 /> },
        { path: '/home-style4', element: <HomeStyle4 /> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ])

  return (
    <>
      <QuranContextProvider>
        <RouterProvider router={router} />
        <Toaster/>
      </QuranContextProvider>
    </>
  )
}

export default App
