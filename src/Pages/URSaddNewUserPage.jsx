import React from "react";
import style from "../assets/css/URSaddNewUser.module.css";

export default function URSaddNewUserPage() {
  return (
    <div className={style.URSaddNewUser}>
      <form action="#" className={style.URSaddNewUserForm}>
        <div>
          <label htmlFor="userNameInput">Kullanıcı adı</label>
          <input type="text" id="userNameInput" />
        </div>

        <div>
          <label htmlFor="emailInput">E-mail</label>
          <input type="text" id="emailInput" />
        </div>

        <div>
          <label htmlFor="passwordInput">Şifre</label>
          <input type="text" id="passwordInput" />
        </div>

        <div>
          <label htmlFor="againPasswordInput">Şifrenin tekrarı</label>
          <input type="text" id="againPasswordInput" />
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
