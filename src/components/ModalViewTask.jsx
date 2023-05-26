import { useState } from 'react'
import data from '../services/data.json'
import Status from './reusable components/Status'

const ModalViewTask = ({modal, setModal}) => {

    const [check, setCheck] = useState(false)

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

    const handleClickMoreActions = () => {
        //little modal
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
                            <button onClick={handleClickMoreActions}>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
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
        </>
    )
}

export default ModalViewTask