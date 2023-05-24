import '../styles/App.scss'
import Header from './Header'
import data from '../services/data.json'

function App() {

  const listColumns = data.boards[0].columns.map((column, index) => {
    return (
      <section key={index}>
        <h2>{column.name}</h2>
        <span>{column.tasks.length}</span>
        <ul>
          <li>
            <article>
              <h3>
                {column.tasks.map(task => {
                  return task.title
                })}
              </h3>
            </article>
          </li>
        </ul>
      </section>)
  })

  return (
    <div>
      <Header></Header>
      <main>
        {listColumns}
      </main>
    </div>
  )
}

export default App