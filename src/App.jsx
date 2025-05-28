import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css'
import Home from './pages/Home';
import Header from './components/Header';
import Timer from './pages/Timer';
import StopWatch from './pages/StopWatch';

const TodoContainer = styled.div`
  width: 440px;
  height: 660px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`

function App() {
  return (
    <BrowserRouter>
      <TodoContainer>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/stopwatch' element={<StopWatch />} />
        </Routes>
      </TodoContainer>
    </BrowserRouter>
  )
}

export default App
