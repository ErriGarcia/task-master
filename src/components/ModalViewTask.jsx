import { useState } from 'react'
import Status from './reusableComponents/Status'
import Modal from './reusableComponents/Modal'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const ModalViewTask = ({modal, setModal, currentTask}) => {

    const [check, setCheck] = useState(false)
    const [moreOptions, setMoreOptions] = useState(false)
    const [modalEditTask, setModalEditTask] = useState(false)
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [inputTitleTask, setInputTitleTask] = useState(currentTask.title)
    const [textAreaDescription, setTextAreaDescription] = useState(currentTask.description)
    const [subtasks, setSubtasks] = useState(currentTask.subtasks || [])

    const handleSubtaskForm = () => {
        setCheck(!check)
    }

    const handleClickCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
    }

    const handleClickEvPreventDefault = (ev) => {
        ev.preventDefault()
    }

    const handleClickMoreOptions = () => {
        setMoreOptions(true)
    }

    const handleClickEditTask = () => {
        setModalEditTask(true)
    }

    const handleClickDeleteTask = () => {
        setModalDeleteTask(true)
    }
    
    const handleInputTitleChange = (ev) => {
        setInputTitleTask(ev.target.value)
    }

    const handleTextAreaDescriptionChange = (ev) => {
        setTextAreaDescription(ev.target.value)
    }

    const updateTask = (ev) => {
        ev.preventDefault()
        api.task.updateById(currentTask.id, inputTitleTask, textAreaDescription)
    }

    const handleDeleteTask = (ev) => {
        ev.preventDefault()
        api.task.deleteById(currentTask.id)
    }

    const listOfSubtasks = currentTask.subtasks.map((subtask, i) => {
        return ( <li key={i} className='container-view-task-subtasks-list-subtask' onChange={handleSubtaskForm}>
            <input type='checkbox' id={subtask.title} name={subtask.title}></input>
            <label htmlFor={subtask.title} className={subtask.isCompleted ? 'checked' : null}>
            {subtask.title}</label>
            </li>)
    })

    return (
        <>
            {modal && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <form className='container-view-task' onClick={handleClickEvPreventDefault}>
                        <fieldset className='container-view-task-header'>
                            <h2 className='container-view-task-header-title'>{currentTask.title}</h2>
                            <button title='Edit Task' className='container-view-task-header-more-options-button' onClick={handleClickMoreOptions}>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                            {moreOptions && (
                                <div className='more-options-container'>
                                    <button title='Edit task' className='more-options-container-edit-button' onClick={handleClickEditTask}>
                                        <i className='fa-regular fa-pen-to-square more-options-container-edit-button-icon'></i>
                                        Edit Task
                                    </button>
                                    <button title='Delete task' className='more-options-container-delete-button'
                                        onClick={handleClickDeleteTask}>
                                        <i className='fa-regular fa-trash-can more-options-container-delete-button-icon'></i>
                                        Delete Task
                                    </button>
                                </div>
                            )}
                        </fieldset>
                        <p className='container-view-task-description'>
                            {currentTask.description}
                        </p>
                        <fieldset>
                            <h3 className='container-view-task-title-subtasks'>Subtasks</h3>
                            <ul className='container-view-task-subtasks-list'>
                                    {listOfSubtasks}
                            </ul>
                        </fieldset>
                        <Status></Status>
                    </form>
                </div>
            )}

            {modalEditTask && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <Modal 
                        title='Edit Task' 
                        labelTitle='Title' 
                        labelDescription='Descritpion' 
                        buttonText='Update Task' 
                        handleClickForm={updateTask} 
                        valueInputTitle={inputTitleTask} 
                        handleInputChange={handleInputTitleChange} 
                        valueTextAreaDescription={textAreaDescription} 
                        handleTextAreaChange={handleTextAreaDescriptionChange}
                        // titleSubtask={titlesSubtask}
                        subtasks={subtasks}
                    >
                    </Modal>
                </div>
            )}

            {modalDeleteTask && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <ModalDelete 
                        title='Delete this task?' 
                        content={`Are you sure you want to delete the "${currentTask.title}" task and its subtasks? This action cannot be reversed.`}
                        handleDeleteClick={handleDeleteTask}
                    >
                    </ModalDelete>
                </div>
            )}
        </>
    )
}

export default ModalViewTask