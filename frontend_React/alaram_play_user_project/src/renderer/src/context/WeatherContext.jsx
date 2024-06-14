import { createContext, useEffect, useState } from 'react'
import { path } from './path/myPath'

export const WeatherContext = createContext({})
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState([])
  const WeatherOnSubmitData = async () => {
    await fetch(`${path}/api/witem`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setWeather(res.data)
      })
  }

  useEffect(() => {
    WeatherOnSubmitData();
  }, [])

  let temp = [] //기온
  let pty = [] //강수량 코드 //0없음 ,1. 비 ,2. 비/눈, 3. 눈,  5.빗방울, 6. 빗방울 눈날림, 7.눈날림
  let sky = [] //하늘상태 코드값
  let pop = [] ; //%

  for (let i = 0; i < weather.length; i++) {
    if (weather[i].category === 'TMP') {
      temp.push(weather[i])
    }
    if (weather[i].category === 'PTY') {
      pty.push(weather[i])
    }
    if (weather[i].category === 'SKY') {
      sky.push(weather[i])
    }
    if(weather[i].category === 'POP'){
      pop.push(weather[i])
    }
  }

  return (
    <WeatherContext.Provider
      value={{
        WeatherOnSubmitData,
        weather,
        setWeather,
        temp,
        pty,
        sky,
        pop
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
