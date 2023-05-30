const FieldsetInput = ({labelSubtasks, placeholderSubtask, titleIcon, buttonText, valueInputSubtask}) => {

    // const handleChangeSubtask = (ev) => {
    //     console.log('hola')
    // }
    
    // const subtasks = valueInputSubtask.map(((titleSubtask, i) => {
    //         console.log(titleSubtask)
    //         return ( 
    //             <div className='container-subtasks' key={i}>
    //                 <input  type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value={titleSubtask} onChange={handleChangeSubtask}/>
    //                 <button title={titleIcon} className='button-delete'>
    //                     <span className='material-symbols-outlined'>
    //                         close
    //                     </span>
    //                 </button>
    //             </div>
    //         )
    //     }))


    return (
        <fieldset className='fieldset'>
            <label htmlFor='subtasks' className='label'>{labelSubtasks}</label>
                {/* {subtasks} */}
                <div className='container-subtasks'>
                    <input  type='text' id='subtasks' name='subtasks' className='input subtask' placeholder={placeholderSubtask} value=''/>
                    <button title={titleIcon} className='button-delete'>
                        <span className='material-symbols-outlined'>
                            close
                        </span>
                    </button>
                </div>
            {/* Make reusable second button */}
            <button className='second-button'>
                <i className='fa-solid fa-plus icon-plus'></i>
                {buttonText}
            </button>
        </fieldset>
    )
}

export default FieldsetInput