import '../styles/Header.scss'
import logo from '../images/logo-mobile.svg'
import kanban from '../images/kanban.svg'
import { useEffect, useState } from 'react'
import Modal from '../components/reusableComponents/Modal'
import ModalBoard from './reusableComponents/ModalBoard'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const Header = ({
    allBoards,
    setAllBoards, 
    currentBoard, 
    handleClickBoard, 
    handleGetCurrentColumn, 
    updateBoard, 
    titleBoard, 
    setTitleBoard, 
    columnNames, 
    setColumnNames, 
    modalEditBoard, 
    setModalEditBoard,
    setCurrentBoard,
    columnList,  
    setColumnList, 
    subtaskList, 
    setSubtaskList, 
    modalSelectBoard, 
    setModalSelectBoard, 
    setColumn
}) => {

    const [modalNewTask, setModalNewTask] = useState(false)
    const [moreOptionsBoard, setMoreOptionsBoard] = useState(false)
    const [modalDeleteBoard, setModalDeleteBoard] = useState(false)
    const [modalNewBoard, setModalNewBoard] = useState(false)
    const [newTitleTask, setNewTitleTask] = useState('')
    const [newDescriptionTask, setNewDescriptionTask] = useState('')
    const [newNameBoard, setNewNameBoard] = useState('')
    const [newSubtaskTitle] = useState('')

    useEffect(() => {
        setAllBoards(api.board.getAll())
        const columnsDetails = {}
        for (const column of currentBoard.columns) {
            columnsDetails[column.id] = column.name
        }
        setColumnNames(columnsDetails)
        setTitleBoard(currentBoard.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBoard.columns])

    const handleAddTask = () => {
        currentBoard.columns.length < 1 ? setModalNewTask(false) : setModalNewTask(true)
    }

    const handleCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModalNewTask(false)
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

    const handleCreateTaskClick = () => {
        if (!newTitleTask) {
            setModalNewTask(true)
        } else {
            api.task.create(currentBoard, newTitleTask, newDescriptionTask, newSubtaskTitle, "Todo")
            setModalNewTask(false)
            const updatedBoards = api.board.getAll()
            const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
            setCurrentBoard(updatedBoards[indexOfBoard])
        }
    }

    const handleCreateTaskEnterKey = (ev) => {
        if (ev.key === 'Enter') {
            handleCreateTaskClick()
        }
    }

    const handleCreateBoardClick = () => {
        if (!newNameBoard) {
            setModalNewBoard(true)
        } else {
            api.board.create(newNameBoard, columnList)
            setModalNewBoard(false)
            const updatedBoards = api.board.getAll()
            setCurrentBoard(updatedBoards[updatedBoards.length-1])
        }
    }

    const handleCreateBoardEnterKey = (ev) => {
        if (ev.key === 'Enter') {
            handleCreateBoardClick()
        }
    }

    const handleDeleteBoard = (ev) => {
        ev.preventDefault()
        api.board.deleteById(currentBoard.id)
        setModalDeleteBoard(false)
        const updatedBoards = api.board.getAll()
        setCurrentBoard(updatedBoards[0])
    }

    const handleCloseDeleteBoard = () => {
        setModalDeleteBoard(false)
    }

    const handleInputColumnName = (ev) => {
        const newInputColumnName = {
            ...columnNames,
            [ev.target.id]: ev.target.value
        }
        setColumnNames(newInputColumnName)
    }

    const handleDeleteColumn = (ev) => {
        api.column.deleteById(ev.target.id)
        const updatedBoards = api.board.getAll()
        const indexOfBoard = updatedBoards.findIndex(board => board.id === currentBoard.id)
        setCurrentBoard(updatedBoards[indexOfBoard])
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
            <li className='container-subtasks-list' key={i}>
                <input 
                    type='text' 
                    id={column.id} 
                    name='subtasks' 
                    className='input subtask' 
                    placeholder={column.name} 
                    value={columnNames[column.id]} 
                    onChange={ev => {handleInputColumnName(ev); handleGetCurrentColumn(ev)}}
                    onClick={ev => handleGetCurrentColumn(ev)}
                    required
                />
                <button title='Delete Column' className='button-delete' onClick={handleDeleteColumn} id={column.id}>
                    <span className='material-symbols-outlined' id={column.id}>
                        delete
                    </span>
                </button>
            </li>
        )
    })

    const handleLogoClick = () => {
        window.location.reload(false)
    }

    const handleUpdateBoardEnterKey = (ev) => {
        if (ev.key === 'Enter') {
            updateBoard(ev)
        }
    }

    return (
        <>
            <header className='main-header'>
                <div className='main-header-container-logo'>
                    <img src={logo} alt='logo task master' className='main-header-container-logo-svg' onClick={handleLogoClick}/>
                    <img src={kanban} alt='kanban logo' className='main-header-container-logo-kanban' onClick={handleLogoClick}/>
                    <div className='main-header-container-logo-container' onClick={handleClickSelectBoard}>
                        <h1 className='main-header-container-logo-container-title'>{currentBoard.name}</h1>
                        <button title='All Boards' className='main-header-container-logo-container-button-down' onClick={handleClickSelectBoard}>
                            <i className='fa fa-chevron-down'></i>
                        </button>
                    </div>

                </div>
                <div className='main-header-container-buttons'>
                    <button title='Add New Task' className={`main-header-container-buttons-button-plus ${currentBoard.columns.length > 0 ? '' : 'not-clickable'}`} onClick={handleAddTask}>
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
                        valueInputTitle={newTitleTask}
                        handleInputChange={ev => setNewTitleTask(ev.target.value)} 

                        labelDescription='Description' 
                        placeholderDescription='e.g. It is always good to take a break. This 15 minutes break will recharge the batteries a little.'
                        valueTextAreaDescription={newDescriptionTask} 
                        handleTextAreaChange={ev => setNewDescriptionTask(ev.target.value)}

                        buttonText='Create Task'
                        handleClickForm={(ev) => (ev.preventDefault())} 
                        handleChangeSelect={ev => setColumn(ev.target.value)}
                        handleSubmitClick={handleCreateTaskClick}
                        subtasks={[]}
                        subtaskList={subtaskList}
                        setSubtaskList={setSubtaskList}

                        handleSubmitKeyDown={handleCreateTaskEnterKey}

                        >
                    </Modal>
                </div>
            )}
            {modalEditBoard && (
                <div className='modal' onClick={handleCloseModal}>
                    <ModalBoard 
                        modalTitle='Edit Board' 
                        labelBoardName='Board Name'
                        placeholderBoardName='e.g. Portfolio'
                        valueBoardName={titleBoard}
                        handleTitleChange={ev => setTitleBoard(ev.target.value)}

                        labelBoardColumns='Board Columns'
                        placeholderNameColumn='e.g. Todo'
                        valueColumnNames={columnNames}
                        handleColumnsChange={handleInputColumnName}

                        titleCloseIcon='Delete Column'
                        handleAddSecondInputClick={ev => ev.preventDefault()}
                        secondaryButtonText='Add New Column'
                        mainButtonText='Save Changes'

                        handleFormClick={ev => ev.preventDefault()}
                        columns={currentBoard.columns}
                        inputColumns={inputColumns}
                        handleSubmitClick={updateBoard}
                        columnList={columnList}
                        setColumnList={setColumnList}

                        handleSubmitKeyDown={handleUpdateBoardEnterKey}
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
                        handleCancelClick={handleCloseDeleteBoard}
                    >
                    </ModalDelete>
                </div>
            )}
            {modalNewBoard && (
                <div className='modal' onClick={handleCloseModal}>
                    <ModalBoard 
                        modalTitle='Add New Board' 
                        labelBoardName='Board Name' 
                        placeholderBoardName='e.g. Portfolio'
                        valueBoardName={newNameBoard}
                        handleTitleChange={ev => setNewNameBoard(ev.target.value)}

                        labelBoardColumns='Board Columns'
                        placeholderNameColumn='e.g. Todo'

                        titleCloseIcon='Delete Column'
                        secondaryButtonText='Add New Column'
                        mainButtonText='Create New Board'

                        handleSubmitClick={handleCreateBoardClick}
                        handleFormClick={ev => ev.preventDefault()}
                        columnList={columnList}
                        setColumnList={setColumnList}

                        handleSubmitKeyDown={handleCreateBoardEnterKey}
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