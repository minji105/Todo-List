import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import Quote from "../components/Quote";
import UpdateModal from "../components/UpdateModal";

const StyledTodoList = styled.div`
  padding: 0 16px 16px;
  margin-top: 52px;
`
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
  width: ${(props) => props.size ? props.size : '28px'};
  height: ${(props) => props.size ? props.size : '28px'};
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
      return [...state, { id: action.id || Date.now(), content: action.payload }];
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

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => {
        data.forEach(todo => {
          dispatch({ type: 'ADD', payload: todo.content, id: todo.id });
        });
      });
  }, []);

  const handleAddTodo = async () => {
    const content = inputRef.current.value.trim();
    if (!content) {
      alert('할 일을 입력해주세요.');
      return;
    }

    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });

    const newTodo = await res.json();
    dispatch({ type: 'ADD', payload: newTodo.content, id: newTodo.id });
    inputRef.current.value = '';
  }

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE', payload: id });
  }

  const handleOpenEditModal = (todo) => {
    setOpenModal(todo);
    setEditInput(todo.content);
  }

  const handleUpdateTodo = async () => {
    await fetch(`http://localhost:3001/todos/${openModal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editInput })
    });

    dispatch({ type: 'UPDATE', payload: { id: openModal.id, content: editInput } });
    setOpenModal(null);
    setEditInput('');
  }

  return (
    <StyledTodoList>
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

      {openModal &&
        <UpdateModal
          editInput={editInput}
          setEditInput={setEditInput}
          handleUpdateTodo={handleUpdateTodo}
          setOpenModal={setOpenModal} />
      }

      <Quote />
    </StyledTodoList>
  );
}

export default Home;