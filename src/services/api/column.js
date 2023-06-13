import data from '../data.json'

const create = () => {
    
}

/**
 * This function searches a column by id
 * @param {*} id string
 * @returns 
 */
const getById = (id) => {
    for (const board of data.boards) {
       const searchingColumn = board.columns.find(column => column.id === id)

       if (searchingColumn) {
        return searchingColumn
       }
    }
}

const getByName = (name) => {
    for (const board of data.boards) {
       const searchingColumn = board.columns.find(column => column.name === name)

       if (searchingColumn) {
        return searchingColumn
       }
    }
}

/**
 * This function update a column found by id
 * @param {*} id string
 * @param {*} name string
 * @returns 
 */
const updateById = (id, name) => {
    const columnToUpdate = getById(id)

    if (!columnToUpdate) {
        console.error(`Can not update column with this id: ${id} not found`)
        return
    }

    columnToUpdate.name = name
}

/**
 * This function delete a column found by id
 * @param {*} id string
 * @returns 
 */
const deleteById = (id) => {
    const columnToDelete = getById(id)

    if (!columnToDelete) {
        console.error(`Can not delete column with this id: ${id} not found`)
        return
    }

    data.boards.forEach(board => {
        const indexTask = board.columns.indexOf(columnToDelete)
        return board.columns.splice(indexTask, 1)
    })
}

const apiColumn = {
    create,
    getById,
    getByName,
    updateById,
    deleteById
}

export default apiColumn