import FieldsetInput from './FieldsetInput'

const ModalBoard = ({title, labelTitle, placeholderTitle, value, valueTitle, handleTitleChange, handleSubmitClick, handleFormClick, inputText, handleInputChange}) => {
    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleFormClick}>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input 
                        type='text' 
                        id='title' 
                        name='title' 
                        className='input' 
                        placeholder={placeholderTitle} 
                        value={valueTitle} 
                        onChange={handleTitleChange}
                    />
                </fieldset>
                <FieldsetInput
                    labelSubtasks='Board Columns'
                    placeholderSubtask=''
                    titleIcon='Delete Column'
                    buttonText='Add New Column'
                    inputText={inputText}
                    handleInputChange={handleInputChange}
                >
                </FieldsetInput>
                <input 
                    className='input-submit' 
                    type='submit' 
                    value={value} 
                    onClick={handleSubmitClick}
                />
            </form>
        </div>
    )
}

export default ModalBoard