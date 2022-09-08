import React, { useEffect, useRef } from 'react';
import './SideBar.scss';
import logo from '../../assets/logo.svg';
import logoMob from '../../assets/logo-mob.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as SideBar1 } from '../../assets/sidebar1.svg';
import { ReactComponent as SideBar2 } from '../../assets/sidebar2.svg';

const SideBar = ({ toggle, setToggle }) => {
  const sidebarRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => {
      window.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className={toggle ? 'sidebar-modal show' : 'sidebar-modal'}>
      <div ref={sidebarRef} className="sidebar">
        <img className="sidebar-logo" src={logo} alt="" />
        <img className="sidebar-logo-mob" src={logoMob} alt="" />
        <ul className="sidebar__menu">
          <Link to={'/'}>
            <li>
              <SideBar1 />
              <p>Cá nhân</p>
            </li>
          </Link>
          <Link to={'albums'}>
            <li>
              <SideBar2 />
              <p>Albums</p>
            </li>
          </Link>
          {/* <Link to={'alltracks'}>
            <li>
              <SideBar2 />
              <p>All Tracks</p>
            </li>
          </Link> */}
          {/* <Link to={''}>
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
        </Link>  */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
