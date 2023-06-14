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
 * This function searches a column by id
 * @param {*} id string
 * @returns 
 */
const getById = (id) => {
    const boards = getAllBoards()
    for (const board of boards) {
       const searchingColumn = board.columns.find(column => column.id === id)

       if (searchingColumn) {
        return searchingColumn
       }
    }
}

const getByName = (name) => {
    const boards = getAllBoards()
    for (const board of boards) {
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
    const boards = getAllBoards()
    const columnToUpdate = getById(id)

    if (!columnToUpdate) {
        console.error(`Can not update column with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            if (column.id === columnToUpdate.id) {
                column.name = name
            }
        })
    })

    // columnToUpdate.name = name
    localStorage.setItem('data', JSON.stringify(boards))
}

/**
 * This function delete a column found by id
 * @param {*} id string
 * @returns 
 */
const deleteById = (id) => {
    const boards = getAllBoards()
    const columnToDelete = getById(id)

    if (!columnToDelete) {
        console.error(`Can not delete column with this id: ${id} not found`)
        return
    }

    boards.forEach(board => {
        board.columns.forEach(column => {
            if (column.id === columnToDelete.id) {
                const indexColumn = board.columns.indexOf(column)
                board.columns.splice(indexColumn, 1)
                localStorage.setItem('data', JSON.stringify(boards))
            }
        })
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