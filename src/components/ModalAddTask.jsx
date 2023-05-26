import Modal from './reusableComponents/Modal'

const ModalAddTask = () => {

    return (
        <>
        <Modal 
            title='Add New Task' 
            labelTitle='Title' 
            placeholderTitle='e.g. Take coffee break' 
            labelDescription='Description' 
            placeholderDescription='e.g. It is always good to take a break. This 15 minutes break will recharge the batteries a little.'
            labelSubtasks='Subtasks'
            placeholderSubtask='e.g. Drink coffee & smile'
        >
        </Modal>
        </>
    )
}

export default ModalAddTask