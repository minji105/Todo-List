import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css'
import Home from './pages/Home';
import Header from './components/Header';

const TodoContainer = styled.div`
  width: 440px;
  height: 660px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

function App() {
  return (
    <BrowserRouter>
      <TodoContainer>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </TodoContainer>
    </BrowserRouter>
  )
}

export default App
