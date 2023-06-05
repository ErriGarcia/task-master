import { useState } from 'react'
import ModalViewTask from './ModalViewTask'
import api from '../services/api/index'

const Main = ({currentBoard, currentColumn}) => {

    const [currentTask, setCurrentTask] = useState()
    const [modal, setModal] = useState(false)
    
    const handleArticleClick = (ev) => {
        const { id } = ev.currentTarget
        setModal(true)
        setCurrentTask(api.task.getById(id))
    }

    const listColumns = currentBoard.columns.map((column, index) => {
        return (
            <section key={index} className='main-board-section'>
                <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul>
                        {column.tasks.map((task, index) => {
                            return (
                                <li className='main-board-section-list' id={task.id} key={index} onClick={handleArticleClick}>
                                    <article className='main-board-section-list-article'>
                                        <h3>{task.title}</h3>
                                    </article>
                                </li>)
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
                    currentTask={currentTask}
                >
                </ModalViewTask>
                )
            }
        </>
    )
}

export default Main