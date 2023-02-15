import React, { useState, useCallback, useEffect } from "react";
import style from "../../assets/css/URScontact/URStools.module.css";
import axios from 'axios';
import Loading from '../Loading';

export default function URStools() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [showTelephoneError, setShowTelephoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const getData = () => {
    axios.get(`${url}/communications`)
      .then(response => {
        response.data.data.map(item => {
          setTelephone(item.telephone)
          setEmail(item.email);
          setId(item._id)
        })
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  const editData = (e) => {
    e.preventDefault();
    telephone ? setShowTelephoneError(false) : setShowTelephoneError(true);
    email ? setShowEmailError(false) : setShowEmailError(true)
    if (telephone && email) {
      axios.put(`${url}/communication/edit`, {
        "id": id,
        "telephone": telephone,
        "email": email
      }).then(response => console.log(response))
        .catch(error => console.log(error))
        .finally(() => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
        })
    }
  }
  return (
    <div className={style.URStools}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Araçlar değiştirildi!
      </div>}
      {
        isLoading ? <Loading /> :
          <form action="#" className={style.URStoolsForm}>
            <div>
              <label htmlFor="toolsPhoneInput">Telefon</label>
              <input
                type="text"
                className={style.toolsPhone}
                id="toolsPhoneInput"
                defaultValue={telephone}
                onChange={e => setTelephone(e.target.value)}
              />
              {showTelephoneError && <p className="mt-2 text-danger small">Telefon kısmı boş bırakılamaz</p>}

            </div>

            <div className={style.mt20}>
              <label htmlFor="toolsEmailInput">E-mail</label>
              <input
                type="text"
                className={style.toolsEmail}
                id="toolsEmailInput"
                defaultValue={email}
                onChange={e => setEmail(e.target.value)}
              />
              {showEmailError && <p className="mt-2 text-danger small">Email kısmı boş bırakılamaz</p>}
            </div>

            <div className={style.cancelButtonAndAddButton}>
              <button className={style.cancelButton}>İptal et</button>
              <button className={style.addButton} onClick={editData}>Düzenle</button>
            </div>
          </form>
      }
    </div>
  );
}
