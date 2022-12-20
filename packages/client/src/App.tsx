import { useEffect } from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SigninPage } from './pages/SigninPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    // fetchServerData()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
