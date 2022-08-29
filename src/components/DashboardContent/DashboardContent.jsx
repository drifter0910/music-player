import React, { Fragment, useContext } from 'react';
import 'antd/dist/antd.css';
import './dashboard-content.scss';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { Row, Col } from 'antd';
import TrackContext from '../../context/AudioContext';
const DashboardContent = () => {
  const { changeTrack, isPlaying, setIsPlaying, album } = useContext(TrackContext);
  return (
    <Fragment>
      <Row className="dashboard-content">
        <Col lg={7} md={24} xs={24}>
          <Row className="dashboard__header">
            <Col
              lg={24}
              md={6}
              xs={8}
              className={isPlaying ? 'header__left rotate' : 'header__left'}
            >
              <img className="header__left-img" src={require('../../assets/artwork.jpg')} alt="" />
            </Col>
            <Col lg={24} md={18} xs={16} className="header__content">
              <div className="header__content-top">
                <h2>Nhạc được yêu thích</h2>
                <p>Cập nhật: 11/08/2022</p>
                <p>520 người yêu thích</p>
              </div>
              <div className="header__content-bottom">
                <button
                  style={{ marginTop: '1rem' }}
                  className="btn-primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <div className="header__btn">
                      <FaPause /> Tạm dừng
                    </div>
                  ) : (
                    <div className="header__btn">
                      <FaPlay /> Tiếp tục phát
                    </div>
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="dashboard__tracklist" lg={17} md={24} xs={24}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="dashboard__mediaL" lg={10}>
              BÀI HÁT
            </div>
            <div className="dashboard__mediaC">ALBUM</div>
            <div className="dashboard__mediaR">THỜI GIAN</div>
          </div>
          {album.map((track, index) => (
            <div onClick={() => changeTrack(index)} key={index} className="dashboard__track">
              <div className="dashboard__mediaL" key={index}>
                <FaMusic style={{ marginRight: '8px' }} />
                <img src={track.image} alt="" />
                <div>
                  <p>{track.title}</p>
                  <p className="dashboard__desc">{track.artist}</p>
                </div>
              </div>
              <div className="dashboard__mediaC"></div>
              <div className="dashboard__mediaR">{track.duration}</div>
            </div>
          ))}
        </Col>
      </Row>
    </Fragment>
  );
};

export default DashboardContent;
