import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export let QuranContext = createContext()

export default function QuranContextProvider ({children}) {
  let [dataQuran, setDataQuran] = useState([])
  // calling the funtion of getting the quran
  useEffect(() => {
    getQuran()
  }, [])
  // fucntion of getting the quran
  async function getQuran () {
    try {
      const response = await axios.get('https://api.quran.gading.dev/surah')
      setDataQuran(response.data.data)
      console.log('Quran data:', response.data.data)
    } catch (err) {
      console.error(err)
    }
  }
  return <>
  <QuranContext.Provider value={{dataQuran,setDataQuran}}>
    {children}
  </QuranContext.Provider>
  
  </>
}
