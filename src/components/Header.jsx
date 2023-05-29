import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import data from '../services/data.json'
import { useState } from 'react'
import ModalAddTask from './ModalAddTask'
import ModalBoard from './reusableComponents/ModalBoard'

const Header = () => {

    const [modal, setModal] = useState(false)
    const [moreOptionsBoard, setMoreOptionsBoard] = useState(false)
    const [editBoard, setEditBoard] = useState(false)
    const [newBoard, setNewBoard] = useState(false)

    const handleAddTask = () => {
        setModal(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
            setEditBoard(false)
            setNewBoard(false)
        }
    }

    const handleClickMoreOptionsBoard = () => {
        setMoreOptionsBoard(true)
    }

    const handleClickEditBoard = () => {
        setMoreOptionsBoard(false)
        setEditBoard(true)
    }

    const handleClickAddNewBoard = () => {
        setMoreOptionsBoard(false)
        setNewBoard(true)
    }

    return (
        <>
        <header className='main-header'>
            <div className='main-header-container-logo'>
                <img src={logo} alt='logo task master'/>
                <div className='main-header-container-logo-container'>
                    <h1 className='main-header-container-logo-container-title'>{data.boards[0].name}</h1>
                    <button title='All Boards' className='main-header-container-logo-container-button-down'>
                        <i className='fa fa-chevron-down'></i>
                    </button>
                </div>
            </div>
            <div className='main-header-container-buttons'>
                <button title='Add New Task' className='main-header-container-buttons-button-plus' onClick={handleAddTask}>
                    <i className='fa-solid fa-plus'></i>
                </button>
                <button title='More options' onClick={handleClickMoreOptionsBoard}>
                    <i className='fa-solid fa-ellipsis-vertical'></i>
                </button>
                {moreOptionsBoard && (
                    <div className='more-options-board-container'>
                        <button title='Edit board' className='more-options-board-container-edit-button'
                        onClick={handleClickEditBoard}>
                            <span className='material-symbols-outlined more-options-board-container-edit-button-icon'>
                                edit
                            </span>
                            Edit Board
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
      {editBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard title='Edit Board' labelTitle='Board Name' value='Save Changes'></ModalBoard>
        </div>
      )}
      {newBoard && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalBoard title='Add New Board' labelTitle='Board Name' value='Create New Board'></ModalBoard>
            {/* change name main button */}
        </div>
      )}
      </>
    )
}

export default Header