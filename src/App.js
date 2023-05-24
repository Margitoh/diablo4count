/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

const CountdownTimer = ({ targetDate, label, isEarlyTimer }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerClass = isEarlyTimer ? "EarlyTimer" : "";

  return (
    <div className={timerClass}>
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
  const songs = [
    { id: "uavlRb7fC3E", name: "Zeleny Lowlands", start: 0, end: 2 * 60 + 3 },
    {
      id: "uavlRb7fC3E",
      name: "Fractured Peaks",
      start: 2 * 60 + 3,
      end: 3 * 60 + 13,
    },
    {
      id: "uavlRb7fC3E",
      name: "Menestad",
      start: 3 * 60 + 13,
      end: 4 * 60 + 22,
    },
    { id: "uavlRb7fC3E", name: "Yelesna", start: 4 * 60 + 22, end: 6 * 60 + 3 },
    {
      id: "uavlRb7fC3E",
      name: "Yelesna 2",
      start: 6 * 60 + 3,
      end: 7 * 60 + 55,
    },
    {
      id: "uavlRb7fC3E",
      name: "Seat of Seir",
      start: 7 * 60 + 55,
      end: 10 * 60 + 32,
    },
    {
      id: "uavlRb7fC3E",
      name: "Seat of Seir 2",
      start: 10 * 60 + 32,
      end: 12 * 60 + 22,
    },
    {
      id: "uavlRb7fC3E",
      name: "Kyovashad",
      start: 12 * 60 + 22,
      end: 15 * 60 + 14,
    },
    {
      id: "uavlRb7fC3E",
      name: "Krol Forest",
      start: 15 * 60 + 14,
      end: 17 * 60 + 32,
    },
    {
      id: "uavlRb7fC3E",
      name: "Kyovashad calm",
      start: 17 * 60 + 32,
      end: 19 * 60 + 16,
    },
    {
      id: "uavlRb7fC3E",
      name: "Kor Valar",
      start: 19 * 60 + 16,
      end: 22 * 60 + 19,
    },
    {
      id: "uavlRb7fC3E",
      name: "Cathedral of Light",
      start: 22 * 60 + 19,
      end: 24 * 60 + 32,
    },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  return (
    <>
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
            isEarlyTimer={true}
          />

          <div className="music-section">
            <YouTube
              videoId={currentSong.id}
              opts={{
                height: "0",
                width: "0",
                playerVars: {
                  autoplay: 1,
                  start: currentSong.start,
                  end: currentSong.end,
                  loop: 1,
                },
              }}
              onPlay={handlePlay}
              onPause={handlePause}
            />
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${currentSong.id}`}
              ref={playerRef}
              playing={isPlaying}
              onEnded={() => {
                const currentIndex = songs.findIndex(
                  (song) => song.id === currentSong.id
                );
                const nextIndex = (currentIndex + 1) % songs.length;
                try {
                  setCurrentSong(songs[nextIndex]);
                } catch (error) {
                  if (error.message.includes("ERR_BLOCKED_BY_ADBLOCKER")) {
                    return;
                  }
                  console.error(error);
                }
              }}
              volume={0.75}
              muted={false}
              width={0}
              height={0}
            />
            <div>
              <h3>Current Song: {currentSong.name}</h3>
              {!isPlaying ? (
                <i className="fas fa-play" onClick={handlePlay}></i>
              ) : (
                <i className="fas fa-pause" onClick={handlePause}></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
