import { useState } from 'react'
import data from '../services/data.json'
import Modal from './Modal'

const Main = () => {

    const firstBoard = data.boards[0]

    const [modal, setModal] = useState(false)
    
    const handleArticleClick = () => {
        setModal(true)
    }

    const listColumns = firstBoard.columns.map((column, index) => {
        return (
            <section key={index} className='main-board-section'>
                    <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul>
                    <li className='main-board-section-list'>
                        {column.tasks.map((task, index) => {
                            return (
                                <article className='main-board-section-list-article' key={index} onClick={handleArticleClick}>
                                    <h3 onClick={handleArticleClick}>
                                    {task.title}
                                    </h3>
                                </article>)
                        })}
                    </li>
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
                <Modal modal={modal} setModal={setModal}></Modal>
                )
            }
        </>
    )
}

export default Main