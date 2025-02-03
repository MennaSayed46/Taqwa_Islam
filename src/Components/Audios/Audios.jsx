
import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Audios.module.css'
import { QuranContext } from '../../Context/QuranContext'
import axios from 'axios'

export default function Audios () {
  const { dataQuran } = useContext(QuranContext)
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [selectedSurah, setSelectedSurah] = useState(1)
  const [verses, setVerses] = useState([])
  const [currentSurahName, setCurrentSurahName] = useState('سورة الفاتحة')
  const [tafseer, setTafseer] = useState({
    verseNumber: null,
    text: null
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentlyPlayingVerse, setCurrentlyPlayingVerse] = useState(null)
  const [error, setError] = useState(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const audioRef = useRef(new Audio())
  const queueRef = useRef([])

  const getAyahsOfSpecificSurah = async () => {
    try {
      let response = await axios.get(
        `https://api.quran.gading.dev/surah/${selectedSurah}`
      )
      setVerses(response.data.data.verses)
      setCurrentSurahName(response.data.data.name.long)
      setTafseer({ verseNumber: null, text: null })
      // Reset audio state when changing surah
      stopPlayback()
    } catch (error) {
      console.log('Error getting ayahs from specific surah:', error)
    }
  }

  const getTafseer = async verseKey => {
    try {
      if (tafseer.verseNumber === verseKey) {
        setTafseer({ verseNumber: null, text: null })
      } else {
        const response = await axios.get(
          `https://api.quran.gading.dev/surah/${selectedSurah}/${verseKey}/tafsirs/1`
        )
        setTafseer({
          verseNumber: verseKey,
          text: response.data.data.text
        })
      }
    } catch (error) {
      console.error('Error fetching tafseer:', error)
      setTafseer({ verseNumber: null, text: null })
    }
  }

  useEffect(() => {
    getAyahsOfSpecificSurah()
  }, [selectedSurah])

  const stopPlayback = () => {
    audioRef.current.pause()
    setIsPlaying(false)
    setCurrentlyPlayingVerse(null)
    setAutoPlay(false)
    queueRef.current = []
  }

  const playNextVerse = async () => {
    if (queueRef.current.length === 0) {
      stopPlayback()
      return
    }

    const nextVerse = queueRef.current.shift()
    try {
      audioRef.current.src = nextVerse.audio.primary || nextVerse.audio
      await audioRef.current.load()
      await audioRef.current.play()
      setIsPlaying(true)
      setCurrentlyPlayingVerse(nextVerse.number.inSurah)
      setError(null)
    } catch (err) {
      console.error('Error playing audio:', err)
      setError('failling in playing the sound')
      playNextVerse() // Skip to next verse on error
    }
  }

  useEffect(() => {
    audioRef.current.onended = () => {
      if (autoPlay) {
        playNextVerse()
      } else {
        setIsPlaying(false)
        setCurrentlyPlayingVerse(null)
      }
    }

    return () => {
      audioRef.current.onended = null
    }
  }, [autoPlay])

  const playFromVerse = async startVerse => {
    stopPlayback()

    // Create queue starting from selected verse
    const startIndex = verses.findIndex(
      v => v.number.inSurah === startVerse.number.inSurah
    )
    queueRef.current = verses.slice(startIndex)

    setAutoPlay(true)
    await playNextVerse()
  }

  const togglePlayPause = async verse => {
    if (currentlyPlayingVerse === verse.number.inSurah && isPlaying) {
      stopPlayback()
    } else {
      await playFromVerse(verse)
    }
  }

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen)
  }

  // Generate array of verse numbers
  const verseNumbers = verses.map(verse => verse.number.inSurah)

  return (
    <>
      <section
        className={`${style.audiosOfQuran} w-full relative mb-12 md:my-2 min-h-screen overflow-ellipsis`}
      >
        {/* Sidebar Section for Large Screens */}
        <section
          className={`${style.leftSideBar} text-white lg:flex hidden z-10 flex-row absolute bg-[#353a40] left-0 top-0 md:w-1/4 w-3/4`}
        >
          <div className={`left py-4 border-r-2 border-r-slate-700 w-full md:w-3/4 max-h-screen overflow-auto ${style.container}`}>
            <p className={`${style.titleSideBar} text-center`}>Surahs</p>
            {dataQuran.map(surah => (
              <div
                key={surah.number}
                className={`relative my-1 ${style.surah} hover:bg-[#212429] px-2 py-1 rounded-md text-center cursor-pointer`}
                onClick={() => setSelectedSurah(surah.number)}
              >
                <p dir='ltr'>
                  {surah.number}. {surah.name.transliteration.id}
                </p>
              </div>
            ))}
          </div>
          <div className={`right bg-[#353a40] mx-2 py-4 w-3/4 md:w-1/4 max-h-screen overflow-auto ${style.container}`}>
            <p className={`${style.titleSideBar} text-center mb-4`}>
              Verses ({verseNumbers.length})
            </p>
            <div className='flex flex-col gap-2'>
              {verseNumbers.map(number => (
                <div
                  key={number}
                  className={`text-center p-2 rounded cursor-pointer transition-all duration-200 ${
                    currentlyPlayingVerse === number
                      ? 'bg-[#212429]'
                      : 'hover:bg-[#212429]'
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quran Content Section */}
        <section className={`right-0 z-0 absolute bg-[#202125] py-12 w-full lg:w-3/4 max-h-screen overflow-auto qurancontent ${style.containerContent}`}>
          {/* Toggle Button for Small Screens */}
          <button
            onClick={toggleSideBar}
            className='block lg:hidden bg-[#5c2b00] mx-2 px-3 py-1 rounded-sm text-white'
          >
            {sideBarOpen ? '×' : '☰'}
          </button>

          {/* Mobile Sidebar */}
          {sideBarOpen && (
            <section className='top-0 left-0 z-20 absolute flex flex-row justify-between lg:hidden bg-[#353a40] my-1 py-10 w-3/4 md:w-1/2 max-h-screen text-white transition-all duration-300 overflow-auto ease-in-out'>
              <div className='left py-4 border-r-2 border-r-slate-700 w-full md:w-3/4 max-h-screen text-white overflow-auto'>
                <p className={`${style.titleSideBar} text-center`}>Surahs</p>
                {dataQuran.map(surah => (
                  <div
                    key={surah.number}
                    className={`relative my-1 ${style.surah} hover:bg-[#212429] px-2 py-1 rounded-md text-center cursor-pointer`}
                    onClick={() => {
                      setSelectedSurah(surah.number)
                      setSideBarOpen(false)
                    }}
                  >
                    <p dir='ltr' className=''>
                      {surah.number}. {surah.name.transliteration.id}
                    </p>
                  </div>
                ))}
              </div>
              <div className='right bg-[#353a40] mx-2 py-4 w-3/4 md:w-1/4 max-h-screen overflow-auto'>
                <div className='flex flex-row justify-between items-center'>
                  <p className={`${style.titleSideBar} text-center`}>
                    Verses ({verseNumbers.length})
                  </p>
                  <button
                    onClick={toggleSideBar}
                    className='bg-[#323232] px-3 py-2'
                  >
                    ×
                  </button>
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                  {verseNumbers.map(number => (
                    <div
                      key={number}
                      className={`text-center p-2 rounded cursor-pointer transition-all duration-200 ${
                        currentlyPlayingVerse === number
                          ? 'bg-red-600'
                          : 'hover:bg-[#212429]'
                      }`}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <p
            className={`text-center text-white ${style.QuranTitle} py-4 relative`}
          >
            {currentSurahName}
          </p>

          {/* Verses Section */}
          <div className='max-h-screen'>
            {verses.map(verse => (
              <div
                key={verse.number.inQuran}
                className={`flex flex-row justify-between items-center my-8 px-4 py-4 text-white ayah max-h-screen overflow-auto`}
              >
                {/* left icons */}
                <div className='flex flex-col justify-center items-center text-[#777] icons'>
                  <p className='hover:bg-[#495058] p-2 rounded-[50%] transition-all duration-150 surah_to_ayah'>
                    {verse.number.inSurah}
                  </p>

                  <button
                    className='hover:bg-[#495058] p-2 rounded-full transition-all duration-150'
                    onClick={() => togglePlayPause(verse)}
                  >
                    <i
                      className={`fa-solid ${
                        currentlyPlayingVerse === verse.number.inSurah &&
                        isPlaying
                          ? 'fa-pause'
                          : 'fa-play'
                      }`}
                    ></i>
                  </button>

                  <p
                    className='hover:bg-[#495058] p-2 rounded-[50%] transition-all duration-150 cursor-pointer tafsir'
                    onClick={() => getTafseer(verse.number.inSurah)}
                  >
                    <i className='fa-book-open fa-solid'></i>
                  </p>
                </div>

                <div className='w-full specific_ayah'>
                  <p dir='rtl' className='my-2'>
                    {verse.text.arab}{' '}
                    <span className='bg-[#777] mx-1 p-2 rounded-[50%]'>
                      {verse.number.inSurah}
                    </span>
                  </p>
                  <p dir='ltr' className='my-2'>
                    {verse.text.transliteration.en}
                  </p>
                  {tafseer.verseNumber === verse.number.inSurah &&
                    tafseer.text && (
                      <div className='bg-[#2a2d31] mt-4 p-4 rounded-md'>
                        <p dir='rtl' className='text-sm'>
                          {tafseer.text}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  )
}
