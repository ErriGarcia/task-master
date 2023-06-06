import data from '../../services/data.json'

// make it reusable don't stick to the first column
const Status = ({columnName, handleChangeSelect}) => {

    const firstColumn = data.boards[0].columns

    const listOfStatusName = firstColumn.map((statusName, i) => {
        return <option key={i} value={statusName.name}>{statusName.name}</option>
    })

    return (
        <fieldset className='container-view-task-section'>
            <label htmlFor='status' className='container-view-task-section-status-title'>Current status</label>
            <select name='status' id='status' className='container-view-task-section-select' value={columnName} onChange={handleChangeSelect}>
                {listOfStatusName}
            </select>
        </fieldset>
    )
}

export default Status