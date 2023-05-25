const ModalAddTask = () => {
    return (
        <div className='container-view-task'>
            <form>
                <h2>Add New Task</h2>
                    <label htmlFor='title'>Title</label>
                    <input type='text' placeholder='e.g. Take coffee break' />
                    <label htmlFor='description'>Desciption</label>
                    <input type='text' placeholder='e.g. It is alwaus good to take a break. This 15 minutes break will recharge the batteries a little.' />
                    <fieldset>
                        <label htmlFor='subtasks'>Subtasks</label>
                        <input type='text' placeholder='e.g. Make coffee' />
                        <button></button>
                    </fieldset>
            </form>
        </div>
    )
}

export default ModalAddTask