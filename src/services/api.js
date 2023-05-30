import data from './data.json'

/**
 * Retrieve all the boards from the json
 */
const getBoards = () => data.boards

/*
const getTaskByIdPro = (id) => data.boards.forEach(board => 
    board.columns.forEach(column =>
            column.tasks.find(task => +task.id === +id)))
*/

const api = {
    getBoards
}

export default api