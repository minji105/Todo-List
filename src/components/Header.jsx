import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  width: 440px;
  height: 52px;
  padding: 0 16px;
  position: fixed;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  return (
    <StyledHeader>
      <p>&#9776;</p>
      <Link to='/'><h1>TODO</h1></Link>
    </StyledHeader>
  );
}

export default Header;