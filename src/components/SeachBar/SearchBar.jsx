import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch } from 'react-icons/ai';
import tracks from '../../tracks';
import './Searchbar.scss';
const SearchBar = ({ changeTrack }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [displayRes, setDisplayRes] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search();
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);
  const search = () => {
    const res = tracks.filter((track) => {
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
      } else {
        setDisplayRes(false);
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
          <AiOutlineArrowLeft />
        </button>
        <button className="forward">
          <AiOutlineArrowRight />
        </button>
      </div>
      <form ref={formRef} action="" onSubmit={handleSubmit}>
        <div className="search-bar__container">
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
    </div>
  );
};

export default SearchBar;
