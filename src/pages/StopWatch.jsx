import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const StopWatchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  p {
    font-size: 3rem;
  }
  button {
    width: 100px;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    margin-left: 8px;
  }
`
const StartButton = styled.button`
  background-color: ${(props) => props.$start ? '#fff7df' : '#e1f5ed'};
  &:hover {
    background-color: ${(props) => props.$start ? '#fff2cc' : '#d3f7e8'};
  }
`
const ResetButton = styled.button`
  background-color: #ffe4e4;
  &:hover {
  background-color: #ffd8d8;
  }
`

function StopWatch() {
  const [time, setTime] = useState(0);  // ms 단위
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning])

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  }

  return (
    <StopWatchContainer>
      <p>{formatTime(time)}</p>
      <div>
        <StartButton className="start" $start={isRunning} onClick={() => setIsRunning(prev => !prev)}>
          {isRunning ? 'Pause' : 'Start'}
        </StartButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </div>
    </StopWatchContainer>
  );
}

export default StopWatch;