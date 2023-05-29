import data from './data.json'

/**
 * Retrieve all the boards from the json
 */
const getBoards = () => data.boards

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getTaskById = (id) => {
    for (const board of data.boards) {
        for (const column of board.columns) {
            const searchingTask = column.tasks.find(task => parseInt(task.id) === parseInt(id))

            if (searchingTask) {
                return searchingTask
            }
        }
    }
}

/*
const getTaskByIdPro = (id) => data.boards.forEach(board => 
    board.columns.forEach(column =>
            column.tasks.find(task => +task.id === +id)))
*/

const api = {
    getBoards,
    getTaskById
}

export default api