import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import kanban from '../images/kanban.svg'
import data from '../services/data.json'
import { useState } from 'react'
import ModalAddTask from './ModalAddTask'
import ModalBoard from './reusableComponents/ModalBoard'
import ModalDelete from './reusableComponents/ModalDelete'

const Header = () => {

    const [modal, setModal] = useState(false)
    const [moreOptionsBoard, setMoreOptionsBoard] = useState(false)
    const [modalEditBoard, setModalEditBoard] = useState(false)
    const [modalDeleteBoard, setModalDeleteBoard] = useState(false)
    const [modalNewBoard, setModalNewBoard] = useState(false)
    const [modalSelectBoard, setModalSelectBoard] = useState(false)

    const handleAddTask = () => {
        setModal(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
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

    return (
        <>
        <header className='main-header'>
            <div className='main-header-container-logo'>
                <img src={logo} alt='logo task master'/>
                <img src={kanban} alt='kanban logo' className='main-header-container-logo-kanban'/>
                <div className='main-header-container-logo-container'>
                    <h1 className='main-header-container-logo-container-title'>{data.boards[0].name}</h1>
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
                )}
            </div>
      </header>
      {modal && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalAddTask></ModalAddTask>
        </div>
      )}
      {modalEditBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard title='Edit Board' labelTitle='Board Name' value='Save Changes'></ModalBoard>
        </div>
      )}
      {modalDeleteBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalDelete title='Delete this board?' content='Are you sure you want to delete the "Platform Launch" board? This action will remove all columns and tasks and cannot be reversed.'></ModalDelete>
        </div>
      )}
      {modalNewBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard title='Add New Board' labelTitle='Board Name' value='Create New Board'></ModalBoard>
            {/* change name main button */}
        </div>
      )}
      {modalSelectBoard && (
            <div className='modal' onClick={handleCloseModal}>
                <div className='modal-select-board'>
                    <h2 className='modal-select-board-title'>all boards</h2>
                    <div className='modal-select-board-buttons'>
                        <button className='modal-select-board-buttons-button selected'>
                            <i className='fa-solid fa-table-columns'></i>
                            Platform Lunch
                        </button>
                        <button className='modal-select-board-buttons-button'>
                            <i className='fa-solid fa-table-columns'></i>
                            Marketing Plan
                        </button>
                        <button className='modal-select-board-buttons-button'>
                            <i className='fa-solid fa-table-columns'></i>
                            Roadmap
                        </button>
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