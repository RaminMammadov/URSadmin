import React from 'react'
import style from '../assets/css/URSbar.module.css';
import Logo from '../assets/images/11.svg';
import Pages from '../Routing/Pages.json';
import { NavLink } from 'react-router-dom';
import URSheader from './URSheader';

export default function URSbar() {
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
          <URSheader />
        </div>
      </div>
    </div>
  )
}
