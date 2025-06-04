import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const StyledButton = styled.button`
  position: fixed;
  top: calc(50% + 330px - 32px);
  left: calc(50% + 220px - 32px);
  transform: translate(-50%, -50%);
  padding: 0;
  border: none;
  width: 40px;
  height: 40px;
  opacity: .7;
  transition: opacity .2s ease;

  &:hover {
    opacity: 1;
  }
  
  img {
    width: 100%;
  }
`
function AddTodo({ dispatch }) {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState('');

  const handleAddTodo = async () => {
    const content = input.trim();
    if (!content) {
      alert('할 일을 입력해주세요.');
      return;
    }

    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, completed: false })
    });

    const newTodo = await res.json();
    dispatch({ type: 'ADD', payload: newTodo.content, id: newTodo.id, completed: newTodo.completed });
    
    setInput('');
    setOpenModal(null);
  }

  return (
    <>
      <StyledButton onClick={() => setOpenModal(true)}>
        <img src="/imgs/add.png" alt="add button" />
      </StyledButton>
      {openModal &&
        <Modal
          title={'할 일 추가'}
          value={input}
          setValue={setInput}
          onSave={handleAddTodo}
          onClose={() => setOpenModal(false)}
        />
      }
    </>
  );
}

export default AddTodo;