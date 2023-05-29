import FieldsetInput from './FieldsetInput'

const ModalBoard = ({title, labelTitle, placeholderTitle, value}) => {
    return (
        <div className='container-view-task'>
            <form className='modal-form'>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input type='text' id='title' name='title' className='input' placeholder={placeholderTitle} />
                </fieldset>
                <FieldsetInput
                labelSubtasks='Board Columns'
                placeholderSubtask=''
                titleIcon='Delete Column'
                buttonText='Add New Colum'>
                </FieldsetInput>
                <input className='input-submit' type='submit' value={value} />
            </form>
        </div>
    )
}

export default ModalBoard