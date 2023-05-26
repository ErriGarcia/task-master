import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'

const Modal = ({title, labelTitle, placeholderTitle, labelDescription, placeholderDescription, labelSubtasks, placeholderSubtask}) => {
    return (
        <div className='container-view-task'>
            <form className='modal-form'>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input type='text' id='title' name='title' className='input' placeholder={placeholderTitle} />
                </fieldset>
                <fieldset>
                    <label htmlFor='description' className='label'>{labelDescription}</label>
                    <input type='text' id='description' name='description' placeholder={placeholderDescription} />
                </fieldset>

                {/* Make reusable whole subtask fieldset */}
                <fieldset>
                    <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                    <input type='text' id='subtasks' name='subtasks' placeholder={placeholderSubtask} />
                    <button>
                        <span className='material-symbols-outlined'>
                            close
                        </span>
                    </button>
                    <input type='text' id='subtasks' name='subtasks' placeholder={placeholderSubtask} />
                    <button>
                        <span className='material-symbols-outlined'>
                            close
                        </span>
                    </button>

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