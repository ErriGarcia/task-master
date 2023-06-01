import data from '../data.json'
import { v4 } from 'uuid'

/**
 * 
 * @param {*} board : board selected, for now it's just board [0]
 * @param {*} title : title value write by user
 * @param {*} description : description value write by user
 * @param {*} status : column selected, for now it's just column [0]
 * @returns 
 */
const create = (board, titleTask, descriptionTask, statusTask) => {
    return board.columns[0].tasks.push({
        id: v4(),
        title: titleTask, 
        description: descriptionTask, 
        status: statusTask
    })
}

/**
 * This function searches a task by id
 * @param {*} id number 
 */
const getById = (id) => {
    for (const board of data.boards) {
        for (const column of board.columns) {
            const searchingTask = column.tasks.find(task => task.id === id)

            if (searchingTask) {
                return searchingTask
            }
        }
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} title 
 * @param {*} description 
 * @returns 
 */
const updateById = (id, title, description) => {
    const taskToUpdate = getById(id)

    if (!taskToUpdate) {
        console.error(`task with this id: ${id} not found`)
        return
    }

    taskToUpdate.title = title
    taskToUpdate.description = description
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteById = (id) => {
    const taskToDelete = getById(id)

    if (!taskToDelete) {
        console.error(`task with this id: ${id} not found`)
        return
    }

    for (const board of data.boards) {
        for (const column of board.columns) {
            const indexTask = column.tasks.indexOf(taskToDelete)
            return column.tasks.splice(indexTask, 1)
        }
    }
}

const apiTask = {
    create,
    getById,
    updateById,
    deleteById
}

export default apiTask