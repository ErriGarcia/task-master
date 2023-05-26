import '../../styles/reusableComponents/SecondButton.scss'

const SecondButton = ({buttonText}) => {
    return (
        <button className='second-button'>
            <i className='fa-solid fa-plus icon-plus'></i>
            {buttonText}
        </button>
    )
}

export default SecondButton