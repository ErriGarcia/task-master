import data from '../data.json'
import { v4 } from 'uuid'

const getAllBoards = () => {
    let localStorageData = localStorage.getItem('data')
    if (!localStorageData) {
        localStorage.setItem('data', JSON.stringify(data.boards))
    } 
    const dataInLocalStorage = localStorage.getItem('data')
    const parsedData = JSON.parse(dataInLocalStorage)
    return parsedData
}

/**
 * 
 * @param {*} currentBoard 
 * @param {*} currentTask 
 * @param {*} titleSubtask 
 */
const create = (currentBoard, currentTask, titleSubtasks) => {
    const boards = getAllBoards()
    const indexCurrentBoard = boards.findIndex(board => board.id === currentBoard.id)

    for (const eachTitleSubtask of titleSubtasks) {
        boards[indexCurrentBoard].columns.forEach(column => {
            column.tasks.forEach(task => {
                if (task.id === currentTask.id) {
                    const indexCurrentTask = column.tasks.indexOf(task)
                    column.tasks[indexCurrentTask].subtasks.push({
                        id: v4(),
                        isCompleted: false,
                        title: eachTitleSubtask.title
                    })
                }
            })
        })
    }
    localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * This function searches a subtask by id
 * @param {*} id string
 * @returns 
 */
const getById = (id) => {
    const boards = getAllBoards()
    for (const board of boards) {
        for (const column of board.columns) {
            for (const task of column.tasks) {
                const searchingSubtask = task.subtasks.find(subtask => subtask.id === id)
    
                if (searchingSubtask) {
                    return searchingSubtask
                }

            }
        }
    }
}

/**
 * This function update a subtask found by id
 * @param {*} id string
 * @param {*} name string
 * @returns 
 */
const updateById = (id, title) => {
    const boards = getAllBoards()
    const subtaskToUpdate = getById(id)

    if (!subtaskToUpdate) {
        console.error(`Can not update subtask with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                task.subtasks.forEach(subtask => {
                    if (subtask.id === subtaskToUpdate.id) {
                        subtask.title = title
                    }
                })
            })
        })
    })

    localStorage.setItem('data', JSON.stringify(boards))
}

const updateStatus = (id, checkedState) => {
    const boards = getAllBoards()
    const subtaskToUpdate = getById(id)

    if (!subtaskToUpdate) {
        console.error(`Can not update subtask not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                task.subtasks.forEach(subtask => {
                    if (subtask.id === subtaskToUpdate.id) {
                        if (checkedState === true) {
                            console.log('il checkedState è true')
                            subtask.isCompleted = false
                            return
                        } else if (checkedState === false) {
                            console.log('il checkedState è false')
                            subtask.isCompleted = true
                            return
                        }
                    }
                })
            })
        })
    })

    localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * This function delete a subtask found by id
 * @param {*} id string
 * @returns 
 */
const deleteById = (id) => {
    const boards = getAllBoards()
    const subtaskToDelete = getById(id)

    if (!subtaskToDelete) {
        console.error(`Can not delete subtask with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                task.subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskToDelete.id)
            })
        })
    })

    localStorage.setItem('data', JSON.stringify(boards))
}

const apiSubtask = {
    create,
    getById,
    updateById,
    updateStatus,
    deleteById
}

export default apiSubtask