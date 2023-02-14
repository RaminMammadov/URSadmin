import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSheader.module.css";
import image from "../assets/images/user.jpg";
import { FaSignOutAlt, FaUser, FaWrench } from "react-icons/fa";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

export default function URSheader(props) {
  axios.defaults.withCredentials = true;
  const [showProfile, setShowProfile] = useState(false);

  const getProphile = useCallback((e) => {
    // showProfile ? setShowProfile(false) : setShowProfile(true);
  });
  window.addEventListener('click', e => {
    e.target.dataset.key == 'toggleMenu' ? showProfile ? setShowProfile(false) : setShowProfile(true) : setShowProfile(false)
  })


  const url = 'https://185.48.182.52/v1';
  const logout = useCallback((e) => {
    e.preventDefault();
    props.setLoading(true)
    axios.get(`${url}/logout`).then(response => {
      console.log(response)
      if (response.statusText === 'OK') {
        console.log('OK')
        props.setLogged(false)
        props.setLoading(false)
        window.location.href = '/'
      }
    })
      .catch(error => console.log('error'))
  })

  return (
    <div className={style.URSheader}>
      <div className="container">
        <div className="row">
          <div className={style.user} >
            <div className={style.userNameAndPhoto} data-key={'toggleMenu'} onClick={getProphile}>
              <div className={style.userPhoto} data-key={'toggleMenu'}>
                <img src={`https://185.48.182.52/uploads/${localStorage.getItem('picture')}`} alt="" className={style.photo} data-key={'toggleMenu'} />
              </div>
              <div className={style.userName} data-key={'toggleMenu'}>
                <p data-key={'toggleMenu'}>{localStorage.getItem('userName')}</p>
              </div>
            </div>
          </div>

          {showProfile ? (
            <div className={style.userProphile}>
              <div className={style.userNameAndPhoto}>
                <div className={style.userPhoto}>
                  <img src={`https://185.48.182.52/uploads/${localStorage.getItem('picture')}`} alt="" className={style.photo} />
                </div>
                <div className={style.userName}>
                  <p className={style.fullPageUserName}>{localStorage.getItem('userName')}</p>
                </div>
              </div>

              <ul className={style.prophileList}>
                <NavLink onClick={getProphile} to={'/URSeditProfilePage'} className={style.listItem}>Profil</NavLink>
              </ul>

              <div className={style.signOutButton}>
                <button className={style.button} onClick={logout}>
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
