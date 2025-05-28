import styled from "styled-components";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222222c7;
  position: fixed;
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

function UpdateModal({editInput, setEditInput,handleUpdateTodo,setOpenModal}) {
  return (
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
  );
}

export default UpdateModal;