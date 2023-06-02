import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import kanban from '../images/kanban.svg'
import data from '../services/data.json'
import { useEffect, useState } from 'react'
import Modal from '../components/reusableComponents/Modal'
import ModalBoard from './reusableComponents/ModalBoard'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const Header = ({currentBoard, handleClickBoard}) => {

    const [modalNewTask, setModalNewStask] = useState(false)
    const [moreOptionsBoard, setMoreOptionsBoard] = useState(false)
    const [modalEditBoard, setModalEditBoard] = useState(false)
    const [modalDeleteBoard, setModalDeleteBoard] = useState(false)
    const [modalNewBoard, setModalNewBoard] = useState(false)
    const [modalSelectBoard, setModalSelectBoard] = useState(false)
    const [allBoards, setAllBoards] = useState([api.board.getAll()])
    // const [isActive, setIsActive] = useState(false)
    const [newTitleTask, setNewTitleTask] = useState('')
    const [newDescriptionTask, setNewDescriptionTask] = useState('')
    const [column, setColumn] = useState('Todo')
    const [newNameBoard, setNewNameBoard] = useState('')
    const [inputTitleBoard, setInputTitleBoard] = useState(currentBoard.name)
    const [inputColumnNames, setInputColumnNames] = useState('')
    
    useEffect(() => {
        setAllBoards(api.board.getAll())
        const columnsDetails = {}
        for (const column of currentBoard.columns) {
            columnsDetails[column.id] = column.name
        }
        setInputColumnNames(columnsDetails)
    }, [currentBoard.columns])

    const handleAddTask = () => {
        setModalNewStask(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModalNewStask(false)
            setMoreOptionsBoard(false)
            setModalEditBoard(false)
            setModalDeleteBoard(false)
            setModalNewBoard(false)
            setModalSelectBoard(false)
        }
    }

    const handleClickMoreOptionsBoard = () => {
        setMoreOptionsBoard(true)
    }

    const handleClickEditBoard = () => {
        setMoreOptionsBoard(false)
        setModalEditBoard(true)
    }

    const handleClickDeleteBoard = () => {
        setMoreOptionsBoard(false)
        setModalDeleteBoard(true)
    }

    const handleClickAddNewBoard = () => {
        setMoreOptionsBoard(false)
        setModalSelectBoard(false)
        setModalNewBoard(true)
    }

    const handleClickSelectBoard = () => {
        setMoreOptionsBoard(false)
        setModalSelectBoard(true)
    }

    const handlTitleChange = (ev) => {
        setNewTitleTask(ev.target.value)
    }

    const handleDescriptionChange = (ev) => {
        setNewDescriptionTask(ev.target.value)
    }

    const handleFormClick = (ev) => {
        ev.preventDefault()
    }

    const handleChangeColumn = (ev) => {
        setColumn(ev.target.value)
    }

    const handleCreateTaskClick = () => {
        api.task.create(data.boards[0], newTitleTask, newDescriptionTask, column)
    }

    const handleCreateTitleBoardClick = (ev) => {
        setNewNameBoard(ev.target.value)
    }

    const handleCreateBoardClick = () => {
        api.board.create(newNameBoard, 'inputColumnName')
    }

    // Modal Add Board
    const handleInputBoardColumn = (ev) => {
        // setInputColumnName(ev.target.value)
    }

    const handleInputTitleChange = (ev) => {
        setInputTitleBoard(ev.target.value)
    }

    const updateBoard = (ev) => {
        ev.preventDefault()
        api.board.updateById(currentBoard.id, inputTitleBoard)
    }

    const handleDeleteBoard = (ev) => {
        ev.preventDefault()
        api.board.deleteById(currentBoard.id)
    }

    const handleInputColumnName = (ev) => {
        // console.log(inputColumnNames, 'inputColumnNames')
        let test
        
        for (const inputColumn in inputColumnNames) {
            // console.log(inputColumn)
            // test = inputColumn
            if (ev.target.id === inputColumn) {
                inputColumn[ev.target.id] = ev.target.value
            }
        }

        // const newInputColumnName = {
        //     test: ev.target.value
        // }


        /*
        const newInputColumnName = {
            ...inputColumnNames,
            [ev.target.id]: ev.target.value
        }
        */

        setInputColumnNames(newInputColumnName)
    }

    const buttonBoardName = allBoards.map((board, index) => {
        return (
            <button className='modal-select-board-buttons-button' key={index} onClick={handleClickBoard} id={board.id}>
                <i className='fa-solid fa-table-columns'></i>
                {board.name}
            </button>
            )
        }
    )

    const inputColumns = currentBoard.columns.map((column, i) => {
        return (
            <li className='container-subtasks' key={i}>
                <input 
                    type='text' 
                    id={column.id} 
                    name='subtasks' 
                    className='input subtask' 
                    placeholder={column.name} 
                    value={inputColumnNames[column.id]} 
                    onChange={handleInputColumnName}
                />
                <button title='Delete Column' className='button-delete'>
                    <span className='material-symbols-outlined'>
                        close
                    </span>
                </button>
            </li>
        )
    })

    return (
        <>
            <header className='main-header'>
                <div className='main-header-container-logo'>
                    <img src={logo} alt='logo task master'/>
                    <img src={kanban} alt='kanban logo' className='main-header-container-logo-kanban'/>
                    <div className='main-header-container-logo-container'>
                        <h1 className='main-header-container-logo-container-title'>{currentBoard.name}</h1>
                        <button title='All Boards' className='main-header-container-logo-container-button-down' onClick={handleClickSelectBoard}>
                            <i className='fa fa-chevron-down'></i>
                        </button>
                    </div>

                </div>
                <div className='main-header-container-buttons'>
                    <button title='Add New Task' className='main-header-container-buttons-button-plus' onClick={handleAddTask}>
                        <i className='fa-solid fa-plus'></i>
                        Add New Task
                    </button>
                    <button title='More options' onClick={handleClickMoreOptionsBoard} className='main-header-container-buttons-button-more'>
                        <i className='fa-solid fa-ellipsis-vertical'></i>
                    </button>
                    {moreOptionsBoard && (
                        <div className='modal' onClick={handleCloseModal}>
                            <div className='more-options-board-container'>
                                <button title='Edit board' className='more-options-board-container-edit-button'
                                onClick={handleClickEditBoard}>
                                    <i className='fa-regular fa-pen-to-square more-options-board-container-edit-button-icon'></i>
                                    Edit Board
                                </button>
                                <button title='Delete board' className='more-options-board-container-delete-button'
                                onClick={handleClickDeleteBoard}>
                                    <i className='fa-regular fa-trash-can more-options-board-container-delete-button-icon'></i>
                                    Delete Board
                                </button>
                                <button title='Add new board' className='more-options-board-container-add-button'
                                onClick={handleClickAddNewBoard}>
                                    <i className='fa-solid fa-plus more-options-board-container-add-button-icon'></i>
                                    Add New Board
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {modalNewTask && (
                <div className='modal' onClick={handleCloseModal}>
                    <Modal 
                        title='Add New Task' 
                        labelTitle='Title' 
                        placeholderTitle='e.g. Take coffee break' 
                        labelDescription='Description' 
                        placeholderDescription='e.g. It is always good to take a break. This 15 minutes break will recharge the batteries a little.'
                        buttonText='Create Task'
                        handleClickForm={handleFormClick} 
                        valueInputTitle={newTitleTask}
                        handleInputChange={handlTitleChange} 
                        valueTextAreaDescription={newDescriptionTask} 
                        handleTextAreaChange={handleDescriptionChange}
                        handleChangeSelect={handleChangeColumn}
                        columnName={column}
                        handleSubmitClick={handleCreateTaskClick}
                        subtasks={[]}
                        columns={currentBoard.columns}>
                    </Modal>
                </div>
            )}
            {modalEditBoard && (
                <div className='modal' onClick={handleCloseModal}>
                    <ModalBoard 
                        modalTitle='Edit Board' 
                        firstInputLabelTitle='Board Name'
                        firstInputPlaceholderTitle='e.g. Portfolio'
                        firstInputValueTitle={inputTitleBoard}
                        handleTitleChange={handleInputTitleChange}

                        labelSecondInputs='Board Columns'
                        placeholderSecondInput='e.g. Todo'
                        valueSecondInput={inputColumnNames}
                        handleSecondInputChange={handleInputColumnName}

                        titleCloseIcon='Delete Column'
                        handleAddSecondInputClick={() => {}}
                        secondButtonText='Add New Column'
                        valueMainButtonSubmit='Save Changes'

                        handleFormClick={updateBoard}
                        columns={currentBoard.columns}
                        inputColumns={inputColumns}
                    >
                    </ModalBoard>
                </div>
            )}
            {modalDeleteBoard && (
                <div className='modal' onClick={handleCloseModal}>
                    <ModalDelete 
                        title='Delete this board?' 
                        content={`Are you sure you want to delete the "${currentBoard.name}" board? This action will remove all columns and tasks and cannot be reversed.`}
                        handleDeleteClick={handleDeleteBoard}
                    >
                    </ModalDelete>
                </div>
            )}
            {modalNewBoard && (
                <div className='modal' onClick={handleCloseModal}>
                    <ModalBoard 
                        modalTitle='Add New Board' 
                        firstInputLabelTitle='Board Name' 
                        firstInputPlaceholderTitle='e.g. Portfolio'
                        firstInputValueTitle={newNameBoard}
                        handleTitleChange={handleCreateTitleBoardClick}

                        labelSecondInputs='Board Columns'
                        placeholderSecondInput='e.g. Todo'
                        valueSecondInput={inputColumnNames}
                        handleSecondInputChange={handleInputBoardColumn}

                        titleCloseIcon='Delete Column'
                        handleAddSecondInputClick={'FIX: click to add new column'}
                        secondButtonText='Add New Column'
                        valueMainButtonSubmit='Create New Board'

                        handleSubmitClick={handleCreateBoardClick}
                        handleFormClick={handleFormClick}
                        columns={[]}
                    >
                    </ModalBoard>
                </div>
            )}
            {modalSelectBoard && (
                    <div className='modal' onClick={handleCloseModal}>
                        <div className='modal-select-board'>
                            <h2 className='modal-select-board-title'>all boards ({allBoards.length})</h2>
                            <div className='modal-select-board-buttons'>
                                {buttonBoardName}
                                <button title='Add new board' className='modal-select-board-buttons-button-create'
                                onClick={handleClickAddNewBoard}>
                                    <i className='fa-solid fa-table-columns'></i>
                                    <i className='fa-solid fa-plus'></i>
                                    Create New Board
                                </button>
                            </div>
                        </div>
                    </div>
            )}
        </>
    )
}

export default Header