import '../../styles/reusableComponents/MainButton.scss'

const MainButton = ({value}) => {
    return (
        <input className='input-submit' type='submit' value={value} />
    )
}

export default MainButton