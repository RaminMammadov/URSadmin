import React, { useState, useCallback } from "react";
import style from "../assets/css/URSeditProfilePage.module.css";

export default function URSeditProfilePage() {
  const [image, setImage] = useState(null);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });
  return (
    <div className={style.UserEditProfilePage}>
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
          <input type="text" id="usernameInput"/>
        </div>

        <div>
          <label htmlFor="emailInput">E-mail</label>
          <input type="text" id="emailInput"/>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Kaydet</button>
        </div>
      </form>
    </div>
  );
}
