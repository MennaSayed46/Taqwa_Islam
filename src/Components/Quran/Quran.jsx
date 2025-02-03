import React, { useContext, useEffect, useState } from 'react'
import style from './Quran.module.css'
import axios from 'axios'
import { div } from 'motion/react-client'
import { QuranContext } from '../../Context/QuranContext'

export default function Quran () {

  let {dataQuran,setDataQuran}=useContext(QuranContext);

  return (
    <>
      <section className={`quran w-full ${style.quranSection} py-4`}>
        <div className={`flex flex-col mx-auto w-4/5 ${style.quranContent} `}>
          <p
            className={`${style.QuranTitle} text-center my-8 py-2  relative text-white`}
          >
            Quran
          </p>
          {dataQuran.map(surah => (
            <div
              key={surah.number}
              className={`relative flex flex-col justify-cenetr items-center bg-white my-1 ${style.surah}`}
            >
              <p dir='rtl' className={`${style.nameOfSurahInArabic}`}>
                {surah.number}. {surah.name.long}
              </p>
              <p dir='ltr'>
                {surah.number}. {surah.name.transliteration.id}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
