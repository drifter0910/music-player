import { Col, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TrackContext from '../context/AudioContext';
import { albums } from '../tracks';
import { albumImg } from '../tracks';
import './Albums.scss';
const Albums = () => {
  const { changeAlbum } = useContext(TrackContext);
  const handleChange = (index) => {
    changeAlbum(index);
  };
  return (
    <Row className="albums">
      {albums.map((ab, index) => {
        return (
          <Col className="albums__item" lg={6} md={8} xs={12} key={index}>
            <div className="albums__item-wrap">
              <img onClick={() => handleChange(index)} src={albumImg[index].albumImg} alt="" />
            </div>
            <p>{index}</p>
          </Col>
        );
      })}

      <Outlet />
    </Row>
  );
};

export default Albums;
