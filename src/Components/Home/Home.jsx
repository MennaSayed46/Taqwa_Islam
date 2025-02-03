import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import pattern from '../../../public/bg-vector-2-1 (1).png'
import Quran from '../Quran/Quran'
import pillarsMainImg from '../../../public/pillar-parallex (1).jpg'

export default function Home () {
  let [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  let [translatedToIndonesia, setTranslatedToIndonesia] = useState(false)

  const translate = () => {
    setTranslatedToIndonesia(prev => !prev)
  }

  // calling the functions
  useEffect(() => {
    getAhadith()
  }, [])
  // fucntion of get ahadith
  async function getAhadith () {
    try {
      let response = await axios.get(
        'https://api.hadith.gading.dev/books/muslim?range=1-150'
      )
      setData(response.data.data.hadiths)
      // console.log(response.data.data.hadiths)
      // console.log(data)
    } catch {
      console.log('error')
    }
  }
  // function to the next hadith
  const nextHadith = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  // function to the perv hadith
  const prevHadith = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  return (
    <>
      <main
        className={`w-full h-screen ${style.mainImg} `}
        style={{
          backgroundImage: "url('/taqwa-slider-wordpress-theme-new.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='flex flex-col justify-center items-center mx-auto w-4/5 h-full'>
          <div className='text-center history'>
            <p className='border-t-[#5c2b00] border-t-2 h-2'></p>
            <motion.button
              className={`my-2 ${style.history} text-white relative  my-2`}
            >
              <div className='div'>
                <span>K</span>
                <span>n</span>
                <span>o</span>
                <span>w </span>
                <span>T</span>
                <span>h </span>
                <span>e</span>
                <span>H</span>
                <span>i</span>
                <span>s</span>
                <span>t</span>
                <span>o</span>
                <span>r</span>
                <span>y</span>
                <span>O</span>
                <span>f</span>
                <span>I</span>
                <span>s</span>
                <span>l</span>
                <span>a</span>
                <span>m</span>
              </div>
            </motion.button>
            <p className='border-t-[#5c2b00] border-t-2 h-2'></p>
          </div>
          <p className={`my-4 ${style.desc} text-center`}>
            When things are so hard to handle , retreat & count your blessings
            instead
          </p>

          <button
            className={`bg-[#FF9822] my-4  py-2 rounded-md text-center text-white  ${style.readMore} px-8  ${style.btn} wavi`}
          >
            Read More
          </button>
        </div>
      </main>

      {/* ahadith sectioooooooooooooooooooooooooooooon  */}
      <section
        className={`relative flex flex-col justify-center items-center ${style.ahadithSection} py-6 min-h-[50v] text-white ahadith`}
      >
        <div className='flex flex-col justify-center items-center mx-auto w-11/12 md:w-4/5'>
          <p className={`${style.ahadith} relative my-6 py-1`}>Ahadith</p>
          <img
            src={pattern}
            alt='pattern-flower-img'
            className='md:block top-0 left-0 z-0 absolute hidden pr-24 w-[300px]'
          />
          {/* getting the ahadith */}
          <div
            className={`${style.hadithContent} z-10 border-2 my-2 border-white rounded-md  flex flex-col justify-center items-center w-full px-3`}
          >
            {data.length > 0 ? (
              <div key={data[currentIndex].id} className='w-full text-center'>
                <p
                  className={`${style.specific_hadith} my-auto text-center `}
                  dir={translatedToIndonesia ? 'ltr' : 'rtl'}
                >
                  {data[currentIndex].number} -{' '}
                  {translatedToIndonesia
                    ? data[currentIndex].id
                    : data[currentIndex].arab}
                </p>

                <button
                  className={`bg-[#5c2b00] my-4 px-4 py-2 rounded-md ${style.translateBtn} shadow-sm shadow-gray-500`}
                  onClick={translate}
                >
                  <span>
                    {' '}
                    Translate to {translatedToIndonesia ? 'Arab' : 'Indonesia'}
                  </span>
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {/* prev and next btns */}
          <div className='flex justify-between items-center my-2 px-12 md:px-0 w-full lg:w-1/5'>
            <button onClick={prevHadith} className='text-white'>
              <i className='mx-1 fa-less-than fa-solid'></i>Prev
            </button>
            <div>
              {data.length > 0 ? (
                <>
                  <div key={data[currentIndex].id}>
                    <p>{data[currentIndex].number}-300</p>
                  </div>
                </>
              ) : null}
            </div>
            <button onClick={nextHadith} className='text-white'>
              Next<i className='mx-1 fa-greater-than fa-solid'></i>
            </button>
          </div>
        </div>
      </section>

      {/* Quran sectioooooooooooooooooooooooooooooon */}
      <section>{/* <Quran/> */}</section>

      {/* pillars section */}
      <section className='relative flex flex-col justify-center items-center w-full min-h-[60vh] pillars'>
        <div
          className='top-0 bottom-0 absolute inset-x-0'
          style={{
            backgroundImage: "url('../../../public/pillar-parallex (1).jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(25%)'
          }}
        ></div>

        <div className='flex flex-col justify-center items-center mx-auto w-4/5 text-center text-white transform'>
          <p
            className={`my-2 font-bold text-[#FF9822] text-xl ${style.about_pillars}`}
          >
            About Essential
          </p>
          <p
            className={`font-semibold text-3xl ${style.pillars_of_islam} my-5 relative`}
          >
            Pillars of Islam
          </p>

          {/* main five pillars */}
          <div
            className={`flex md:flex-row flex-col  w-full mx-auto justify-center items-center main_five_pillars py-6 gap-4`}
          >
            {/* Shahadah pillar1 */}
            <div className='group w-4/5 shahdah'>
              <div
                className={`Shahadah ${style.Shahadah} bg-[#5c2b00] border-2 border-white border-dashed flex flex-col justify-center items-center py-10  rounded-md text-white my-2`}
              >
                <i className='text-6xl fa-hand-pointer fa-regular'></i>
              </div>
              <p
                className={`${style.name_of_pillar_in_arab} group-hover:text-[#ff9822] transition-all duration-300 `}
              >
                Shahadah
              </p>
              <p className={`text-[#ff9822] ${style.pillar_name_in_en}`}>
                (Faith)
              </p>
            </div>
            {/* salah pillar2 */}
            <div className='group w-4/5 salah'>
              <div
                className={`salah ${style.salah} bg-[#5c2b00] border-2 border-white border-dashed flex flex-col justify-center items-center py-10  rounded-md text-white my-2`}
              >
                <i className='text-6xl fa-person-praying fa-solid'></i>
              </div>
              <p
                className={`${style.name_of_pillar_in_arab} group-hover:text-[#ff9822] transition-all duration-300 `}
              >
                Salah
              </p>
              <p className={`text-[#ff9822] ${style.pillar_name_in_en}`}>
                (Prayer)
              </p>
            </div>

            {/* sawam pillar3 */}
            <div className='group w-4/5 sawam'>
              <div
                className={`sawam ${style.sawam} bg-[#5c2b00] border-2 border-white border-dashed flex flex-col justify-center items-center py-10  rounded-md text-white my-2`}
              >
                <i className='text-6xl fa-solid fa-star-and-crescent'></i>
              </div>
              <p
                className={`${style.name_of_pillar_in_arab} group-hover:text-[#ff9822] transition-all duration-300 `}
              >
                Sawam
              </p>
              <p className={`text-[#ff9822] ${style.pillar_name_in_en}`}>
                (Fasting)
              </p>
            </div>

            {/* zakat pillar4 */}
            <div className='group w-4/5 zakat'>
              <div
                className={`zakat ${style.zakat} bg-[#5c2b00] border-2 border-white border-dashed flex flex-col justify-center items-center py-10 rounded-md text-white my-2`}
              >
                <i className='text-6xl fa-sack-dollar fa-solid'></i>
              </div>
              <p
                className={`${style.name_of_pillar_in_arab} group-hover:text-[#ff9822] transition-all duration-300 `}
              >
                Zakat
              </p>
              <p className={`text-[#ff9822] ${style.pillar_name_in_en}`}>
                (Almsgiving)
              </p>
            </div>
            {/* hajj pillar5 */}
            <div className='group w-4/5 hajj'>
              <div
                className={`hajj ${style.hajj} bg-[#5c2b00] border-2 border-white border-dashed flex flex-col justify-center items-center py-10  rounded-md text-white my-2`}
              >
                <i className='text-6xl fa-kaaba fa-solid'></i>
              </div>
              <p
                className={`${style.name_of_pillar_in_arab} group-hover:text-[#ff9822] transition-all duration-300 `}
              >
                Hajj
              </p>
              <p className={`text-[#ff9822] ${style.pillar_name_in_en}`}>
                (Pilgrimage)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
// #FF9822
// #5c2b00
