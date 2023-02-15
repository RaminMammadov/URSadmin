import React, { useState, useCallback } from "react";
import style from "../assets/css/URSeditProfilePage.module.css";
import axios from "axios";

export default function URSeditProfilePage() {
  const url = 'https://api.ursdanismanlik.com/v1';

  const [image, setImage] = useState(`https://api.ursdanismanlik.com/uploads/${localStorage.getItem('picture')}`);
  const [imageSRC, setImageSRC] = useState('');
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [userID, setUserID] = useState(localStorage.getItem('id'))

  const [showUserNameError, setShowUserNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageSRC(event.target.files[0]);
    }
  });

  const editUser = (e) => {
    e.preventDefault();
    userName.trim() ? setShowUserNameError(false) : setShowUserNameError(true);
    email.trim() ? setShowEmailError(false) : setShowEmailError(true);

    if (userName.trim() && email.trim()) {
      if (imageSRC) {
        var formdata = new FormData();
        formdata.append("id", userID);
        formdata.append("name", userName);
        formdata.append("email", email);
        formdata.append("picture", imageSRC);
        axios.put(`${url}/user/edit`, formdata)
          .then(response => {
            setShowSuccessAlert(true)
            setTimeout(() => {
              setShowSuccessAlert(false)
            }, 2000);
          })
          .catch(error => console.log(error))
      } else {
        var formdata = new FormData();
        formdata.append("id", userID);
        formdata.append("name", userName);
        formdata.append("email", email);
        axios.put(`${url}/user/edit`, formdata)
          .then(response => {
            setShowSuccessAlert(true)
            setTimeout(() => {
              setShowSuccessAlert(false)
            }, 5000);
          })
          .catch(error => console.log(error))
      }
    }
  }
  return (
    <div className={style.UserEditProfilePage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Kuallanıcı yenilendi! <br /><br />
        Değişiklikleri görmek için çıkış yapıp tekrar giriş yapmalısınız!
      </div>}
      <form action="#" className={style.UserEditProfilePageForm}>
        <div className={style.userPhoto}>
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className={style.photo}>
                <div>
                  <label htmlFor="photoInput" className={style.photoLabel}>
                    Fotoğrafı değiştir
                  </label>
                  <input
                    type="file"
                    onChange={onImageChange}
                    className={style.photoInput}
                    id="photoInput"
                  />
                </div>
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="usernameInput">Kullanıcı adı</label>
          <input type="text" id="usernameInput"
            defaultValue={userName}
            onChange={e => setUserName(e.target.value)} />
          {showUserNameError && <p className="mt-2 text-danger small">Kuallanıcı adı boş bırakılamaz</p>}

        </div>

        <div>
          <label htmlFor="emailInput">E-mail</label>
          <input type="text" id="emailInput"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          {showEmailError && <p className="mt-2 text-danger small">Email kısmı boş bırakılamaz</p>}
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.addButton} onClick={editUser}>Kaydet</button>
        </div>
      </form>
    </div>
  );
}
