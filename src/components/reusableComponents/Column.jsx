const Column = ({columnName, handleChangeSelect, currentBoard, column}) => {

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
            </select>
        </fieldset>
    )
}

export default Column