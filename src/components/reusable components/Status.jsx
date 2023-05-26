import data from '../../services/data.json'

const Status = () => {

    const firstColumn = data.boards[0].columns

    const listOfStatusName = firstColumn.map((statusName, i) => {
        return <option key={i} value={statusName.name}>{statusName.name}</option>
    })

    return (
        <fieldset className='container-view-task-section'>
            <label htmlFor='status' className='container-view-task-section-status-title'>Current status</label>
            <select name='status' id='status' className='container-view-task-section-select'>
                {listOfStatusName}
            </select>
        </fieldset>
    )
}

export default Status