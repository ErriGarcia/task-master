import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'

const Modal = ({
    title, 
    labelTitle, 
    placeholderTitle, 
    valueInputTitle, 
    labelDescription, 
    placeholderDescription, 
    valueTextAreaDescription, 
    buttonText, 
    handleClickForm, 
    handleInputChange, 
    handleTextAreaChange,  
    columnName, 
    handleChangeSelect, 
    handleSubmitClick,
    inputSubtasks, 
    valueSubtask, 
    handleSubtaskChange
}) => {

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
                    <textarea type='text' id='description' name='description' className='textarea' placeholder={placeholderDescription} value={valueTextAreaDescription} onChange={handleTextAreaChange}>
                    </textarea>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='subtasks' className='label'>Subtasks</label>
                        <ul className='container-subtasks'>
                           {inputSubtasks}
                           <li className='container-subtasks-list'>
                                <input 
                                    type='text' 
                                    id='Add new subtask' 
                                    name='subtasks' 
                                    className='input subtask' 
                                    placeholder='e.g. Make Coffee' 
                                    value={valueSubtask}
                                    onChange={handleSubtaskChange}
                                />
                                <button title='Delete Subtask' className='button-delete'>
                                    <span className='material-symbols-outlined'>
                                        delete
                                    </span>
                                </button>
                            </li>
                        </ul>
                    <button className='second-button'>
                        <i className='fa-solid fa-plus icon-plus'></i>
                        Add New Subtask
                    </button>
                </fieldset>
                <Status
                    columnName={columnName}
                    handleChangeSelect={handleChangeSelect}
                >
                </Status>
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