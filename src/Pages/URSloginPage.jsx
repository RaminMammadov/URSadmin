import React from 'react';
import Logo from '../assets/images/11.svg';
import style from '../assets/css/URSloginPage.module.css';

export default function URSloginPage() {
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
                                <form action="#" className={style.form}>
                                        <input className={style.inputUsername} type="email" id='email' placeholder='Kullanıcı adı'/>
                                        <input className={style.inputPassword} type="password" name="Password" id="password" placeholder='Şifre'/>
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
