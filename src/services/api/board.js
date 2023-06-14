import data from '../data.json'
import { v4 } from 'uuid'

/**
 * Retrieve all the boards from the json
 */
const getAll = () => {
    let localStorageData = localStorage.getItem('data')
    if (!localStorageData) {
        localStorage.setItem('data', JSON.stringify(data.boards))
    } 
    const dataInLocalStorage = localStorage.getItem('data')
    const parsedData = JSON.parse(dataInLocalStorage)
    return parsedData
}
// const getAll = () => data.boards

/**
 * Create a new board
 * @param {*} nameBoard string
 * @param {*} columnsBoard string
 * @returns object
 */
const create = (nameBoard, columns) => {
    const parsedData = getAll()
    parsedData.push({
        name: nameBoard,
        id: v4(),
        columns: columns
    })
    localStorage.setItem('data', JSON.stringify(parsedData))
    // data.boards.push({
    //     name: nameBoard,
    //     id: v4(),
    //     columns: columns
    // })
}

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getById = (id) => {
    // const searchingBoard = data.boards.find(board => board.id === id)
    
    // if (searchingBoard) {
    //     return searchingBoard
    // }

    const boards = getAll()

    const searchingBoard = boards.find(board => board.id === id)
    
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
    const boards = getAll()
    const boardToUpdate = getById(id)

    if (!boardToUpdate) {
        console.error(`board with this id: ${id} not found`)
    }
    boards.forEach(board => {
        if (board.id === boardToUpdate.id) {
            board.name = name
        }
    })

    localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * Delete a board by id
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

    boards.forEach(board => {
        if (board.id === boardToDelete.id) {
            const indexBoard = boards.indexOf(board)
            boards.splice(indexBoard, 1)
            console.log(boards, 'boards')
            localStorage.setItem('data', JSON.stringify(boards))
        }
    })
}

const apiBoard = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}

export default apiBoard