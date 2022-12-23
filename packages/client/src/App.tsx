import { useEffect } from 'react'
import MainPage from './pages/MainPage/MainPage'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      Вот тут будет жить ваше приложение :)
      <MainPage />
    </div>
  )
}

export default App
