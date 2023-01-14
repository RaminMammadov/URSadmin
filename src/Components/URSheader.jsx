import React, { useState, useCallback } from "react";
import style from "../assets/css/URSheader.module.css";
import image from "../assets/images/user.jpg";
import { FaSignOutAlt, FaUser, FaWrench } from "react-icons/fa";
import { Outlet, NavLink } from "react-router-dom";

export default function URSheader() {
  const [showProfile, setShowProfile] = useState(false);

  const getProphile = useCallback((e) => {
    // showProfile ? setShowProfile(false) : setShowProfile(true);
  });
  window.addEventListener('click',e => {
    e.target.dataset.key == 'toggleMenu' ? showProfile ? setShowProfile(false) : setShowProfile(true) : setShowProfile(false)
  })
  return (
    <div className={style.URSheader}>
      <div className="container">
        <div className="row">
          <div className={style.user} >
            <div className={style.userNameAndPhoto} data-key={'toggleMenu'} onClick={getProphile}>
              <div className={style.userPhoto} data-key={'toggleMenu'}> 
                <img src={image} alt="" className={style.photo} data-key={'toggleMenu'}/>
              </div>
              <div className={style.userName} data-key={'toggleMenu'}>
                <p data-key={'toggleMenu'}>Hasan Mutlu</p>
              </div>
            </div>
          </div>

          {showProfile ? (
            <div className={style.userProphile}>
              <div className={style.userNameAndPhoto}>
                <div className={style.userPhoto}>
                  <img src={image} alt="" className={style.photo} />
                </div>
                <div className={style.userName}>
                  <p className={style.fullPageUserName}>Hasan Mutlu</p>
                </div>
              </div>

              <ul className={style.prophileList}>
                <NavLink onClick={getProphile} to={'/URSeditProfilePage'} className={style.listItem}>Profil</NavLink>
                <NavLink onClick={getProphile} to={'/URSsettingsPage'} className={style.listItem}>Şifreni değiştir</NavLink>
                <NavLink onClick={getProphile} to={'/URSaddNewUserPage'} className={style.listItem}>Yeni üye ekle</NavLink>
              </ul>

              <div className={style.signOutButton}>
                <button className={style.button}>
                  <FaSignOutAlt /> Çıkış yap
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
