import { useState } from 'react'
import data from '../services/data.json'
import Status from './reusableComponents/Status'
import Modal from './reusableComponents/Modal'

const ModalViewTask = ({modal, setModal}) => {

    const [check, setCheck] = useState(false)
    const [moreOptions, setMoreOptions] = useState(false)
    const [modalEditTask, setModalEditTask] = useState(false)

    const firstColumn = data.boards[0].columns

    const handleSubtaskForm = () => {
        setCheck(!check)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
    }

    const handleEvPreventDefault = (ev) => {
        ev.preventDefault()
    }

    const handleClickMoreOptions = () => {
        setMoreOptions(true)
    }

    const handleEditTask = () => {
        setModalEditTask(true)
    }

    const listOfSubtasks = firstColumn[0].tasks[0].subtasks.map((subtask, i) => {
        return ( <div key={i} className='container-view-task-subtasks-list-subtask' onChange={handleSubtaskForm}>
            <input type='checkbox' id={subtask.title} name={subtask.title} checked={subtask.isCompleted ? 'checked' : check}></input>
            <label htmlFor={subtask.title} className={subtask.isCompleted ? 'checked' : null}>
            {subtask.title}</label>
            </div>)
    })

    return (
        <>
            {modal && (
                <div className='modal' onClick={handleCloseModal}>
                    <form className='container-view-task' onClick={handleEvPreventDefault}>
                        <fieldset className='container-view-task-header'>
                            <h2 className='container-view-task-header-title'>{firstColumn[0].tasks[0].title}</h2>
                            <button title='Edit Task' className='container-view-task-header-more-options-button' onClick={handleClickMoreOptions}>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                            {moreOptions && (
                                //finish the modal options
                                // <Modal title='Edit Task' labelTitle='Title' labelDescription='Descritpion'></Modal>
                                <div className='more-options-container'>
                                    <button className='more-options-container-edit-button' onClick={handleEditTask}>
                                        <span className='material-symbols-outlined more-options-container-edit-button-icon'>
                                            edit
                                        </span>
                                        Edit Task
                                    </button>
                                </div>
                            )}
                        </fieldset>
                        <p className='container-view-task-description'>
                            {/* {firstColumn[0].tasks[0].description} */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi alias assumenda blanditiis reprehenderit tempora cum magni nesciunt illo vero eum iure dolorum amet, eius repellendus pariatur quasi earum quia laudantium.
                        </p>
                        <fieldset>
                            <h3 className='container-view-task-title-subtasks'>Subtasks</h3>
                            <ul>
                                <li className='container-view-task-subtasks-list'>
                                    {listOfSubtasks}
                                </li>
                            </ul>
                        </fieldset>
                        <Status></Status>
                    </form>
                </div>
            )}

            {modalEditTask && (
                <div className='modal' onClick={handleCloseModal}>
                    <Modal title='Edit Task' labelTitle='Title' labelDescription='Descritpion'></Modal>
                </div>
            )}
        </>
    )
}

export default ModalViewTask