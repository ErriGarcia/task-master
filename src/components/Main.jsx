import { useState } from 'react'
import ModalViewTask from './ModalViewTask'
import api from '../services/api/index'

const Main = ({currentBoard, modal, setModal, currentTask, handleArticleClick, statusCurrentTask, setStatusCurrentTask, defaultColumn, setCurrentBoard, currentColumn}) => {

    const [currentSubtask, setCurrentSubtask] = useState('')

    const handleGetCurrentSubtask = (ev) => {
        const { id } = ev.target
        setCurrentSubtask(api.subtask.getById(id))
    }

    const dragStarted = (ev, id) => {
        console.log('drag has started')
        ev.dataTransfer.setData("test", id)
    }

    const draggingOver = (ev) => {
        ev.preventDefault()
        console.log('dragging over')
    }

    const dragDropped = (ev) => {
        ev.preventDefault()
        let transferTestId = ev.dataTransfer.getData("test")
        console.log(transferTestId)
    }

    const listColumns = currentBoard.columns.map((column, index) => {
        return (
            <section 
                key={index} className='main-board-section'
                onDragOver={(ev) => draggingOver(ev)} 
                onDrop={(ev) => dragDropped(ev)}
                >
                <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul 
                    className='main-board-section-list' 
                >
                        {column.tasks.map((task, index) => {
                            return (
                                <li 
                                    draggable
                                    onDragStart={ev => dragStarted(ev, column.id)}
                                    id={task.id} 
                                    key={index} 
                                    onClick={handleArticleClick}
                                >
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
                    statusCurrentTask={statusCurrentTask}
                    setStatusCurrentTask={setStatusCurrentTask}
                    defaultColumn={defaultColumn}
                    setCurrentBoard={setCurrentBoard}
                    currentColumn={currentColumn}
                >
                </ModalViewTask>
            )}
        </>
    )
}

export default Main