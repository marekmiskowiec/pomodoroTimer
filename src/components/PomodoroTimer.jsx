import { useState, useEffect } from "react";

const pomodoroTime = 5; // 1500s = 25 min
const shortBreakTime = 2; // 300s = 5 min
const longBreakTime = 3; // 600s = 10 min
const cyclesBeforeLongBreak = 4;

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // alarm
  const playAlarm = () => {
    if (soundEnabled) {
      const audio = new Audio("/src/sounds/alarm.mp3");
      audio.play();
    }
  };

  // break
  const playBreak = () => {
    if (soundEnabled) {
      const audio = new Audio("/src/sounds/break.mp3");
      audio.play();
    }
  };

  // toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

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
      if (isBreak) {
        // play break
        playBreak();

        setTimeLeft(pomodoroTime);
        setIsBreak(false);
      } else {
        // increment cycles count
        const newCycles = cycles + 1;
        setCycles(newCycles);

        // check if long break
        if (newCycles % cyclesBeforeLongBreak === 0) {
          setTimeLeft(longBreakTime);
        } else {
          setTimeLeft(shortBreakTime);
        }
        // play alarm
        playAlarm();

        setIsBreak(true);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, cycles]);

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
      <p>Cycles Completed: {cycles}</p> {/* Wyświetl liczbę cykli */}
      <label>
        <input type="checkbox" checked={soundEnabled} onChange={toggleSound} />
        Enable Sound
      </label>
    </div>
  );
};

export default PomodoroTimer;
