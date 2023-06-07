import { useState } from 'react'
import ModalViewTask from './ModalViewTask'
import api from '../services/api/index'

const Main = ({currentBoard, modal, setModal, column, setColumn}) => {

    const [currentTask, setCurrentTask] = useState('')
    const [currentSubtask, setCurrentSubtask] = useState('')
    
    const handleArticleClick = (ev) => {
        const { id } = ev.currentTarget
        setModal(true)
        setCurrentTask(api.task.getById(id))
    }

    const handleGetCurrentSubtask = (ev) => {
        const { id } = ev.target
        setCurrentSubtask(api.subtask.getById(id))
    }

    const listColumns = currentBoard.columns.map((column, index) => {
        return (
            <section key={index} className='main-board-section'>
                <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul className='main-board-section-list'>
                        {column.tasks.map((task, index) => {
                            return (
                                <li id={task.id} key={index} onClick={handleArticleClick}>
                                    <article className='main-board-section-list-article'>
                                        <h3>{task.title}</h3>
                                    </article>
                                </li>
                            )
                        })}
                </ul>
            </section>
        )
    })

    return (
        <>
        <main className='main-board'>
            {listColumns}
        </main>
            {modal && (
                <ModalViewTask 
                    modal={modal} 
                    setModal={setModal} 
                    currentBoard={currentBoard}
                    currentTask={currentTask}
                    currentSubtask={currentSubtask}
                    handleGetCurrentSubtask={handleGetCurrentSubtask}
                    column={column}
                    setColumn={setColumn}
                >
                </ModalViewTask>
            )}
        </>
    )
}

export default Main