import { useState } from 'react'
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
    // valueSecondInput,
    // handleSecondInputChange,
    titleCloseIcon,
    secondButtonText,
    valueMainButtonSubmit,
    handleSubmitClick,
    inputColumns,
    }) => {

    const [columnList, setColumnList] = useState([{name: '', id: v4()},])

    const handleAddColumnClick = () => {
        setColumnList([...columnList, {name: '',  id: v4()}])
    }

    const handleRemoveColumnList = (index) => {
        const list = [...columnList]
        list.splice(index, 1)
        setColumnList(list)
    }

    const handleColumnInputChange = (ev, index) => {
        const {name, value} = ev.target
        const list = [...columnList]
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
                {/* {subtasks} */}
                    <ul className='container-subtasks'>
                        {inputColumns}
                    </ul>
                    {columnList.map((singleInput, index) => {
                        return (
                            <li className='container-subtasks-list' key={index}>
                                <input 
                                    type='text' 
                                    id='column' 
                                    name='name' 
                                    className='input subtask' 
                                    placeholder={placeholderSecondInput} 
                                    value={singleInput.input} 
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
                            </li>
                        )
                    })}
                    {/* Make reusable second button */}
                    {columnList.length <= 8 && (
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