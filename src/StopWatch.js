import { useState, useEffect } from "react";
import "./StopWatch.css";

function StopWatch(props) {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [ms, setMs] = useState("000");
  //   const [time, setTime] = useState(0);
  const [intID, setIntID] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    if (startTime === 0) return;
    const id = setInterval(timer, 1);
    setIntID(id);
  }, [startTime]);

  const timer = () => {
    const currtime = Date.now();
    let milliElapsed = currtime - startTime + milliseconds;

    setMilliseconds(milliElapsed);
    // console.log("currTime: ", currtime, "    starttime: ", startTime);
    // setTime(currtime);
    // console.log("millelapsed: ", milliElapsed / 1000);
    let milliDisplay = milliElapsed % 1000;
    milliDisplay = Math.floor(milliDisplay);
    const sec = milliElapsed / 1000;
    let secDisplay = sec % 60;
    secDisplay = Math.floor(secDisplay);
    const min = sec / 60;
    let minDisplay = min % 60;
    minDisplay = Math.floor(minDisplay);
    let hour = min / 60;
    hour = Math.floor(hour);

    setHour(hour.toString().padStart(2, "0"));
    setMinute(minDisplay.toString().padStart(2, "0"));
    setSeconds(secDisplay.toString().padStart(2, "0"));
    setMs(milliDisplay.toString().padStart(3, "0"));
  };

  const start = () => {
    reset();
    const stTime = Date.now();
    //   console.log(stTime);
    setStartTime(stTime);
  };

  const reset = () => {
    if (intID !== null) {
      clearInterval(intID);
    }
    setHour("00");
    setMinute("00");
    setSeconds("00");
    setMs("000");
    setMilliseconds(0);
  };

  const pause = () => {
    if (intID !== null) {
      clearInterval(intID);
    }
  };

  const resume = () => {
    const stTime = Date.now();
    //   console.log(stTime);
    setStartTime(stTime);
  };

  return (
    <div className="StopWatch">
      <div className="controlSection">
        <button className="btn" onClick={start}>
          Start
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
        <button className="btn" onClick={pause}>
          Pause
        </button>
        <button className="btn" onClick={resume}>
          Resume
        </button>
      </div>
      <div className="timeSection">
        <div className="time">{`${hour} : ${minute} : ${seconds} : ${ms}`}</div>
      </div>
    </div>
  );
}

export default StopWatch;
