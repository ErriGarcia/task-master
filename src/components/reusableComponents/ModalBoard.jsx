import { v4 } from 'uuid'

const ModalBoard = ({
    handleFormClick,
    modalTitle, 
    firstInputLabelTitle, 
    firstInputPlaceholderTitle,
    firstInputValueTitle,
    handleTitleChange,
    labelSecondInputs,
    placeholderSecondInput,
    titleCloseIcon,
    secondButtonText,
    valueMainButtonSubmit,
    handleSubmitClick,
    inputColumns,
    columnList,
    setColumnList
    }) => {

    /* I create an array for the board columns to map every board column */
    // const [columnList, setColumnList] = useState([{name: '', id: v4()},])

    /* I use the spread operator to copy the column list and I add a new object every time I click on the button */
    const handleAddColumnClick = () => {
        setColumnList([...columnList, {name: '',  id: v4()}])
    }

    /* I use the index to know the specific input field to remove */
    const handleRemoveColumnList = (index) => {
        /* I create a new const to copy the actual column list*/
        const list = [...columnList]

        /* With splice I can remove the input selected with the index */
        list.splice(index, 1)

        /* I update the column list with the new list where I remove the input I want*/
        setColumnList(list)
    }

    const handleColumnInputChange = (ev, index) => {
        /* Distructuring it's like writing ev.target.name && ev.target.value */
        const {name, value} = ev.target
        const list = [...columnList]
        /* I access to a specific input using the index and the name so I can update the value (ev.target.value) */
        list[index][name] = value
        setColumnList(list)
    }

    const setErrorBoardName = (className) => {
        if (!firstInputValueTitle) {
            return className
        } else {
            return false
        }
    }

    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleFormClick}>
                <h2 className='modal-form-title'>{modalTitle}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{firstInputLabelTitle} *</label>
                    <input 
                        type='text' 
                        id='title' 
                        name='title' 
                        placeholder={firstInputPlaceholderTitle} 
                        value={firstInputValueTitle} 
                        onChange={handleTitleChange}
                        className={`input ${setErrorBoardName('error-board-name')}`}
                        required
                    />
                    {setErrorBoardName('error-board-name') && (
                        <div className='error-board-name-message'>
                            <span className='material-icons error-board-name-message-icon'>
                                error
                                </span>
                            <p>Board name is required</p>
                        </div>
                    )}
                </fieldset>
                
                <fieldset className='fieldset'>
                    <label htmlFor='column' className='label'>{labelSecondInputs}</label>
                    <ul className='container-subtasks'>
                        {inputColumns}

                        {/* I show dinamically every board column */}
                        {columnList.map((singleInput, index) => {
                            return (
                                <li key={index}>
                                    <div className='container-subtasks-list'>
                                        <input 
                                            type='text' 
                                            id='column' 
                                            name='name' 
                                            className={`input subtask ${singleInput ? null : setErrorBoardName('error-board-name')}`} 
                                            placeholder={placeholderSecondInput} 
                                            /* I need to track the event so I need the ev and index to know which input is updating */
                                            value={singleInput.name} 
                                            onChange={(ev) => handleColumnInputChange(ev, index)}
                                        />
                                        <button 
                                            title={titleCloseIcon} 
                                            className='button-delete' 
                                            onClick={() => handleRemoveColumnList(index)}
                                            >
                                            <span className='material-symbols-outlined'>
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                    {/* {setErrorBoardName('error-board-name') && (
                                        <div className='error-board-name-message error-column'>
                                            <span className='material-icons error-board-name-message-icon'>
                                                error
                                                </span>
                                            <p>Column name is required</p>
                                        </div>
                                    )} */}
                                </li>
                            )
                        })}
                    </ul>

                    {columnList.length < 8 && (
                        <button className='second-button' onClick={handleAddColumnClick}>
                            <i className='fa-solid fa-plus icon-plus'></i>
                            {secondButtonText}
                        </button>
                    )}
                </fieldset>
                <input 
                    className='input-submit' 
                    type='submit' 
                    value={valueMainButtonSubmit} 
                    onClick={handleSubmitClick}
                />
            </form>
        </div>
    )
}

export default ModalBoard