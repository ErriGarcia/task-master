const FieldsetInput = ({labelSubtasks, placeholderSubtask, titleIcon, buttonText, valueInputSubtask, inputText, handleInputChange, handleAddClick, columns}) => {

    return (
        <fieldset className='fieldset'>
            <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                <ul>
                    <li className='container-subtasks'>
                        <input type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value={inputText} onChange={handleInputChange}/>
                        <button title={titleIcon} className='button-delete'>
                            <span className='material-symbols-outlined'>
                                delete
                            </span>
                        </button>
                    </li>
                </ul>
            <button className='second-button' onClick={handleAddClick}>
                <i className='fa-solid fa-plus icon-plus'></i>
                {buttonText}
            </button>
        </fieldset>
    )
}

export default FieldsetInput