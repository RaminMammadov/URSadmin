import React, { useRef, useEffect, useCallback } from 'react';
import Logo from '../assets/images/11.svg';
import style from '../assets/css/URSloginPage.module.css';
// import axios from 'axios';

export default function URSloginPage(props) {
    // At instance level
// const instance = axios.create({
//     withCredentials: true
//   });

    const userName = useRef();
    const password = useRef();
    const url = 'https://localhost:443/';
    const logIn = (e) => {
        e.preventDefault();
        fetch(`${url}api/v1/login`, {
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
            console.log(response.json().then(data=>{
                console.log(data)
                props.setLogged(data.isLogged)
            }))
            // if (response.json()) {
            //     props.setLogged(response.data.isLogged)
            //     console.log('Login edildi...')
            // }
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
                                    <p>Şifremi unuttum</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
