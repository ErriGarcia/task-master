import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'
import FieldsetInput from './FieldsetInput'

const Modal = ({title, labelTitle, placeholderTitle, labelDescription, placeholderDescription}) => {
    
    return (
        <div className='container-view-task'>
            <form className='modal-form'>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input type='text' id='title' name='title' className='input' placeholder={placeholderTitle} />
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='description' className='label'>{labelDescription}</label>
                    <textarea type='text' id='description' name='description' className='textarea' placeholder={placeholderDescription}>
                    </textarea>
                </fieldset>
                <FieldsetInput
                labelSubtasks='Subtasks'
                placeholderSubtask='e.g. Drink coffee & smile'
                titleIcon='Delete Subtask'>
                </FieldsetInput>
                <Status></Status>
                <MainButton value='Create Task'></MainButton>
            </form>
        </div>
    )
}

export default Modal