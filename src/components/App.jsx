import { useEffect, useState } from 'react'
import api from '../services/api/index'
import '../styles/App.scss'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { v4 } from 'uuid'

function App() {

  const [allBoards, setAllBoards] = useState([api.board.getAll()])
  const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[0])
  const [currentColumn, setCurrentColumn] = useState('')
  const [inputTitleBoard, setInputTitleBoard] = useState(currentBoard.name)
  const [inputColumnNames, setInputColumnNames] = useState('')
  const [modal, setModal] = useState(false)
  const [modalEditBoard, setModalEditBoard] = useState(false)
  const [modalSelectBoard, setModalSelectBoard] = useState(false)
  const [currentTask, setCurrentTask] = useState('')
  const [statusCurrentTask, setStatusCurrentTask] = useState(currentTask.status)
  const [previousColumn, setPreviousColumn] = useState('')
  const [columnList, setColumnList] = useState([{name: '', id: v4(), tasks: []},])
  const [subtaskList, setSubtaskList] = useState([{title: '', id: v4()},])

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

  const updateBoard = (ev) => {
    ev.preventDefault()
    api.board.updateById(currentBoard.id, inputTitleBoard)
    api.column.updateById(currentColumn.id, inputColumnNames[currentColumn.id])
    setModalEditBoard(false)
    // create a column for each element of columnList
    columnList.forEach(eachColumn => {
      api.column.create(currentBoard, eachColumn.name)
    })
    const updatedBoards = api.board.getAll()
    const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
    setCurrentBoard(updatedBoards[indexOfBoard])
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
      >
      </Main>
      <Footer></Footer>
    </div>
  )
}

export default App