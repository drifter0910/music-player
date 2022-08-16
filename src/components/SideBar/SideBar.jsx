import React from 'react';
import './SideBar.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={logo} alt="" />
      <ul className="sidebar__menu">
        <Link to={''}>
          <li>
            <img className="sidebar__itemImg" src={require('../../assets/1.PNG')} alt="" />
            <p>Cá nhân</p>
          </li>
        </Link>
        <Link to={''}>
          <li>
            <img className="sidebar__itemImg" src={require('../../assets/2.PNG')} alt="" />
            <p>Khám phá</p>
          </li>
        </Link>
        <Link to={''}>
          <li>
            <img className="sidebar__itemImg" src={require('../../assets/3.PNG')} alt="" />
            <p>Zing chart</p>
          </li>
        </Link>
        <Link to={''}>
          <li>
            <img className="sidebar__itemImg" src={require('../../assets/4.PNG')} alt="" />
            <p>Radio</p>
          </li>
        </Link>
        <Link to={''}>
          <li>
            <img className="sidebar__itemImg" src={require('../../assets/5.PNG')} alt="" />
            <p>Theo dõi</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
