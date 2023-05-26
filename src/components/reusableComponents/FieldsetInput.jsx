import SecondButton from "./SecondButton"

const FieldsetInput = ({labelSubtasks, placeholderSubtask }) => {
    return (
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
            <SecondButton buttonText='Add New Task'></SecondButton>
        </fieldset>
    )
}

export default FieldsetInput