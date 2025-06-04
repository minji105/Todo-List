import styled from "styled-components";

const StyledInput = styled.div`
  background-color: #e6ecf0;
  padding: 8px 8px 8px 16px;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  input {
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 1rem;
  }
`
const StyledButton = styled.button`
  width: ${(props) => props.size ? props.size : '28px'};
  height: ${(props) => props.size ? props.size : '28px'};
  padding: 0;
  margin-left: 12px;
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
function Search({ keyword, setKeyword }) {
  return (
    <StyledInput>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <StyledButton>
        <img src="/imgs/search.png" alt="search button" />
      </StyledButton>
    </StyledInput>
  );
}

export default Search;