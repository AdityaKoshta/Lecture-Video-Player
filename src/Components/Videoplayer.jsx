import { useRef, useEffect, useState } from "react";
import { getWatchPercentage, mergeIntervals } from "./progressUtils";

const Videoplayer = () => {
  const videoRef = useRef(null);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [lastTime, setLastTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Calculate percentage
  const duration = videoRef.current?.duration || 1;
  const merged = mergeIntervals(watchedIntervals);
  const watchPercentage = getWatchPercentage(merged, duration);

  useEffect(() => {
    const video = videoRef.current;

    // Load watched intervals
    const savedIntervals = localStorage.getItem("watchedIntervals");
    if (savedIntervals) {
      setWatchedIntervals(JSON.parse(savedIntervals));
    }

    // Load last watched time
    const savedTime = parseFloat(localStorage.getItem("lastTime"));
    if (!isNaN(savedTime)) {
      video.currentTime = savedTime;
      console.log("Resumed from:", savedTime);
    }

    const handlePlay = () => {
      console.log("Video Play");
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePause = () => {
      const video = videoRef.current;
      console.log('Video paused');
      const pauseTime = Math.floor(video.currentTime);

      const newInterval = {
        start: Math.min(lastTime, pauseTime),
        end: Math.max(lastTime, pauseTime),
      };

      const updatedIntervals = [...watchedIntervals, newInterval];
      const merged = mergeIntervals(updatedIntervals);

      // Update state
      setWatchedIntervals(merged);

      // Save to localStorage
      localStorage.setItem("watchedIntervals", JSON.stringify(merged));
      localStorage.setItem("lastTime", pauseTime.toString());

      console.log("Progress saved to localStorage");
    };

    const recordInterval = (endTime) => {
      if (lastTime === null || endTime === lastTime) return;
      const start = Math.min(lastTime, endTime);
      const end = Math.max(lastTime, endTime);
      setWatchedIntervals((prev) => [...prev, { start, end }]);
      setLastTime(null);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeUpdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="container">
      <h2>video </h2>
      <video ref={videoRef} src="highway.mp4" controls></video>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ddd",
          height: "10px",
          borderRadius: "5px",
          marginTop: "10px",
        }}
       
      >
        <div
          style={{
            width: `${Math.min(100, watchPercentage).toFixed(2)}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "5px",
          }}
           className='progressbar'
        />
      </div>
          
            <p className="progressbar">Progress: {Math.min(100, watchPercentage).toFixed(2)}%</p>
         
    </div>
  );
};

export default Videoplayer;
