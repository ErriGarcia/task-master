const ModalBoard = ({
    handleFormClick,
    modalTitle, 
    firstInputLabelTitle, 
    firstInputPlaceholderTitle,
    firstInputValueTitle,
    handleTitleChange,
    labelSecondInputs,
    placeholderSecondInput,
    valueSecondInput,
    handleSecondInputChange,
    titleCloseIcon,
    handleAddSecondInputClick,
    secondButtonText,
    valueMainButtonSubmit,
    handleSubmitClick,
    inputColumns}) => {

    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleFormClick}>
                <h2 className='modal-form-title'>{modalTitle}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{firstInputLabelTitle}</label>
                    <input 
                        type='text' 
                        id='title' 
                        name='title' 
                        className='input' 
                        placeholder={firstInputPlaceholderTitle} 
                        value={firstInputValueTitle} 
                        onChange={handleTitleChange}
                    />
                </fieldset>
                
                <fieldset className='fieldset'>
                    <label htmlFor='subtasks' className='label'>{labelSecondInputs}</label>
                {/* {subtasks} */}
                    <ul>
                        {inputColumns}
                        
                        {/* <li className='container-subtasks'>
                            <input 
                                type='text' 
                                id='subtasks' 
                                name='subtasks' 
                                className='input subtask' 
                                placeholder={placeholderSecondInput} 
                                value={valueSecondInput} 
                                onChange={handleSecondInputChange}
                            />
                            <button title={titleCloseIcon} className='button-delete'>
                                <span className='material-symbols-outlined'>
                                    close
                                </span>
                            </button>
                        </li> */}
                    </ul>
                    {/* Make reusable second button */}
                    <button className='second-button' onClick={handleAddSecondInputClick}>
                        <i className='fa-solid fa-plus icon-plus'></i>
                        {secondButtonText}
                    </button>
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