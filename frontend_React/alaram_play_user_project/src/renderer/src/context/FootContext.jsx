import { createContext, useEffect, useState } from 'react'
import { NodeId, path } from "./path/myPath";

export const FootContext = createContext({})
export const FootProvider = ({ children }) => {
  const [news, setNews] = useState([])
  const NewsDataOnSubmit = async () => {
    await fetch(`${path}/api/newsList/${localStorage.getItem('node')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setNews(res.data)
      })
  }

  useEffect(() => {
    NewsDataOnSubmit()
  }, [])



  return (
    <FootContext.Provider
      value={{
        news,
        setNews,
        NewsDataOnSubmit
      }}
    >
      {children}
    </FootContext.Provider>
  )
}
