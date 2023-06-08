import data from '../data.json'

const create = () => {

}

/**
 * This function searches a subtask by id
 * @param {*} id string
 * @returns 
 */
const getById = (id) => {
    for (const board of data.boards) {
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
    const subtaskToUpdate = getById(id)

    if (!subtaskToUpdate) {
        console.error(`Can not update subtask with this id: ${id} not found`)
        return
    }

    subtaskToUpdate.title = title
}

/**
 * This function delete a subtask found by id
 * @param {*} id string
 * @returns 
 */
const deleteById = (id) => {
    const subtaskToDelete = getById(id)

    if (!subtaskToDelete) {
        console.error(`Can not delete subtask with this id: ${id} not found`)
        return
    }

    data.boards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                const indexSubtask = task.subtasks.indexOf(subtaskToDelete)
                return task.subtasks.splice(indexSubtask, 1)
            })
        })
    })
}

const apiSubtask = {
    create,
    getById,
    updateById,
    deleteById
}

export default apiSubtask