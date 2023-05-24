import data from '../services/data.json'

const Main = () => {

    const listColumns = data.boards[0].columns.map((column, index) => {
        return (
            <section key={index} className='main-board-section'>
                    <h2 className='main-board-section-title'>{column.name}{`(${column.tasks.length})`}</h2>
                <ul>
                    <li>
                        {column.tasks.map(task => {
                            return (
                                <article className='main-board-section-article'>
                                    <h3>
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
        <main className='main-board'>
            {listColumns}
        </main>
    )
}

export default Main