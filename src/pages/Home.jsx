import { useReducer, useRef, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  background-color: #e6ecf0;
  padding: 8px 8px 8px 16px;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    font-size: 1rem;
    outline: none;
  }
`
const StyledButton = styled.button`
  width: ${(props)=>props.size ? props.size:'28px'};
  height: ${(props)=>props.size ? props.size:'28px'};
  padding: 0;
  margin-left: 8px;
  border: none;
  background-color: transparent;
  opacity: .7;
  transition: opacity .2s ease;
  &:hover {
    opacity: 1;
  }
  img {
    width: 100%;
  }
`
const TodoItem = styled.div`
  padding: 16px 12px;
  margin: 12px 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 4px #cecece;
`

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), content: action.payload }];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'UPDATE':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, content: action.payload.content } : todo
      );
    default:
      return state;
  }
}

function Home() {
  const [todo, dispatch] = useReducer(todoReducer, initialState);
  const [openModal, setOpenModal] = useState(null);
  const [editInput, setEditInput] = useState('');
  const inputRef = useRef(null);

  const handleAddTodo = () => {
    if (inputRef.current.value === '') {
      alert('할 일을 입력해주세요.');
      return;
    }

    dispatch({ type: 'ADD', payload: inputRef.current.value });
    inputRef.current.value = '';
  }

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  }

  const handleOpenEditModal = (todo) => {
    setOpenModal(todo);
    setEditInput(todo.content);
  }

  const handleUpdateTodo = () => {
    dispatch({ type: 'UPDATE', payload: { id: openModal.id, content: editInput } });
    setOpenModal(null);
    setEditInput('');
  }

  return (
    <>
      <StyledInput>
        <input type="text" ref={inputRef} />
        <StyledButton onClick={handleAddTodo}>
          <img src="/imgs/add.png" alt="add button" />
        </StyledButton>
      </StyledInput>
      <ul>
        {todo.map((el) => (
          <TodoItem key={el.id}>
            {el.content}
            <div>
              <StyledButton size={'20px'} onClick={() => handleOpenEditModal(el)}>
                <img src="/imgs/edit.png" alt="edit" />
              </StyledButton>
              <StyledButton size={'20px'} onClick={() => handleDeleteTodo(el.id)}>
                <img src="/imgs/delete.png" alt="delete" />
              </StyledButton>
            </div>
          </TodoItem>
        ))}
      </ul>

      {openModal && (
        <Modal>
          <ModalContent>
            <h3>일정 수정</h3>
            <textarea type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
            <ModalButtons>
              <button onClick={handleUpdateTodo}>저장</button>
              <button onClick={() => setOpenModal(null)}>취소</button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222222c7;
  position: absolute;
  top: 0;
  left: 0;
`
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 180px;
  padding: 16px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  textarea {
    padding: 8px;
    font-size: 1rem;
    font-family: inherit;
    flex-grow: 1;
    width: 100%;
    border: 1px solid #cccccc;
    resize: none;
    outline: none;
  }
`
const ModalButtons = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  button {
    flex-grow: 1;
    padding: 8px;
    background-color: #cae1ff;
    border: none;
    border-radius: 4px;
  }
`
export default Home;