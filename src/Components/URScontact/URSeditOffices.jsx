import React from 'react';
import style from '../../assets/css/URScontact/URSeditOffice.module.css';

export default function URSeditOffices() {
  return (
    <div className={style.URSeditOffice}>
      <form action="#" className={style.URSeditOfficeForm}>
                <div>
                  <label htmlFor="officeNameInput">Ofis ismi</label>
                  <input type="text" id="officeNameInput"/>
                </div>

                <div>
                  <label htmlFor="locationInput">Konum</label>
                  <input type="text" id="locationInput"/>
                </div>

                <div>
                  <label htmlFor="numberInput">Numara</label>
                  <input type="text" id="numberInput"/>
                </div>

                <div>
                  <label htmlFor="emailInput">Email</label>
                  <input type="text" id="emailInput"/>
                </div>
              
              <div className={style.cancelButtonAndAddButton}>
                <button className={style.cancelButton}>İptal et</button>
                <button className={style.addButton}>Düzenle</button>
              </div>
            </form>
    </div>
  )
}
