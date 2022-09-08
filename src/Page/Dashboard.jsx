import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AudioControls from '../components/AudioControl/AudioControls';
import SearchBar from '../components/SeachBar/SearchBar';
import SideBar from '../components/SideBar/SideBar';
import TrackContext from '../context/AudioContext';
import '../styles.scss';
import secondsToTime from '../utils/secondsToTime';

const AudioPlayer = () => {
  const {
    trackIndex,
    trackProgress,
    setTrackProgress,
    isPlaying,
    setIsPlaying,
    startTimer,
    prevTrack,
    nextTrack,
    onScrub,
    onScrubEnd,
    changeTrack,
    isReady,
    intervalRef,
    audioRef,
    album,
  } = useContext(TrackContext);
  // Destructure for conciseness
  const { title, artist, audioSrc, image } = album[trackIndex];
  const currentTime = audioRef.current.currentTime;
  const duration = audioRef.current.duration;
  let minute = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  let songDuration = secondsToTime(duration);
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
  }, [trackIndex, album]);
  // Pause and clean up on unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const [toggle, setToggle] = useState(false);

  return (
    <React.Fragment>
      <div className="dashboard">
        <SideBar toggle={toggle} setToggle={setToggle} />
        <div className="dashboard-body">
          <SearchBar setToggle={setToggle} toggle={toggle} changeTrack={changeTrack} />
          <Outlet />
        </div>
      </div>
      <div className="audio-player">
        <div className="audio-player__desc">
          <img className="audio-player__artwork" src={image} alt="" />
          <div className="audio-player__artist">
            <p className="title">{title}</p>
            <marquee className="title-mobile">{title}</marquee>
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
