import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
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
const InputTime = styled.div`
  input {
    width: 50px;
    padding: 8px;
    font-size: 1.1rem;
    margin-left: 8px;
    border: 1px solid #c0c0c0;
    border-radius: 4px;
    outline: none;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
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
function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setHour(0);
      setMinute(0);
      setSecond(0);
      setIsRunning(false);
      alert('타이머 종료 !');
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const formatTime = (time) => {
    const h = String(Math.floor(time / 3600)).padStart(2, '0');
    const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');

    return `${h}:${m}:${s}`;
  }

  const handlePause = () => {
    setIsRunning(false);
  }

  const handleStart = () => {
    const totalSec = hour * 3600 + minute * 60 + second;
    if (totalSec === 0) {
      alert("시간을 입력하세요.");
      return;
    }

    setTimeLeft(totalSec);
    setIsRunning(true);
  }

  const handleReset = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTimeLeft(0);
    setIsRunning(false);
  }

  return (
    <TimerContainer>
      {!isRunning && timeLeft === 0 && (
        <InputTime>
          <input type="number" min='0' placeholder="시" value={hour}
            onChange={(e) => setHour(Number(e.target.value))} />
          <input type="number" min='0' placeholder="분" value={minute}
            onChange={(e) => setMinute(Number(e.target.value))} />
          <input type="number" min='0' placeholder="초" value={second}
            onChange={(e) => setSecond(Number(e.target.value))} />
        </InputTime>
      )}
      <p>{formatTime(timeLeft)}</p>
      <div>
        {isRunning ? (
          <StartButton $start={isRunning} onClick={handlePause}>Pause</StartButton>
        ) : (
          <StartButton $start={isRunning} onClick={handleStart}>{timeLeft > 0 ? 'Restart' : 'Start'}</StartButton>
        )}
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </div>
    </TimerContainer>
  );
}

export default Timer;