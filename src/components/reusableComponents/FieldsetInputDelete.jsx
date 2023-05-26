const FieldsetInputDelete = ({labelSubtasks, placeholderSubtask }) => {
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
            <button>
                <i className='fa-solid fa-plus'></i>
                Add New Subtask
            </button>
        </fieldset>
    )
}

export default FieldsetInputDelete