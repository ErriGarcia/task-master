import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import kanban from '../images/kanban.svg'
import data from '../services/data.json'
import { useEffect, useState } from 'react'
import Modal from '../components/reusableComponents/Modal'
import ModalBoard from './reusableComponents/ModalBoard'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const Header = ({currentBoard, handleClickBoard}) => {

    const [modalNewTask, setModalNewStask] = useState(false)
    const [moreOptionsBoard, setMoreOptionsBoard] = useState(false)
    const [modalEditBoard, setModalEditBoard] = useState(false)
    const [modalDeleteBoard, setModalDeleteBoard] = useState(false)
    const [modalNewBoard, setModalNewBoard] = useState(false)
    const [modalSelectBoard, setModalSelectBoard] = useState(false)
    const [allBoards, setAllBoards] = useState([api.board.getAll()])
    // const [isActive, setIsActive] = useState(false)
    const [newTitleTask, setNewTitleTask] = useState('')
    const [newDescriptionTask, setNewDescriptionTask] = useState('')
    const [column, setColumn] = useState('Todo')
    // const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[0])
    const [newNameBoard, setNewNameBoard] = useState('')
    const [inputTitleBoard, setInputTitleBoard] = useState(currentBoard.name)
    const [inputColumnName, setInputColumnName] = useState('')

    useEffect(() => {
        setAllBoards(api.board.getAll())
    }, [])

    const handleAddTask = () => {
        setModalNewStask(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModalNewStask(false)
            setMoreOptionsBoard(false)
            setModalEditBoard(false)
            setModalDeleteBoard(false)
            setModalNewBoard(false)
            setModalSelectBoard(false)
        }
    }

    const handleClickMoreOptionsBoard = () => {
        setMoreOptionsBoard(true)
    }

    const handleClickEditBoard = () => {
        setMoreOptionsBoard(false)
        setModalEditBoard(true)
    }

    const handleClickDeleteBoard = () => {
        setMoreOptionsBoard(false)
        setModalDeleteBoard(true)
    }

    const handleClickAddNewBoard = () => {
        setMoreOptionsBoard(false)
        setModalSelectBoard(false)
        setModalNewBoard(true)
    }

    const handleClickSelectBoard = () => {
        setMoreOptionsBoard(false)
        setModalSelectBoard(true)
    }

    const handlTitleChange = (ev) => {
        setNewTitleTask(ev.target.value)
    }

    const handleDescriptionChange = (ev) => {
        setNewDescriptionTask(ev.target.value)
    }

    const handleFormClick = (ev) => {
        ev.preventDefault()
    }

    const handleChangeColumn = (ev) => {
        setColumn(ev.target.value)
    }

    const handleCreateTaskClick = () => {
        api.task.create(data.boards[0], newTitleTask, newDescriptionTask, column)
    }

    const handleCreateTitleBoardClick = (ev) => {
        setNewNameBoard(ev.target.value)
    }

    const handleCreateBoardClick = () => {
        api.board.create(newNameBoard)
    }

    const handleInputBoardColumn = (ev) => {
        setInputColumnName(ev.target.value)
    }
    
    // const handleClickBoard = (ev) => {
    //     const { id } = ev.currentTarget
    //     setCurrentBoard(api.board.getById(id))
    // }

    const handleInputTitleChange = (ev) => {
        setInputTitleBoard(ev.target.value)
    }

    const buttonBoardName = allBoards.map((board, index) => {
        return (
            <button className='modal-select-board-buttons-button' key={index} onClick={handleClickBoard} id={board.id}>
                <i className='fa-solid fa-table-columns'></i>
                {board.name}
            </button>
            )
        }
    )

    return (
        <>
        <header className='main-header'>
            <div className='main-header-container-logo'>
                <img src={logo} alt='logo task master'/>
                <img src={kanban} alt='kanban logo' className='main-header-container-logo-kanban'/>
                <div className='main-header-container-logo-container'>
                    <h1 className='main-header-container-logo-container-title'>{currentBoard.name}</h1>
                    <button title='All Boards' className='main-header-container-logo-container-button-down' onClick={handleClickSelectBoard}>
                        <i className='fa fa-chevron-down'></i>
                    </button>
                </div>

            </div>
            <div className='main-header-container-buttons'>
                <button title='Add New Task' className='main-header-container-buttons-button-plus' onClick={handleAddTask}>
                    <i className='fa-solid fa-plus'></i>
                    Add New Task
                </button>
                <button title='More options' onClick={handleClickMoreOptionsBoard} className='main-header-container-buttons-button-more'>
                    <i className='fa-solid fa-ellipsis-vertical'></i>
                </button>
                {moreOptionsBoard && (
                    <div className='modal' onClick={handleCloseModal}>
                        <div className='more-options-board-container'>
                            <button title='Edit board' className='more-options-board-container-edit-button'
                            onClick={handleClickEditBoard}>
                                <i className='fa-regular fa-pen-to-square more-options-board-container-edit-button-icon'></i>
                                Edit Board
                            </button>
                            <button title='Delete board' className='more-options-board-container-delete-button'
                            onClick={handleClickDeleteBoard}>
                                <i className='fa-regular fa-trash-can more-options-board-container-delete-button-icon'></i>
                                Delete Board
                            </button>
                            <button title='Add new board' className='more-options-board-container-add-button'
                            onClick={handleClickAddNewBoard}>
                                <i className='fa-solid fa-plus more-options-board-container-add-button-icon'></i>
                                Add New Board
                            </button>
                        </div>
                    </div>
                )}
            </div>
      </header>
      {modalNewTask && (
        <div className='modal' onClick={handleCloseModal}>
            <Modal 
                title='Add New Task' 
                labelTitle='Title' 
                placeholderTitle='e.g. Take coffee break' 
                labelDescription='Description' 
                placeholderDescription='e.g. It is always good to take a break. This 15 minutes break will recharge the batteries a little.'
                buttonText='Create Task'
                handleClickForm={handleFormClick} 
                valueInputTitle={newTitleTask}
                handleInputChange={handlTitleChange} 
                valueTextAreaDescription={newDescriptionTask} 
                handleTextAreaChange={handleDescriptionChange}
                handleChangeSelect={handleChangeColumn}
                columnName={column}
                handleSubmitClick={handleCreateTaskClick}
                subtasks={[]}>
            </Modal>
        </div>
      )}
      {modalEditBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard 
                title='Edit Board' 
                labelTitle='Board Name' 
                value='Save Changes'
                valueTitle={inputTitleBoard}
                handleTitleChange={handleInputTitleChange}
                handleFormClick={handleFormClick}
            >
            </ModalBoard>
        </div>
      )}
      {modalDeleteBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalDelete 
                title='Delete this board?' 
                content={`Are you sure you want to delete the "${currentBoard.name}" board? This action will remove all columns and tasks and cannot be reversed.`}
            >
            </ModalDelete>
        </div>
      )}
      {modalNewBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard 
                title='Add New Board' 
                labelTitle='Board Name' 
                value='Create New Board'
                valueTitle={newNameBoard}
                handleTitleChange={handleCreateTitleBoardClick}
                handleSubmitClick={handleCreateBoardClick}
                handleFormClick={handleFormClick}
                inputText={inputColumnName}
                handleInputChange={handleInputBoardColumn}
            >
            </ModalBoard>
        </div>
      )}
      {modalSelectBoard && (
            <div className='modal' onClick={handleCloseModal}>
                <div className='modal-select-board'>
                    <h2 className='modal-select-board-title'>all boards ({allBoards.length})</h2>
                    <div className='modal-select-board-buttons'>
                        {buttonBoardName}
                        <button title='Add new board' className='modal-select-board-buttons-button-create'
                        onClick={handleClickAddNewBoard}>
                            <i className='fa-solid fa-table-columns'></i>
                            <i className='fa-solid fa-plus'></i>
                            Create New Board
                        </button>
                    </div>
                </div>
            </div>
      )}
      </>
    )
}

export default Header