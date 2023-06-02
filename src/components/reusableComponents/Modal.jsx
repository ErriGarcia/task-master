import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'

const Modal = ({title, labelTitle, placeholderTitle, valueInputTitle, labelDescription, placeholderDescription, buttonText, handleClickForm, handleInputChange, valueTextAreaDescription, handleTextAreaChange, subtasks, columnName, handleChangeSelect, handleSubmitClick}) => {

    const inputSubtasks = subtasks.map((subtask, i) => {
        return (
            <li className='container-subtasks' key={i}>
                <input 
                    type='text' 
                    id={subtask.title} 
                    name='subtasks' 
                    className='input subtask' 
                    placeholder='e.g. Make Coffee' 
                    value={subtask.title}
                />
                <button title='Delete Subtask' className='button-delete'>
                    <span className='material-symbols-outlined'>
                        close
                    </span>
                </button>
            </li>
        )
    }) 
    
    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleClickForm}>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input type='text' id='title' name='title' className='input' placeholder={placeholderTitle} value={valueInputTitle} onChange={handleInputChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='description' className='label'>{labelDescription}</label>
                    <textarea type='text' id='description' name='description' className='textarea' placeholder={placeholderDescription} value={valueTextAreaDescription} onChange={handleTextAreaChange}>
                    </textarea>
                </fieldset>

                <fieldset className='fieldset'>
                    <label htmlFor='subtasks' className='label'>Subtasks</label>
                        <ul>
                           {inputSubtasks}
                           <li className='container-subtasks'>
                                <input 
                                    type='text' 
                                    id='Add new subtask' 
                                    name='subtasks' 
                                    className='input subtask' 
                                    placeholder='e.g. Make Coffee' 
                                    value=''
                                />
                                <button title='Delete Subtask' className='button-delete'>
                                    <span className='material-symbols-outlined'>
                                        close
                                    </span>
                                </button>
                            </li>
                        </ul>
                    <button className='second-button'>
                        <i className='fa-solid fa-plus icon-plus'></i>
                        Add New Subtask
                    </button>
                </fieldset>

                {/* <FieldsetInput
                    labelSubtasks='Subtasks'
                    placeholderSubtask='e.g. Make Coffee'
                    titleIcon='Delete Subtask'
                    buttonText='Add New Subtask'
                    valueInputSubtask={titleSubtask}>
                </FieldsetInput> */}
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