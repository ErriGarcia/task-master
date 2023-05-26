import MainButton from '../reusable components/MainButton'
import Status from './Status'

const Modal = ({title, labelTitle, placeholderTitle, labelDescription, placeholderDescription, labelSubtasks, placeholderSubtask}) => {
    return (
        <div className='container-view-task'>
            <form>
                <h2>{title}</h2>
                    <label htmlFor='title'>{labelTitle}</label>
                    <input type='text' id='title' name='title' placeholder={placeholderTitle} />
                    <label htmlFor='description'>{labelDescription}</label>
                    <input type='text' id='description' name='description' placeholder={placeholderDescription} />

                    {/* Make reusable whole subtask fieldset */}
                    <fieldset>
                        <label htmlFor='subtasks'>{labelSubtasks}</label>
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