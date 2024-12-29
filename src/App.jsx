import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <a href='/'><button></button></a>
      </header>
      <a href='/musicplayer'><button>MUSIC-PLAYER</button></a>
    </>
  )
}

export default App
