const FieldsetInput = ({labelSubtasks, placeholderSubtask, titleIcon, buttonText, valueInputSubtask, inputText, handleInputChange}) => {

    return (
        <fieldset className='fieldset'>
            <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                {/* {subtasks} */}
                <div className='container-subtasks'>
                    <input  type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value={inputText} onChange={handleInputChange}/>
                    <button title={titleIcon} className='button-delete'>
                        <span className='material-symbols-outlined'>
                            close
                        </span>
                    </button>
                </div>
            {/* Make reusable second button */}
            <button className='second-button'>
                <i className='fa-solid fa-plus icon-plus'></i>
                {buttonText}
            </button>
        </fieldset>
    )
}

export default FieldsetInput