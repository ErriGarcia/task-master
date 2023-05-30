import '../../styles/reusableComponents/ModalDelete.scss'
import api from '../../services/api/index'

const ModalDelete = ({title, content}) => {

    const handleDeleteClick = (ev) => {
        ev.preventDefault()
        console.log('delete')
        api.task.deleteById(1)
    }

    return (
        <div className='container-delete'>
            <h2 className='container-delete-title'>{title}</h2>
            <p className='container-delete-content'>{content}</p>
            <div className='container-delete-buttons'>
                <button className='container-delete-buttons-main-button' onClick={handleDeleteClick}>Delete</button>
                <button className='container-delete-buttons-second-button'>Cancel</button>
            </div>
        </div>
    )
}

export default ModalDelete