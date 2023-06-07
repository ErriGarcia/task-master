const Column = ({columnName, handleChangeSelect, currentBoard, column}) => {

    const listOfStatusName = currentBoard.columns.map((statusName, i) => {
        return <option key={i} value={statusName.name}>{statusName.name}</option>
    })

    return (
        <fieldset className='container-view-task-section'>
            <label 
                htmlFor='status'     className='container-view-task-section-status-title'
            >
                Current status
            </label>
            <select 
                name='status' 
                id='status' 
                className='container-view-task-section-select' 
                value={columnName} 
                onChange={handleChangeSelect}
            >
                {listOfStatusName}
            </select>
        </fieldset>
    )
}

export default Column