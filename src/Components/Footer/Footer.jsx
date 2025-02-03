import React from 'react'
import style from './Footer.module.css'
import logo from '../../assets/Taqwa.png'
import umrah from '../../../public/umrah-and-hajj-100x100 (1).jpg'
import slider from '../../../public/slider-green-taqwa-islamic-100x100 (1).jpg'
import quranImg from '../../../public/quran-class-100x100 (1).jpg'

export default function Footer () {
  return (
    <>
      <section className={`relative bg-white mt-16 pt-4 ${style.footer_section}`}>
        <footer className='relative z-0 bg-[#5c2b00] py-8 w-full'>
          {/* Main content container */}
          <div className='md:relative flex md:flex-row flex-col justify-center gap-4 bg-white md:shadow-lg md:shadow-[#2c2b2b] mx-auto md:-mt-24 rounded-lg w-4/5'>
            {/* About Us */}
            <div className='p-2 w-full'>
              <p className={`${style.title}`}>About Us</p>
              <p className='text-[#888]'>
                Lorem ipsum dolor sit amet, conec tetur adipisicing elit, sed do
                eiusd tempor incididunt ut labore.
              </p>
              <img
                src={logo}
                alt='Taqwa_logo_img'
                className='w-[100px] h-[100px]'
              />
              <p className='my-4'>
                <i className='text-[#ff9822] fa-location-dot fa-solid'></i>{' '}
                Cairo, Al-Azahr Mosque
              </p>
            </div>

            {/* Latest Blogs */}
            <div className='p-2 w-full'>
              <p className={`${style.title}`}>Latest blogs</p>
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center gap-4 border-[#dfdfdf] my-2 py-2 border-b-2 border-dashed'>
                  <img
                    src={umrah}
                    alt='umrah-img'
                    className='rounded-lg w-[68px] h-[68px]'
                  />
                  <div className='flex flex-col'>
                    <p className='hover:text-[#ff9822] transition-all duration-300'>
                      Ulama Khutbaat On Islam
                    </p>
                    <p className='text-[#888]'>
                      <i className='mx-1 text-[#ff9822] fa-calendar-days fa-solid'></i>
                      Feb 2, 2025
                    </p>
                  </div>
                </div>

                <div className='flex flex-row justify-between items-center gap-4 border-[#dfdfdf] my-2 py-2 border-b-2 border-dashed'>
                  <img
                    src={slider}
                    alt='slider-img'
                    className='rounded-lg w-[68px] h-[68px]'
                  />
                  <div className='flex flex-col'>
                    <p className='hover:text-[#ff9822] transition-all duration-300'>
                      Ulama Sermons with Audio
                    </p>
                    <p className='text-[#888]'>
                      <i className='mx-1 text-[#ff9822] fa-calendar-days fa-solid'></i>
                      Feb 2, 2025
                    </p>
                  </div>
                </div>

                <div className='flex flex-row justify-between items-center gap-4 my-2 py-2'>
                  <img
                    src={quranImg}
                    alt='quranImg'
                    className='rounded-lg w-[68px] h-[68px]'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='hover:text-[#ff9822] transition-all duration-300'>
                      Quran, Life Guide Book
                    </p>
                    <p className='text-[#888]'>
                      <i className='mx-1 text-[#ff9822] fa-calendar-days fa-solid'></i>
                      Feb 2, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className='p-2 w-full'>
              <div className='flex flex-col'>
                <p className={`${style.title}`}>Contact Info</p>
                <div className='flex flex-col'>
                  <p className='border-[#dfdfdf] my-1 py-1 border-b-2 border-dashed text-[#666666]'>
                    <i className='mx-1 font-semibold text-[#ff9822] fa-envelope fa-regular'></i>
                    info@example.com
                  </p>
                  <p className='border-[#dfdfdf] my-1 py-1 border-b-2 border-dashed text-[#666666]'>
                    <i className='mx-1 font-semibold text-[#ff9822] fa-phone fa-solid'></i>
                    +20 01119121377
                  </p>
                  <p className='border-[#dfdfdf] my-1 py-1 border-b-2 border-dashed text-[#666666]'>
                    <i className='mx-1 font-semibold text-[#ff9822] fa-location-dot fa-solid'></i>
                    Cairo, Al-Azahar Mosque
                  </p>
                  <div className='flex flex-row items-center gap-3 mx-4 my-2'>
                    <i className='text-[#888] text-2xl hover:text-[#ff9822] transition-all duration-300 fa-brands fa-x-twitter'></i>
                    <i className='text-[#888] text-2xl hover:text-[#ff9822] transition-all duration-300 fa-brands fa-facebook-f'></i>
                    <i className='text-[#888] text-2xl hover:text-[#ff9822] transition-all duration-300 fa-brands fa-linkedin-in'></i>
                    <i className='text-[#888] text-2xl hover:text-[#ff9822] transition-all duration-300 fa-brands fa-youtube'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className='flex md:flex-row flex-col justify-between items-center mx-auto my-8 py-3 border-b border-b-[#dfdfdf] border-dashed w-3/5 text-white'>
            <p className='w-full font-bold text-xl'>
              Subscribe, For Weekly Updates
            </p>
            <div className='relative bg-white rounded-full w-full'>
              <input
                type='email'
                placeholder='Enter Your Email Address'
                className='p-4 border-none rounded-full w-full font-normal text-black outline-none'
              />
              <button className='right-0 absolute bg-[#ff9822] hover:bg-black -mr-[25%] md:-mr-[25%] px-4 md:px-10 py-4 border-none rounded-full transition-all duration-300'>
                SIGNUP NOW
              </button>
            </div>
          </div>

          <p className='text-center text-white'>
            Taqwa © Copyright 2025 - All Rights Reserved
          </p>
        </footer>
      </section>
    </>
  )
}
