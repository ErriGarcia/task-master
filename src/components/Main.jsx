import { useState } from 'react'
import ModalViewTask from './ModalViewTask'
import api from '../services/api/index'

const Main = ({currentBoard, modal, setModal, currentTask, handleArticleClick, statusCurrentTask, setStatusCurrentTask, defaultColumn}) => {

    const [currentSubtask, setCurrentSubtask] = useState('')

    const handleGetCurrentSubtask = (ev) => {
        const { id } = ev.target
        setCurrentSubtask(api.subtask.getById(id))
    }

    const listColumns = currentBoard.columns.map((column, index) => {
        return (
            <section 
                key={index} className='main-board-section'
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
                onDrop={e => console.log('onDrop')}
                >
                <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul className='main-board-section-list'>
                        {column.tasks.map((task, index) => {
                            return (
                                <li 
                                    draggable={true}
                                    onDragStart={e => console.log('onDragStart')}
                                    onDragEnd={e => console.log('onDragEnd')} 
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
                >
                </ModalViewTask>
            )}
        </>
    )
}

export default Main