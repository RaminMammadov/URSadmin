import React from "react";
import style from "../assets/css/URSsettings.module.css";

export default function URSsettingsPage() {
  return (
    <div className={style.URSsettingsPage}>
      <form action="#" className={style.URSsettingsPageForm}>
        <div>
          <label htmlFor="oldPasswordInput">Eski şifre</label>
          <input type="text" id="oldPasswordInput" />
        </div>

        <div>
          <label htmlFor="newPasswordInput">Yeni şifre</label>
          <input type="text" id="newPasswordInput" />
        </div>

        <div>
          <label htmlFor="againNewPasswordInput">Yeni şifrenin tekrarı</label>
          <input type="text" id="againNewPasswordInput" />
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Kaydet</button>
        </div>
      </form>
    </div>
  );
}
