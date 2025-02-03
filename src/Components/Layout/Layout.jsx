import React from 'react'
import style from './Layout.module.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout () {
  return (
    <>
      <Navbar />
      <div className='pt-16 md:pt-4'>
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  )
}
