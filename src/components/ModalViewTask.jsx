import { useEffect, useState } from 'react'
import Modal from './reusableComponents/Modal'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const ModalViewTask = ({modal, setModal, currentBoard, currentTask, handleGetCurrentSubtask, currentSubtask, statusCurrentTask, setStatusCurrentTask, previousColumn, setPreviousColumn, setCurrentBoard, currentColumn, subtaskList, setSubtaskList, setCurrentTask}) => {

    const [moreOptions, setMoreOptions] = useState(false)
    const [modalEditTask, setModalEditTask] = useState(false)
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [inputTitleTask, setInputTitleTask] = useState(currentTask.title)
    const [textAreaDescription, setTextAreaDescription] = useState(currentTask.description)
    const [subtasks] = useState(currentTask.subtasks || [])
    const [inputSubtasksNames, setInputSubtasksNames] = useState('')
    const [checkedState, setCheckedState] = useState(
        new Array(currentTask.subtasks.length).fill(false)
    )

    useEffect(() => {
        const subtasksDetails = {}
        for (const subtask of currentTask.subtasks) {
            subtasksDetails[subtask.id] = subtask.title
        }
        setInputSubtasksNames(subtasksDetails)
    }, [currentTask.subtasks, subtasks.id])

    const handleCheckChange = (position) => {
        const updateCheckedState = checkedState.map((singleCheckedState, index) => {
            if (index === position) {
                return !singleCheckedState
            } else {
                return singleCheckedState
            }
        })
        setCheckedState(updateCheckedState)
    }

    const handleClickCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
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

    const updateTask = (ev) => {
        ev.preventDefault()
        api.task.updateById(currentTask.id, inputTitleTask, textAreaDescription)
        api.subtask.updateById(currentSubtask.id, inputSubtasksNames[currentSubtask.id])
        setModal(false)
        setModalEditTask(false)

        // console.log(currentColumn, 'currentColumn')
        subtaskList.forEach(eachSubtask => {
            api.subtask.create(currentBoard, currentTask, eachSubtask.title)
        })
        const updatedBoards = api.board.getAll()
         // change to the index of currentBoard
        setCurrentBoard(updatedBoards[0])
    }

    const handleDeleteTask = (ev) => {
        ev.preventDefault()
        api.task.deleteById(currentTask.id)
        setModal(false)
        setModalDeleteTask(false)
        const updatedBoards = api.board.getAll()
         // change to the index of currentBoard
        setCurrentBoard(updatedBoards[0])
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
        api.subtask.deleteById(ev.target.id)
        const newInputSubtaskName = {
            ...inputSubtasksNames,
            [ev.target.id]: ev.target.value
        }
        setInputSubtasksNames(newInputSubtaskName)
    }

    const handleStatusTaskChange = (ev) => {
        api.task.updateStatus(currentTask.id, ev.target.value)
        api.task.changeColumn()
    }


    const listOfSubtasks = currentTask.subtasks.map((subtask, i) => {
        return (
            <li 
                key={i} 
                className='container-view-task-subtasks-list-subtask' 
            >
                <input type='checkbox' 
                    id={subtask.id} 
                    name={subtask.title}
                    checked={checkedState[i]}
                    onChange={() => handleCheckChange(i)}
                >
                </input>
                <label 
                    htmlFor={subtask.id} 
                    className={checkedState[i] ? 'checked' : null}
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
                    onChange={ev => {handleInputSubtaskName(ev); handleGetCurrentSubtask(ev)}}
                />
                <button title='Delete Subtask' className='button-delete' onClick={handleDeleteSubtask} id={subtask.id}>
                    <span className='material-symbols-outlined' id={subtask.id}>
                        delete
                    </span>
                </button>
            </li>
        )
    })

    const listOfStatusName = currentBoard.columns.map((statusName, i) => {
        return <option key={i} value={statusName.name}>{statusName.name}</option>
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
                                // defaultValue={currentTask.status}
                                value={currentTask.status} 
                                onChange={handleStatusTaskChange}
                            >
                                {listOfStatusName}
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