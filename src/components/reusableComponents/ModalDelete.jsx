import '../../styles/reusableComponents/ModalDelete.scss'

const ModalDelete = ({title, content, handleDeleteClick, handleCancelClick}) => {

    return (
        <div className='container-delete'>
            <h2 className='container-delete-title'>{title}</h2>
            <p className='container-delete-content'>{content}</p>
            <div className='container-delete-buttons'>
                <button className='container-delete-buttons-main-button' onClick={handleDeleteClick}>Delete</button>
                <button className='container-delete-buttons-second-button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    )
}

export default ModalDelete