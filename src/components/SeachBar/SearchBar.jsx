import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import TrackContext from '../../context/AudioContext';
import { ReactComponent as Bar } from '../../assets/bar.svg';
import './Searchbar.scss';
const SearchBar = ({ changeTrack, setToggle, toggle }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [displayRes, setDisplayRes] = useState(false);
  const formRef = useRef();
  const searchBarRef = useRef();
  const { album } = useContext(TrackContext);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search();
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);
  const search = () => {
    const res = album.filter((track) => {
      if (input === '') {
        setDisplayRes(false);
        return null;
      } else if (track.title.toLowerCase().includes(input.toLowerCase())) {
        setDisplayRes(true);
        return track;
      }
    });
    setResults(res);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    let handler = (event) => {
      if (formRef.current.contains(event.target)) {
        setDisplayRes(true);
        searchBarRef.current.classList.add('collapse');
      } else {
        setDisplayRes(false);
        searchBarRef.current.classList.remove('collapse');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  const handleChangeTrack = (id) => {
    changeTrack(id - 1);
    setDisplayRes(false);
    setInput('');
  };
  return (
    <div className="search-bar">
      <div className="search-bar__nav">
        <button className="backward">
          <AiOutlineArrowLeft onClick={() => navigate(-1)} />
        </button>
        <button className="forward">
          <AiOutlineArrowRight onClick={() => navigate(1)} />
        </button>
      </div>
      <form ref={formRef} action="" onSubmit={handleSubmit}>
        <div ref={searchBarRef} className="search-bar__container">
          <AiOutlineSearch />
          <input
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Tìm kiếm bài hát"
          />
          <div className={displayRes ? 'search-bar__result display' : 'search-bar__result'}>
            {results.length > 0 ? (
              results.map((result) => (
                <p onClick={() => handleChangeTrack(result.id)} className="re" key={result.id}>
                  {result.title}
                </p>
              ))
            ) : (
              <p>No match results</p>
            )}
          </div>
        </div>
      </form>
      <button>
        <Bar className="mobile-bar" onClick={() => setToggle(!toggle)} />
      </button>
      {/* <img
        style={{ width: '30px', color: 'white', fill: 'white' }}
        src={require('../../assets/bar.png')}
        alt=""
      /> */}
    </div>
  );
};

export default SearchBar;
