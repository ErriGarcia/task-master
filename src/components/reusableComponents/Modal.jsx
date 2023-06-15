import { useState } from 'react'
import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import { v4 } from 'uuid'

const Modal = ({
    title, 
    labelTitle, 
    placeholderTitle, 
    valueInputTitle,
    handleInputChange,

    labelDescription, 
    placeholderDescription, 
    valueTextAreaDescription, 
    handleTextAreaChange,  
    buttonText, 
    handleClickForm, 
    handleChangeSelect, 
    handleSubmitClick,
    inputSubtasks, 
    column,
    subtaskList,
    setSubtaskList
}) => {

    // const [subtaskList, setSubtaskList] = useState([{title: '', id: v4()},])

    const handleAddSubtaskClick = () => {
        setSubtaskList([...subtaskList, {title: '',  id: v4()}])
    }

    const handleRemoveColumnList = (index) => {
        const list = [...subtaskList]
        list.splice(index, 1)
        setSubtaskList(list)
    }

    const handleColumnInputChange = (ev, index) => {
        const {name, value} = ev.target
        const list = [...subtaskList]
        list[index][name] = value
        setSubtaskList(list)
    }

    const setErrorBoardName = (className) => {
        if (!valueInputTitle) {
            return className
        } else {
            return false
        }
    }
    
    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleClickForm}>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle} *</label>
                    <input 
                        type='text' 
                        id='title' 
                        name='title' 
                        className={`input ${setErrorBoardName('error-board-name')}`}
                        placeholder={placeholderTitle} 
                        value={valueInputTitle} 
                        onChange={handleInputChange}
                        required
                    />
                    {setErrorBoardName('error-board-name') && (
                        <div className='error-board-name-message'>
                            <span className='material-icons error-board-name-message-icon'>
                                error
                                </span>
                            <p>Title task is required</p>
                        </div>
                    )}
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='description' className='label'>{labelDescription}</label>
                    <textarea 
                        type='text' 
                        id='description' 
                        name='description' 
                        className='textarea' 
                        placeholder={placeholderDescription} 
                        value={valueTextAreaDescription} 
                        onChange={handleTextAreaChange}
                        maxLength='200'
                    >
                    </textarea>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='subtasks' className='label'>Subtasks</label>
                        <ul className='container-subtasks'>
                           {inputSubtasks}
                            {subtaskList.map((singleSubtask, index) => {
                                return (
                                    <li className='container-subtasks-list' key={index}>
                                        <input 
                                            type='text' 
                                            id='Add new subtask' 
                                            name='title' 
                                            className='input subtask' 
                                            placeholder='e.g. Make Coffee' 
                                            value={singleSubtask.title}
                                            onChange={(ev) => handleColumnInputChange(ev, index)}
                                        />
                                        <button title='Delete Subtask' className='button-delete' onClick={handleRemoveColumnList}>
                                            <span className='material-symbols-outlined'>
                                                delete
                                            </span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                        {subtaskList.length < 10 && (
                            <button className='second-button' onClick={handleAddSubtaskClick}>
                                <i className='fa-solid fa-plus icon-plus'></i>
                                Add New Subtask
                            </button>
                        )}
                </fieldset>
                <MainButton 
                    value={buttonText}
                    handleSubmitClick={handleSubmitClick}
                >
                </MainButton>
            </form>
        </div>
    )
}

export default Modal