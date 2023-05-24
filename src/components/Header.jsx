import logo from '../images/logo-mobile.svg'
import data from '../services/data.json'

const Header = () => {
    return (
        <header>
            <div>
            <img src={logo} alt='logo task master'/>
            <h1>{data.boards[0].name}</h1>
            <button>
                <i className='fa fa-chevron-down'></i>
            </button>
            </div>
            <div>
            <button>
                <i className='fa-solid fa-plus'></i>
            </button>
            <button>
                <i className='fa-solid fa-ellipsis-vertical'></i>
            </button>
            </div>
      </header>
    )
}

export default Header