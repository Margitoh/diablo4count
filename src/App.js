import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./App.css";

const targetDateRelease = moment.tz(
  "2023-06-06 16:00:00",
  "America/Los_Angeles"
);
const targetDateEarlyAccess = moment.tz(
  "2023-06-02 16:00:00",
  "America/Los_Angeles"
);

const calculateTimeLeft = (targetDate) => {
  const now = moment();
  const diff = moment.duration(targetDate.diff(now));
  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();
  const seconds = diff.seconds();

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const CountdownTimer = ({ targetDate, label }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <h2>{label}</h2>
      <div>
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours}h</span>
        <span>{timeLeft.minutes}m</span>
        <span>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      <video className="video-background" autoPlay muted loop>
        <source src="/assets/lilithHero.mp4" />
      </video>
      <div className="content">
        <CountdownTimer
          targetDate={targetDateRelease}
          label="Game Release Countdown"
        />
        <CountdownTimer
          targetDate={targetDateEarlyAccess}
          label="Early Access Countdown"
        />
      </div>
    </div>
  );
};

export default App;
