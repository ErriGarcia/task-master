import { useState } from 'react'
import data from '../services/data.json'

const ModalViewTask = ({modal, setModal}) => {

    const [check, setCheck] = useState(false)

    const firstColumn = data.boards[0].columns
    console.log()

    const handleSubtaskForm = () => {
        setCheck(!check)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
    }

    const listOfSubtasks = firstColumn[0].tasks[0].subtasks.map((subtask, i) => {
        return ( <div key={i} className='container-view-task-subtasks-list-subtask' onChange={handleSubtaskForm}>
            <input type='checkbox' id={subtask.title} name={subtask.title} checked={subtask.isCompleted ? 'checked' : check}></input>
            <label htmlFor={subtask.title} className={subtask.isCompleted ? 'checked' : null}>
            {subtask.title}</label>
            </div>)
    })

    const listOfStatusName = firstColumn.map((statusName, i) => {
        return <option key={i} value={statusName.name}>{statusName.name}</option>
    })

    return (
        <>
            {modal && (
                <div className='modal' onClick={handleCloseModal}>
                    <div className='container-view-task'>
                        <h2 className='container-view-task-title'>{firstColumn[0].tasks[0].title}</h2>
                        <p className='container-view-task-description'>
                            {/* {firstColumn[0].tasks[0].description} */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi alias assumenda blanditiis reprehenderit tempora cum magni nesciunt illo vero eum iure dolorum amet, eius repellendus pariatur quasi earum quia laudantium.
                        </p>
                        <section>
                            <h3 className='container-view-task-title-subtasks'>Subtasks</h3>
                            <ul>
                                <li className='container-view-task-subtasks-list'>
                                    {listOfSubtasks}
                                </li>
                            </ul>
                        </section>
                        <section className='container-view-task-section'>
                            <label htmlFor='status' className='container-view-task-section-status-title'>Current status</label>
                            <select name='status' id='status' className='container-view-task-section-select'>
                                {listOfStatusName}
                            </select>
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalViewTask