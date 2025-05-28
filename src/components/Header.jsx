import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";

const StyledHeader = styled.header`
  width: 440px;
  height: 52px;
  padding: 0 16px;
  background-color: #fff;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  p {
    font-size: 1.6rem;
    cursor: pointer;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #aaaaaa;
    cursor: pointer;
  }
`

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <StyledHeader>
        <p onClick={() => setOpenMenu(prev => !prev)}>&#9776;</p>
        <Link to='/'><h1 onClick={() => setOpenMenu(false)}>TODO</h1></Link>
      </StyledHeader>
      <Menu open={openMenu} toggleMenu={() => setOpenMenu(prev => !prev)} />
    </>
  );
}

export default Header;