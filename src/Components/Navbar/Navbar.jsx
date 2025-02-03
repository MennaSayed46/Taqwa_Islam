import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/Taqwa.png'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar () {
  //the part related to the time
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000) // Updates every second

    return () => clearInterval(timer) // Cleanup on unmount
  }, [])

  let [clickDropDown, setClickDropDown] = useState(false)
  function handleAzanDropDown () {
    setClickDropDown(!clickDropDown)
  }

  const [hoveredItem, setHoveredItem] = useState(null)
  const handleMouseEnter = item => {
    setHoveredItem(item)
  }

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredItem(null)
    }, 100)
  }

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }
  let [clickSubMenu, setClickSubMenu] = useState(null)
  let [clickToggle, setClickToggle] = useState(false)
  function handleSubMenu (item) {
    setClickSubMenu(item)
    setClickToggle(!clickToggle)
  }

  return (
    <>
      <section className='lg:block hidden navbar1'>
        <nav
          className={`md:fixed top-0 inset-x-0  bg-[#5c2b00] capitalize first-nav `}
        >
          <div className='flex md:flex-row flex-col justify-between items-center mx-auto w-4/5'>
            <div className='left flex md:flex-row flex-col justify-center items-center my-1 w-full'>
              <p className={`${style.alazhar} text-white mr-2`}>
                <i class='mr-2 text-[#FF9822] text-xl fa-map fa-regular'></i>
                Cairo, Al-Azhar Mosque
              </p>

              <p className='border-[#979797] m-0 p-0 border-l w-4 h-4'></p>

              <p className={`text-white ${style.time}`}>
                <i className='mr-2 text-[#FF9822] text-xl fa-clock fa-regular'></i>
                {currentDateTime.toLocaleString('en-US', options)}
              </p>
            </div>

            <div className='right flex md:flex-row flex-col justify-cenetr items-center gap-3 my-1 w-full'>
              <div className='relative flex md:flex-row flex-col justify-center items-center gap-6 w-full'>
                {/* logo and azan timing p */}
                <div className='flex md:flex-row flex-col justify-center items-center'>
                  <i className='mr-2 text-[#FF9822] text-xl fa-mosque fa-solid'></i>
                  <p className={`${style.azanTiming} text-white`}>
                    Azan Timing{' '}
                    <i
                      className='ml-1 text-white text-xl fa-caret-down fa-solid'
                      onClick={handleAzanDropDown}
                    ></i>{' '}
                  </p>
                </div>

                {/* azan timing dev */}
                {clickDropDown && (
                  <div className={`left-0 absolute w-full mt-[400px] z-[101]`}>
                    <iframe
                      height='369'
                      width='50%'
                      style={{
                        background: '#f8f8f8',
                        border: '1px solid #eee'
                      }}
                      src='https://prayertimes3.today/embed/?city=180&azan=true&time=true&intro=true&next-prayer=false&remove-link=true&width=100%&lang=ar&color=5c2b00'
                    ></iframe>
                  </div>
                )}

                <div className='flex md:flex-row flex-col justify-center items-center social'>
                  <p className={`text-white`}>Follow Us :</p>
                  {/* social media */}
                  <div
                    className={`social_media flex justify-center items-center gap-2 mx-2  md:flex-row flex-col`}
                  >
                    <i className='text-white text-xl hover:text-[#ff9822] transition-all hover:duration-300 fa-brands fa-x-twitter'></i>
                    <i className='text-white text-xl hover:text-[#ff9822] transition-all hover:duration-300 fa-brands fa-facebook-f'></i>
                    <i className='text-white text-xl hover:text-[#ff9822] transition-all hover:duration-300 fa-brands fa-linkedin-in'></i>
                    <i className='text-white text-xl hover:text-[#ff9822] transition-all hover:duration-300 fa-brands fa-youtube'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>

      <section className={`lg:py-9 py-0  nav2`}>
        <nav className={`bg-white mx-auto inset-x-0 w-full fixed  z-30`}>
          <div className='flex flex-row justify-between items-center mx-auto w-4/5'>
            {/* logo div */}
            <div className='flex justify-between items-center pt-1'>
              <img src={logo} alt='taqwa-logo' className='w-[60px] h-[60px]' />
              <p className={`${style.islamic} text-[#FF9822] `}>
                <span className='text-[#5c2b00]'>Taqwa</span> Islamic
              </p>
            </div>

            <button
              onClick={toggleSidebar}
              className='block lg:hidden bg-[#5c2b00] px-4 py-2 rounded-md text-white'
            >
              ☰
            </button>

            {/* in the large screens */}
            <div className='lg:flex lg:flex-row flex-col justify-center items-center gap-4 hidden'>
              {/* calender */}
              <div className='flex md:flex-row flex-col justify-center items-center gap-2 calender'>
                <div className='border-[#5d2b004d] border-2 p-3 border-dashed rounded-[50%] calender-icone'>
                  <i className='fa-calendar-days fa-solid'></i>
                </div>
                <p>
                  Info: <span className='text-[#FF9822]'>Starts 10th May</span>
                </p>
              </div>
              {/* telephone */}
              <div className='flex md:flex-row flex-col justify-center items-center gap-2 calender'>
                <div className='border-[#5d2b004d] border-2 p-3 border-dashed rounded-[50%] calender-icone'>
                  <i className='fa-phone fa-solid'></i>
                </div>
                <p>
                  Call Us: <span className='text-[#FF9822]'>+0123456789</span>
                </p>
              </div>
              {/* email */}
              <div className='flex md:flex-row flex-col justify-center items-center gap-2 calender'>
                <div className='border-[#5d2b004d] border-2 p-3 border-dashed rounded-[50%] calender-icone'>
                  <i className='fa-envelope fa-regular'></i>
                </div>
                <p>
                  Email:{' '}
                  <span className='text-[#FF9822]'>help@example.com </span>
                </p>
              </div>
            </div>
          </div>
        </nav>

        {/* side bar*/}
        {isSidebarOpen && (
          <div
            className='top-0 right-0 z-50 fixed bg-black shadow-lg p-4 w-1/2 h-full text-white cursor-pointer'
            style={{ transition: 'transform 3s ease' }}
          >
            <button
              onClick={toggleSidebar}
              className='top-2 right-2 absolute bg-[#303030] hover:bg-[#ff9822] px-3 py-2 rounded-md text-white hover:duration-200'
            >
              ✕
            </button>
            <div className='flex flex-col gap-4 mt-14'>
              {/* home */}
              <div
                className='flex flex-col justify-between items-center w-full'
                onClick={() => {
                  handleSubMenu('home')
                }}
              >
                <div className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'>
                  <p>Home </p>
                  <i className='fa-ellipsis fa-solid'></i>
                </div>
                <div
                  className={`flex flex-col justify-center w-full ${
                    clickSubMenu === 'home' && clickToggle
                      ? 'block  animateHeight'
                      : 'hidden  '
                  }`}
                >
                  <Link
                    to={`/`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Home-style1 </p>
                  </Link>
                  <Link
                    to={`/home-style2`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Home-style2 </p>
                  </Link>

                  <Link
                    to={`/home-style3`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Home-style3 </p>
                  </Link>

                  <Link
                    to={`/home-style4`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Home-style4 </p>
                  </Link>
                </div>
              </div>

              {/* Audios */}
              <div className='hover:text-[#ff9822] hover:duration-200 classes'>
                <Link to={`/audios`}>Audios</Link>
              </div>

              {/* more pages */}
              <div
                className='flex flex-col justify-between items-center w-full'
                onClick={() => {
                  handleSubMenu('more-pages')
                }}
              >
                <div className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'>
                  <p>More Pages </p>
                  <i className='fa-ellipsis fa-solid'></i>
                </div>
                <div
                  className={`flex flex-col justify-center w-full ${
                    clickSubMenu === 'more-pages' && clickToggle
                      ? 'block  animateHeight'
                      : 'hidden  '
                  }`}
                >
                  <Link
                    to={'/about'}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>About Us </p>
                  </Link>

                  <Link
                    to={`/blog`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Blog </p>
                  </Link>

                  <Link
                    to={`/gallery`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Gallery </p>
                  </Link>

                  <Link
                    to={`/islamic-teachings`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Islamic Teachings </p>
                  </Link>

                  <Link
                    to={`/services`}
                    className='flex flex-row justify-between items-center w-full hover:text-[#ff9822] hover:duration-200'
                  >
                    <p>Services </p>
                  </Link>
                </div>

              </div>
              
                {/* contact */}
                <div className='hover:text-[#ff9822] hover:duration-200 classes'>
                  <Link to={`/contact`}>Contact</Link>
                </div>
            </div>
          </div>
        )}

        {isSidebarOpen && (
          <div
            className='z-40 fixed inset-0 bg-black opacity-50'
            onClick={toggleSidebar}
          ></div>
        )}
      </section>

      <section className='lg:block hidden py-0 md:py-7 main nav3'>
        <nav className='z-30 md:fixed inset-x-0 bg-[#0a0a0a] mx-auto py-2 w-full'>
          <div className='flex md:flex-row flex-col justify-between items-center mx-auto w-4/5 text-white mainNav'>
            {/* home */}
            <li
              className='relative w-full hover:text-[#ff9822] hover:transition-all hover:translate-x-1 hover:duration-200'
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              Home <i className='ml-1 text-white fa-caret-down fa-solid'></i>
              {hoveredItem === 'home' && (
                <div className='right-0 left-0 absolute flex flex-col bg-white shadow-lg p-4 rounded w-full text-black animation'>
                  <Link
                    to={`/`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Home-style1
                  </Link>
                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/home-style2`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Home-style2
                  </Link>
                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/home-style3`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Home-style3
                  </Link>
                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/home-style4`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Home-style4
                  </Link>
                </div>
              )}
            </li>

            {/* audios */}
            <Link
              className={`${style.link} hover:text-[#ff9822] w-full hover:transition-all hover:translate-x-1 hover:duration-200`}
              to={'/audios'}
            >
              Quran
            </Link>

            {/* scholars */}
            {/* <li
              className='relative w-full hover:text-[#ff9822] hover:transition-all hover:translate-x-1 hover:duration-200'
              onMouseEnter={() => {
                handleMouseEnter('scholars')
              }}
              onMouseLeave={handleMouseLeave}
            >
              Scholars
              <i className='ml-1 text-white fa-caret-down fa-solid'></i>
              {hoveredItem === 'scholars' && (
                <div className='right-0 left-0 absolute flex flex-col bg-white shadow-lg p-4 rounded w-full text-black animation'>
                  <Link
                    to={`/islamic-scholar`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Islamic-Scholar
                  </Link>
                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/scholar-profile`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Scholar-profile
                  </Link>
                </div>
              )}
            </li> */}

            {/* more-pages */}
            <li
              className='relative w-full hover:text-[#ff9822] hover:transition-all hover:translate-x-1 hover:duration-200'
              onMouseEnter={() => {
                handleMouseEnter('more-pages')
              }}
              onMouseLeave={handleMouseLeave}
            >
              More Pages
              <i className='ml-1 text-white fa-caret-down fa-solid'></i>
              {hoveredItem === 'more-pages' && (
                <div className='right-0 left-0 absolute flex flex-col bg-white shadow-lg p-4 rounded w-full h-auto text-black animation'>
                  <Link
                    to={`/about`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    About Us
                  </Link>

                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/blog`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Blog
                  </Link>

                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/gallery`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Gallery
                  </Link>

                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/islamic-teachings`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Islamic-teachings
                  </Link>

                  <div className='border-b-[#979797] border-b-2 w-full'></div>
                  <Link
                    to={`/services`}
                    className='hover:text-[#ff9822] hover:duration-300'
                  >
                    Services
                  </Link>
                </div>
              )}
            </li>

            <Link
              className={`${style.link} hover:text-[#ff9822] w-full hover:transition-all hover:translate-x-1 hover:duration-200`}
              to={'/contact'}
            >
              Contact
            </Link>
          </div>
        </nav>
      </section>
    </>
  )
}
