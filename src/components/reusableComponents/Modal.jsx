import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'

const Modal = ({title, labelTitle, placeholderTitle, labelDescription, placeholderDescription, labelSubtasks, placeholderSubtask}) => {
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

                {/* Make reusable whole subtask fieldset */}
                <fieldset className='fieldset'>
                    <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                    <div className='container-subtasks'>
                        <input type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} />
                        <button className='button-delete'>
                            <span className='material-symbols-outlined'>
                                close
                            </span>
                        </button>
                    </div>
                    <div className='container-subtasks'>
                        <input type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} />
                        <button className='button-delete'>
                            <span className='material-symbols-outlined'>
                                close
                            </span>
                        </button>
                    </div>

                    {/* Make reusable second button */}
                    <button>
                        <i className='fa-solid fa-plus'></i>
                        Add New Subtask
                    </button>
                </fieldset>
                <Status></Status>
                <MainButton value='Create Task'></MainButton>
            </form>
        </div>
    )
}

export default Modal