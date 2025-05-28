import styled from "styled-components";

const StyledMenu = styled.div`
  position: absolute;
  left: 0;
  background-color: #ffffff;
  width: 200px;
  height: 100%;
  padding: 24px 16px;
  box-shadow: 0 0 40px #cececeab;
  li {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    transition: all .2s ease;

    &:hover {
      background-color: #ebf4ff;
    }
  }
`
const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  img {
    width: 24px;
    cursor: pointer;
  }
`

function Menu({ open, toggleMenu }) {
  return (
    <StyledMenu open={open}>
      <MenuHeader>
        <h2>MENU</h2>
        <img onClick={toggleMenu} src="/imgs/back.png" alt="back" />
      </MenuHeader>
      <ul>
        <li>Timer</li>
        <li>Stopwatch</li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;