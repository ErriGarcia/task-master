import { useState } from 'react'
import '../styles/App.scss'
import Header from './Header'
import Main from './Main'
import api from '../services/api/index'

function App() {

  const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[0])

  const handleClickBoard = (ev) => {
        const { id } = ev.currentTarget
        setCurrentBoard(api.board.getById(id))
    }

  return (
    <div className='main'>
      <Header currentBoard={currentBoard} handleClickBoard={handleClickBoard}></Header>
      <Main currentBoard={currentBoard}></Main>
    </div>
  )
}

export default App