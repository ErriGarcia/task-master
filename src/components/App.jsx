import { useEffect, useState } from 'react'
import api from '../services/api/index'
import '../styles/App.scss'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function App() {

  const [allBoards, setAllBoards] = useState([api.board.getAll()])
  const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[0])
  const [titleBoard, setTitleBoard] = useState(currentBoard.name)

  const [currentColumn, setCurrentColumn] = useState('')
  const [columnNames, setColumnNames] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [previousColumn, setPreviousColumn] = useState('')
  const [columnList, setColumnList] = useState([])

  const [modal, setModal] = useState(false)
  const [modalEditBoard, setModalEditBoard] = useState(false)
  const [modalSelectBoard, setModalSelectBoard] = useState(false)

  const [allTasks, setAllTasks] = useState([api.task.getAll(currentBoard)])
  const [currentTask, setCurrentTask] = useState('')
  
  const [subtaskList, setSubtaskList] = useState([])

  useEffect(() => {
    setPreviousColumn(api.column.getByName(currentTask.status))
    
  }, [currentTask.status])

  const handleClickBoard = (ev) => {
    const { id } = ev.currentTarget
    setCurrentBoard(api.board.getById(id))
    setTitleBoard(api.board.getById(id).name)
    setModalSelectBoard(false)
  }

  const handleGetCurrentColumn = (ev) => {
    const { id } = ev.target
    setCurrentColumn(api.column.getById(id))
  }

  const handleArticleClick = (ev) => {
    const { id } = ev.currentTarget
    setModal(true)
    setCurrentTask(api.task.getById(id))
  }

  const updateBoard = (ev) => {
    ev.preventDefault()
    api.board.updateById(currentBoard.id, titleBoard)
    api.column.updateById(currentColumn.id, columnNames[currentColumn.id])
    api.column.updateAll(columnNames)
    api.column.create(currentBoard, columnList)

    const updatedBoards = api.board.getAll()
    const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
    setCurrentBoard(updatedBoards[indexOfBoard])

    setModalEditBoard(false)
  }

  return (
    <div className='main'>
      <Header 
        allBoards={allBoards}
        setAllBoards={setAllBoards}
        currentBoard={currentBoard} 
        handleClickBoard={handleClickBoard}
        handleGetCurrentColumn={handleGetCurrentColumn}
        updateBoard={updateBoard}
        titleBoard={titleBoard}
        setTitleBoard={setTitleBoard}
        columnNames={columnNames}
        setColumnNames={setColumnNames}
        setModal={setModal}
        modalEditBoard={modalEditBoard}
        setModalEditBoard={setModalEditBoard}
        setCurrentBoard={setCurrentBoard}
        columnList={columnList}
        setColumnList={setColumnList}
        subtaskList={subtaskList}
        setSubtaskList={setSubtaskList}
        modalSelectBoard={modalSelectBoard}
        setModalSelectBoard={setModalSelectBoard}
      >
      </Header>
      <Main 
        currentBoard={currentBoard}
        modal={modal}
        setModal={setModal}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleArticleClick={handleArticleClick}
        setCurrentBoard={setCurrentBoard}
        subtaskList={subtaskList}
        setSubtaskList={setSubtaskList}
        setModalEditBoard={setModalEditBoard}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      >
      </Main>
      <Footer></Footer>
    </div>
  )
}

export default App