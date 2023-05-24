import '../styles/App.scss';
import logo from '../images/logo-mobile.svg';
import data from '../data.json';

function App() {
  return (
    <div>
      <header>
        <div>
          <img src={logo} alt='logo task master'/>
          <h1>{data.boards[0].name}</h1>
          <i className='fa fa-chevron-down'></i>
        </div>
        <div>
          <button>
            <i class='fa-solid fa-plus'></i>
          </button>
          <button>
            <i className='fa-solid fa-ellipsis-vertical'></i>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;