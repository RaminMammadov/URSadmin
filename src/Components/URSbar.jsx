import React, { useEffect } from 'react'
import style from '../assets/css/URSbar.module.css';
import Logo from '../assets/images/11.svg';
import Pages from '../Routing/Pages.json';
import { NavLink, Outlet } from 'react-router-dom';
import URSheader from './URSheader';
import axios from 'axios';

export default function URSbar(props) {
  axios.defaults.withCredentials = true;
  const activeClassName = style.active;
  const navlinkClassName = style.link;

  return (
    <div className={style.URSbar}>
      <div className="row">
        <div className="col-12">
          <div className={style.bar}>
            <div className={style.logo}>
              <img src={Logo} alt="Logo" id={style.logo} />
            </div>

            <div className={style.barList}>
              <ul className={style.list}>
                {Pages.pages.map((page, index) => {
                  return <li className={style.listItem} key={index}><NavLink to={page.path} className={({ isActive }) =>
                    isActive ? activeClassName : navlinkClassName
                  }>{page.link}</NavLink></li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">
          <URSheader setLoading={props.setLoading} setLogged={props.setLogged} userData={props.userData} />
        </div>
      </div>
    </div>
  )
}
