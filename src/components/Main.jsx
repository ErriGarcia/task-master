import { useState } from 'react'
import ModalViewTask from './ModalViewTask'
import api from '../services/api/index'

const Main = ({
    currentBoard,
    currentColumn,
    modal, 
    setModal, 
    currentTask, 
    setCurrentTask,
    handleArticleClick, 
    statusCurrentTask, 
    setStatusCurrentTask, 
    previousColumn, 
    setPreviousColumn, 
    setCurrentBoard, 
    subtaskList, 
    setSubtaskList, 
    setModalEditBoard, 
    allTasks, 
    setAllTasks}) => {

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
        setAllTasks([...allTasks, transferTestId])
    }

    const listColumns = currentBoard.columns.map((column, index) => {
        return (
            <section 
                key={index} className='main-board-section'
                onDragOver={(ev) => draggingOver(ev)} 
                onDrop={(ev) => dragDropped(ev)}
                >
                <h2 className='main-board-section-title' required>{column.name}{`(${column.tasks.length})`}</h2>
                <ul 
                    className='main-board-section-list' 
                >
                        {column.tasks.map((task, index) => {
                            return (
                                <li 
                                    draggable
                                    onDragStart={ev => dragStarted(ev, task.id)}
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

    const handleNewColumnClick = () => {
        setModalEditBoard(true)
    }

    const buttonAddColumn = () => {
        return (
            <div className='button-add-column-container'>
                <p className='button-add-column-container-text'>This board is empty. Create a new column to get started.</p>
                <button className='button-add-column-container-button' onClick={handleNewColumnClick}>
                    <i className='fa-solid fa-plus'></i>
                    Add New Column
                </button>
            </div>
        )
    }

    return (
        <>
        <main className='main-board'>
            {listColumns.length < 1 ? buttonAddColumn() : listColumns}

        </main>
            {modal && (
                <ModalViewTask 
                    modal={modal} 
                    setModal={setModal} 
                    currentBoard={currentBoard}
                    currentTask={currentTask}
                    currentSubtask={currentSubtask}
                    handleGetCurrentSubtask={handleGetCurrentSubtask}
                    setCurrentBoard={setCurrentBoard}
                    subtaskList={subtaskList}
                    setSubtaskList={setSubtaskList}
                >
                </ModalViewTask>
            )}
        </>
    )
}

export default Main