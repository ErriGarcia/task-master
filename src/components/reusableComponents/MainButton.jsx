import '../../styles/reusableComponents/MainButton.scss'

const MainButton = ({value, handleSubmitClick}) => {
    return (
        <input className='input-submit' type='submit' value={value} onClick={handleSubmitClick} />
    )
}

export default MainButton