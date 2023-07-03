import { useEffect, useState } from 'react'
import api from '../services/api/index'
import '../styles/App.scss'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function App() {

  const [allBoards, setAllBoards] = useState([api.board.getAll()])
  const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[2])
  const [currentColumn, setCurrentColumn] = useState('')
  const [inputTitleBoard, setInputTitleBoard] = useState(currentBoard.name)
  const [inputColumnNames, setInputColumnNames] = useState('')
  const [modal, setModal] = useState(false)
  const [modalEditBoard, setModalEditBoard] = useState(false)
  const [modalSelectBoard, setModalSelectBoard] = useState(false)
  const [currentTask, setCurrentTask] = useState('')
  const [statusCurrentTask, setStatusCurrentTask] = useState(currentTask.status)
  const [previousColumn, setPreviousColumn] = useState('')
  const [columnList, setColumnList] = useState([])
  const [subtaskList, setSubtaskList] = useState([])
  const [allTasks, setAllTasks] = useState([api.task.getAll(currentBoard)])

  console.log(columnList, 'columnList')

  useEffect(() => {
    setPreviousColumn(api.column.getByName(currentTask.status))
  }, [currentTask.status])

  const handleClickBoard = (ev) => {
    const { id } = ev.currentTarget
    setCurrentBoard(api.board.getById(id))
    setInputTitleBoard(api.board.getById(id).name)
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

  console.log(inputColumnNames, 'inputColumnNames')

  const updateBoard = (ev) => {
    ev.preventDefault()
    api.board.updateById(currentBoard.id, inputTitleBoard)
    api.column.updateById(currentColumn.id, inputColumnNames[currentColumn.id])
    api.column.updateAll(inputColumnNames)
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
        inputTitleBoard={inputTitleBoard}
        setInputTitleBoard={setInputTitleBoard}
        inputColumnNames={inputColumnNames}
        setInputColumnNames={setInputColumnNames}
        setModal={setModal}
        modalEditBoard={modalEditBoard}
        setModalEditBoard={setModalEditBoard}
        setCurrentBoard={setCurrentBoard}
        setCurrentColumn={setCurrentColumn}
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
        currentColumn={currentColumn}
        inputColumnNames={inputColumnNames}
        modal={modal}
        setModal={setModal}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleArticleClick={handleArticleClick}
        statusCurrentTask={statusCurrentTask}
        setStatusCurrentTask={setStatusCurrentTask}
        previousColumn={previousColumn}
        setPreviousColumn={setPreviousColumn}
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