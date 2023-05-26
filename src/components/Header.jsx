import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import data from '../services/data.json'
import { useState } from 'react'
import ModalAddTask from './ModalAddTask'

const Header = () => {

    const [modal, setModal] = useState(false)

    const handleAddTask = () => {
        setModal(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
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
                <button>
                    <i className='fa-solid fa-ellipsis-vertical'></i>
                </button>
            </div>
      </header>
      {modal && (
        <div className='modal' onClick={handleCloseModal}>
            <ModalAddTask></ModalAddTask>
        </div>
      )}
      </>
    )
}

export default Header