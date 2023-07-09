import { useEffect, useState } from 'react'
import Modal from './reusableComponents/Modal'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const ModalViewTask = ({
    modal, 
    setModal, 
    currentBoard, 
    currentTask,
    handleGetCurrentSubtask, 
    setCurrentBoard,
    subtaskList,
    setSubtaskList,
    currentSubtask
}) => {

    const [modalMoreOptions, setModalMoreOptions] = useState(false)
    const [modalEditTask, setModalEditTask] = useState(false)
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [inputTitleTask, setInputTitleTask] = useState(currentTask.title || '')
    const [textAreaDescription, setTextAreaDescription] = useState(currentTask.description)
    const [subtasks, setSubtasks] = useState(currentTask.subtasks || [])
    const [inputSubtasksNames, setInputSubtasksNames] = useState({})

    useEffect(() => {
        const subtasksDetails = {}
        for (const subtask of currentTask.subtasks) {
            subtasksDetails[subtask.id] = subtask.title
        }
        setInputSubtasksNames(subtasksDetails)
    }, [currentTask.subtasks, subtasks.id])

    const handleClickSubtask = (ev) => {
        ev.preventDefault()
        const { id } = ev.target
        const currentSubtask = api.subtask.getById(id)
        const newSubtaskStatus = !currentSubtask.isCompleted
        api.subtask.updateStatus(id, newSubtaskStatus)
        const indexCurrentSubtask = subtasks.findIndex(subtask => subtask.id === currentSubtask.id)
        const updatedSubtasks = [...subtasks]
        updatedSubtasks[indexCurrentSubtask].isCompleted = newSubtaskStatus
        setSubtasks(updatedSubtasks)
        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])
    }

    const handleClickCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
    }

    const handleClickMoreOptions = () => {
        setModalMoreOptions(true)
    }

    const handleClickEditTask = () => {
        setModalEditTask(true)
    }

    const handleClickDeleteTask = () => {
        setModalDeleteTask(true)
    }

    const updateTask = (ev) => {
        ev.preventDefault()
        api.task.updateById(currentTask.id, inputTitleTask, textAreaDescription)
        api.subtask.updateById(currentSubtask.id, inputSubtasksNames[currentSubtask.id])
        api.subtask.create(currentBoard, currentTask, subtaskList)

        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])

        setModal(false)
        setModalEditTask(false)
    }

    const handleUpdateTaskEnterKey = (ev) => {
        if (ev.key === 'Enter') {
            updateTask(ev)
        }
    }

    const handleDeleteTask = (ev) => {
        ev.preventDefault()
        api.task.deleteById(currentTask.id)
        setModal(false)
        setModalDeleteTask(false)
        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])
    }

    const handleCloseDeleteTask = (ev) => {
        setModalDeleteTask(false)
    }

    const handleInputSubtaskName = (ev) => {
        const newInputSubtaskName = {
            ...inputSubtasksNames,
            [ev.target.id]: ev.target.value
        }
        setInputSubtasksNames(newInputSubtaskName)
    }

    const handleDeleteSubtask = (ev) => {
        const { id } = ev.target
        api.subtask.deleteById(id)
        const newInputSubtasksNames = {...inputSubtasksNames}
        delete newInputSubtasksNames[id]
        setInputSubtasksNames(newInputSubtasksNames)
        const updatedSubtasks = api.task.getById(currentTask.id).subtasks
        setSubtasks(updatedSubtasks)
        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])
    }

    const handleStatusTaskChange = (ev) => {
        api.task.changeColumnAndStatus(currentTask.id, ev.target.value)
        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])
        setModal(false)
    }


    const listOfSubtasks = subtasks.map((subtask, i) => {
        return (
            <li 
                key={i} 
                className='container-view-task-subtasks-list-subtask' 
            >
                <input 
                    type='checkbox' 
                    id={subtask.id} 
                    name={subtask.title}
                    onClick={handleClickSubtask}
                >
                </input>
                <label 
                    htmlFor={subtask.id} 
                    className={subtask.isCompleted ? 'checked' : null}
                >
                    {subtask.title}
                </label>
            </li>
        )
    })

    const inputSubtasks = subtasks.map((subtask, i) => {
        return (
            <li className='container-subtasks-list' key={i}>
                <input 
                    type='text' 
                    id={subtask.id} 
                    name='subtasks' 
                    className='input subtask' 
                    placeholder='e.g. Make Coffee' 
                    value={inputSubtasksNames[subtask.id]}
                    onChange={handleInputSubtaskName}
                    onClick={handleGetCurrentSubtask}
                    required
                />
                <button title='Delete Subtask' className='button-delete' onClick={handleDeleteSubtask}>
                    <span className='material-symbols-outlined' id={subtask.id}>
                        delete
                    </span>
                </button>
            </li>
        )
    })

    const listOfColumnNames = currentBoard.columns.map((column, i) => {
        return <option key={i} value={column.name}>{column.name}</option>
    })

    return (
        <>
            {modal && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <form className='container-view-task' 
                        onClick={(ev) => {ev.preventDefault()}}>
                        <fieldset className='container-view-task-header'>
                            <h2 className='container-view-task-header-title'>{currentTask.title}</h2>
                            <button title='Edit Task' className='container-view-task-header-more-options-button' onClick={handleClickMoreOptions}>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                            {modalMoreOptions && (
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
                        <fieldset className='container-view-task-section'>
                            <label 
                                htmlFor='status'
                                className='container-view-task-section-status-title'
                            >
                                Current status
                            </label>
                            <select 
                                name='status' 
                                id='status' 
                                className='container-view-task-section-select'
                                value={currentTask.status} 
                                onChange={handleStatusTaskChange}
                            >
                                {listOfColumnNames}
                            </select>
                        </fieldset>
                    </form>
                </div>
            )}

            {modalEditTask && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <Modal 
                        title='Edit Task' 
                        labelTitle='Title'
                        placeholderTitle='e.g. Make Coffee'
                        valueInputTitle={inputTitleTask}
                        labelDescription='Descritpion'
                        placeholderDescription=''
                        valueTextAreaDescription={textAreaDescription} 
                        buttonText='Update Task' 
                        handleClickForm={ev => ev.preventDefault()} 
                        handleInputChange={ev => setInputTitleTask(ev.target.value)} 
                        handleTextAreaChange={ev => setTextAreaDescription(ev.target.value)}
                        handleSubmitClick={updateTask}
                        inputSubtasks={inputSubtasks}
                        valueSubtask={''}
                        handleSubtaskChange={ev => console.log(ev, 'change input default')}
                        subtaskList={subtaskList}
                        setSubtaskList={setSubtaskList}
                        handleSubmitKeyDown={handleUpdateTaskEnterKey}
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
                        handleCancelClick={handleCloseDeleteTask}
                    >
                    </ModalDelete>
                </div>
            )}
        </>
    )
}

export default ModalViewTask