import { useState, useEffect } from "react";

const pomodoroTime = 1500; // 1500s = 25 min
const shortBreakTime = 300; // 300s = 5 min
const longBreakTime = 600; // 600s = 10 min

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(pomodoroTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? pomodoroTime : shortBreakTime);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  return (
    <div>
      <h2>{isBreak ? "Break Time" : "Work Time"}</h2>
      <div>
        <span>{formatTime(timeLeft)}</span>
      </div>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
