import data from '../data.json'

const create = () => {

}

const getById = (id) => {
    for (const board of data.boards) {
       const searchingColumn = board.columns.find(column => column.id === id)

       if (searchingColumn) {
        console.log(searchingColumn)
        return searchingColumn
       }
    }
}

const updateById = (id, name) => {
    const columnToUpdate = getById(id)

    if (!columnToUpdate) {
        console.error(`Can not update column with this id: ${id} not found`)
        return
    }

    columnToUpdate.name = name
}

const deleteById = () => {
    
}

const apiColumn = {
    create,
    getById,
    updateById,
    deleteById
}

export default apiColumn