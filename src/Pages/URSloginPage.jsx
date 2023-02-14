import React, { useRef, useEffect, useCallback, useState } from 'react';
import Logo from '../assets/images/11.svg';
import style from '../assets/css/URSloginPage.module.css';
// import axios from 'axios';

export default function URSloginPage(props) {
    const userName = useRef();
    const password = useRef();
    const url = 'https://185.48.182.52/v1';

    const logIn = (e) => {
        e.preventDefault();
        props.setLoading(true)
        fetch(`${url}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": userName.current.value,
                "password": password.current.value
            })
        }).then(response => {
            response.json().then(data => {

                if (data.isLogged) {
                    props.setLogged(true)
                    localStorage.clear();
                    console.log(JSON.stringify(data.data.picture.slice(1, -1)))
                    localStorage.setItem('userName', JSON.stringify(data.data.name).slice(1, -1));
                    localStorage.setItem('picture', JSON.stringify(data.data.picture).slice(1, -1));
                    localStorage.setItem('email', JSON.stringify(data.data.email).slice(1, -1));
                    localStorage.setItem('id', JSON.stringify(data.data._id).slice(1, -1));
                    props.setLoading(false)
                }

            })
        })
            .catch(error => console.log(error));
    }
    return (
        <div className={style.URSloginPage}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={style.loginPage}>
                            <div className={style.logo}>
                                <img src={Logo} alt="Logo" id={style.logo} />
                            </div>

                            <div className={style.loginForm}>
                                <form action="#" className={style.form} onSubmit={logIn}>
                                    <input className={style.inputUsername} type="email" id='email' placeholder='Kullanıcı adı' ref={userName} />
                                    <input className={style.inputPassword} type="password" name="Password" id="password" placeholder='Şifre' ref={password} />
                                    <input className={style.submitButton} type="submit" value="Giriş yap" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
