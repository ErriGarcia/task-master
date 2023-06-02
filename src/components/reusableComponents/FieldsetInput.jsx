const FieldsetInput = ({labelSubtasks, placeholderSubtask, titleIcon, buttonText, valueInputSubtask, inputText, handleInputChange, handleAddClick, columns}) => {

    // const inputColumns = columns.map(column => {
    //     return (
    //         <li className='container-subtasks'>
    //             <input type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value={column.name} onChange={handleInputChange}/>
    //             <button title={titleIcon} className='button-delete'>
    //                 <span className='material-symbols-outlined'>
    //                     close
    //                 </span>
    //             </button>
    //         </li>
    //     )
    // })

    return (
        <fieldset className='fieldset'>
            <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                {/* {subtasks} */}
                <ul>
                    {/* {inputColumns} */}
                    <li className='container-subtasks'>
                        <input type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value={inputText} onChange={handleInputChange}/>
                        <button title={titleIcon} className='button-delete'>
                            <span className='material-symbols-outlined'>
                                close
                            </span>
                        </button>
                    </li>
                </ul>
            {/* Make reusable second button */}
            <button className='second-button' onClick={handleAddClick}>
                <i className='fa-solid fa-plus icon-plus'></i>
                {buttonText}
            </button>
        </fieldset>
    )
}

export default FieldsetInput