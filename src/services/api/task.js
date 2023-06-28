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

const getAll = (currentBoard) => {
    const tasks = []
    currentBoard.columns.forEach((column) => {
        tasks.push(...column.tasks)
    })
    return tasks
}

/**
 * Create a new task
 * @param {*} currentBoard : board selected
 * @param {*} titleTask : title value write by user
 * @param {*} descriptionTask : description value write by user
 * @param {*} statusTask : column selected, for now it's just column [0]
 * @returns 
 */
const create = (currentBoard, titleTask, descriptionTask, subtaskTask, statusTask) => {
    const boards = getAllBoards()
    const indexOfBoard = boards.findIndex(board => board.id === currentBoard.id)

    boards[indexOfBoard].columns[0].tasks.push({
        id: v4(),
        title: titleTask, 
        description: descriptionTask,
        subtasks: [{
            id: v4(),
            isCompleted: false,
            title: subtaskTask
        }],
        status: statusTask
    })
    
    localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getById = (id) => {
    const boards = getAllBoards()
    for (const board of boards) {
        for (const column of board.columns) {
            const searchingTask = column.tasks.find(task => task.id === id)

            if (searchingTask) {
                return searchingTask
            }
        }
    }
}

/**
 * This function update a task found by id
 * @param {*} id 
 * @param {*} title 
 * @param {*} description 
 * @returns 
 */
const updateById = (id, title, description) => {
    const boards = getAllBoards()
    const taskToUpdate = getById(id)

    if (!taskToUpdate) {
        console.error(`Can not update task with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                if (task.id === taskToUpdate.id) {
                    task.title = title
                    task.description = description
                }
            })
        })
    })

    localStorage.setItem('data', JSON.stringify(boards))
}

const changeColumnAndStatus = (id, status) => {
  const boards = getAllBoards()
  const taskToUpdate = getById(id)

  boards.forEach(board => {
    board.columns.forEach(column => {
        const taskIndex = column.tasks.findIndex(task => task.id === taskToUpdate.id)
        if (taskIndex !== -1) {
            taskToUpdate.status = status
            const newColumn = board.columns.find(otherColumn => otherColumn.name === taskToUpdate.status)
            if (newColumn) {
                column.tasks.splice(taskIndex, 1)
                newColumn.tasks.push(taskToUpdate)
            }
        }
    })
  })

  localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * This function delete a task found by id
 * @param {*} id 
 * @returns 
 */
const deleteById = (id) => {
    const boards = getAllBoards()
    const taskToDelete = getById(id)

    if (!taskToDelete) {
        console.error(`Can not delete task with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                if (task.id === taskToDelete.id) {
                    const indexTask = column.tasks.indexOf(task)
                    column.tasks.splice(indexTask, 1)
                    localStorage.setItem('data', JSON.stringify(boards))
                }
            })
        })
    })
}

const apiTask = {
    getAll,
    create,
    getById,
    // updateStatus,
    updateById,
    changeColumnAndStatus,
    deleteById
}

export default apiTask