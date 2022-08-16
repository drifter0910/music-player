import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './components/AudioControl/AudioControls';
import DashboardContent from './components/DashboardContent/DashboardContent';
import SearchBar from './components/SeachBar/SearchBar';
import SideBar from './components/SideBar/SideBar';
import './styles.scss';
import tracks from './tracks';
import secondsToTime from './utils/secondsToTime';
const AudioPlayer = () => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Destructure for conciseness
  const { title, artist, audioSrc, image } = tracks[trackIndex];
  //Ref
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const duration = audioRef.current.duration;

  const currentTime = audioRef.current.currentTime;
  let minute = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  let songDuration = secondsToTime(duration);
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        nextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  const prevTrack = () => {
    if (trackIndex === 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };
  const nextTrack = () => {
    if (trackIndex === tracks.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  };
  const onScrub = (e) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = e;
    setTrackProgress(audioRef.current.currentTime);
  };
  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);
  // Pause and clean up on unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const changeTrack = (index) => {
    setTrackIndex(index);
  };
  return (
    <React.Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="dashboard-body">
          <SearchBar changeTrack={changeTrack} />
          <DashboardContent
            tracks={tracks}
            changeTrack={changeTrack}
            onPlayPauseClick={setIsPlaying}
            isPlaying={isPlaying}
          />
        </div>
      </div>
      <div className="audio-player">
        <div className="audio-player__desc">
          <img className="audio-player__artwork" src={image} alt="" />
          <div className="audio-player__artist">
            <p>{title}</p>
            <p>{artist}</p>
          </div>
        </div>
        <div className="audio-player__track">
          <AudioControls
            onPrevClick={prevTrack}
            onNextClick={nextTrack}
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
          />
          <div className="wrap-progress">
            <h5>{`${minute}:${seconds}`}</h5>
            <input
              value={trackProgress}
              type="range"
              step="1"
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              min="0"
              className="progress"
              onChange={(e) => onScrub(e.target.value)}
              max={duration ? duration : `${duration}`}
            />
            <h5>{songDuration ? songDuration : null}</h5>
          </div>
        </div>
        <div className="audio-player__right" style={{ width: '30%', padding: '0 1rem' }}>
          <h2>...</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AudioPlayer;
