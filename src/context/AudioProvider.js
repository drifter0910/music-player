import React, { useRef, useState } from 'react';
import { albums } from '../tracks';
import TrackContext from './AudioContext';
const AudioProvider = ({ children }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [album, setAlbums] = useState(albums[0]);
  // Destructure for conciseness
  const { audioSrc } = album[trackIndex];
  //Ref
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const changeAlbum = (index) => {
    setAlbums(albums[index]);
  };
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
      setTrackIndex(album.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };
  const nextTrack = () => {
    if (trackIndex === album.length - 1) {
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
  const changeTrack = (index) => {
    setTrackIndex(index);
  };
  return (
    <TrackContext.Provider
      value={{
        setTrackIndex,
        setTrackProgress,
        startTimer,
        prevTrack,
        nextTrack,
        onScrub,
        onScrubEnd,
        changeTrack,
        setIsPlaying,
        isPlaying,
        trackIndex,
        trackProgress,
        isReady,
        intervalRef,
        audioRef,
        album,
        changeAlbum,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
export default AudioProvider;
