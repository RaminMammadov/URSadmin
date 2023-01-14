import React from "react";
import style from "../../assets/css/URScontact/URStools.module.css";

export default function URStools() {
  return (
    <div className={style.URStools}>
      <form action="#" className={style.URStoolsForm}>
        <div>
          <label htmlFor="toolsPhoneInput">Telefon</label>
          <input
            type="text"
            className={style.toolsPhone}
            id="toolsPhoneInput"
          />
        </div>

        <div>
          <label htmlFor="toolsEmailInput">E-mail</label>
          <input
            type="text"
            className={style.toolsEmail}
            id="toolsEmailInput"
          />
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
