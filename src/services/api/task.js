import data from '../data.json'

// const getAll = () => {

// }

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getById = (id) => {
    for (const board of data.boards) {
        for (const column of board.columns) {
            const searchingTask = column.tasks.find(task => parseInt(task.id) === parseInt(id))

            if (searchingTask) {
                return searchingTask
            }
        }
    }
}

const updateById = (id, title, description) => {
    const taskToUpdate = getById(id)

    if (!taskToUpdate) {
        console.error(`task with this id: ${id} not found`)
        return
    }

    taskToUpdate.title = title
    taskToUpdate.description = description
}

const deleteById = () => {

}

const apiTask = {
    // getAll,
    getById,
    updateById,
    deleteById
}

export default apiTask