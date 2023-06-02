import data from '../data.json'
import { v4 } from 'uuid'

/**
 * Retrieve all the boards from the json
 */
const getAll = () => data.boards

/**
 * Create a new board
 * @param {*} nameBoard string
 * @param {*} columnsBoard string
 * @returns object
 */
const create = (nameBoard, columnsBoard) => {
    return data.boards.push({
        name: nameBoard,
        id: v4(),
        columns: [{
            name: columnsBoard,
            id: v4()
        }]
    })
}

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getById = (id) => {
    const searchingBoard = data.boards.find(board => board.id === id)
    
    if (searchingBoard) {
        return searchingBoard
    }
}

/**
 * Update a board found by id
 * @param {*} id string
 * @param {*} title string
 */
const updateById = (id, name) => {
    const boardToUpdate = getById(id)

    if (!boardToUpdate) {
        console.error(`board with this id: ${id} not found`)
    }

    boardToUpdate.name = name
}

/**
 * 
 * @param {*} id string
 * @returns 
 */
const deleteById = (id) => {
    const boards = getAll()
    const boardToDelete = getById(id)

    if (!boardToDelete) {
        console.error(`board with this id: ${id} not found`)
        return
    }

    const indexBoard = boards.indexOf(boardToDelete)
    return boards.splice(indexBoard, 1)
}

const apiBoard = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}

export default apiBoard