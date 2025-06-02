import styled from "styled-components";

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
`
const Tag = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  text-transform: uppercase;

  &:nth-child(1) {
    background-color: #ffe4e4;
    &:hover {
      background-color: #ffd8d8;
    }
    &:active {
      background-color: #f8caca;
    }
  }
  &:nth-child(2) {
    background-color: #fff7df;
    &:hover {
      background-color: #fff2cc;
    }
    &:active {
      background-color: #f7e6b6;
    }
  }
  &:nth-child(3) {
    background-color: #e1f5ed;
    &:hover {
      background-color: #d3f7e8;
    }
    &:active {
      background-color: #b8ebd5;
    }
  }
`
function Filter({ setActiveTag }) {
  return (
    <TagsContainer>
      <Tag onClick={() => setActiveTag('all')}>All</Tag>
      <Tag onClick={() => setActiveTag('todo')}>Todo</Tag>
      <Tag onClick={() => setActiveTag('done')}>Done</Tag>
    </TagsContainer>
  );
}

export default Filter;