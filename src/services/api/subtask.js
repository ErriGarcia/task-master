import data from '../data.json'

const getAllBoards = () => {
    let localStorageData = localStorage.getItem('data')
    if (!localStorageData) {
        localStorage.setItem('data', JSON.stringify(data.boards))
    } 
    const dataInLocalStorage = localStorage.getItem('data')
    const parsedData = JSON.parse(dataInLocalStorage)
    return parsedData
}

const create = () => {

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

    // subtaskToUpdate.title = title
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
                task.subtasks.forEach(subtask => {
                    if (subtask.id === subtaskToDelete.id) {
                        const indexSubtask = task.subtasks.indexOf(subtask)
                        task.subtasks.splice(indexSubtask, 1)
                        localStorage.setItem('data', JSON.stringify(boards))
                    }
                })
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