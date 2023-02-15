import React, { useState } from "react";
import style from "../../assets/css/URScontact/URSaddNewOffice.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function URSaddNewOffice() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [locationOnMap, setLocationOnMap] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const [showNameError, setShowNameError] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);
  const [showLocationOnMapError, setShowLocationOnMapError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showTelephoneError, setShowTelephoneError] = useState(false);

  const addOffice = (e) => {
    e.preventDefault();
    name.trim() ? setShowNameError(false) : setShowNameError(true);
    address.trim() ? setShowAddressError(false) : setShowAddressError(true);
    locationOnMap.trim() ? setShowLocationOnMapError(false) : setShowLocationOnMapError(true);
    email.trim() ? setShowEmailError(false) : setShowEmailError(true);
    telephone.trim() ? setShowTelephoneError(false) : setShowTelephoneError(true);

    if (name.trim() && address.trim() && locationOnMap.trim() && email.trim() && telephone.trim()) {
      axios.post(`${url}/office/add`, {
        "name": name,
        "address": address,
        "locationOnMap": locationOnMap,
        "email": email,
        "telephone": telephone

      })
        .then(response => {
          window.scrollTo(0, 0)
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);


          setName('');
          setAddress('');
          setLocationOnMap('');
          setEmail('');
          setTelephone('');
          form.reset();
        })
        .catch(error => console.log(error))
    }
  }
  return (
    <div className={style.URSaddNewOffice}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Office eklendi!
      </div>}
      <form action="#" className={style.URSaddNewOfficeForm} id='form'>
        <div>
          <label htmlFor="officeNameInput">Ofis ismi</label>
          <input type="text" id="officeNameInput"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
          {showNameError && <p className="mt-2 text-danger small">Ofis ismi boş bırakılamaz</p>}
        </div>

        <div>
          <label htmlFor="locationInput">Konum</label>
          <input type="text" id="locationInput"
            defaultValue={address}
            onChange={e => setAddress(e.target.value)}
          />
          {showAddressError && <p className="mt-2 text-danger small">Konum kısmı boş bırakılamaz</p>}
        </div>

        <div>
          <label htmlFor="locationOnMapInput">Harita üzerinden konum</label>
          <input type="text" id="locationOnMapInput"
            defaultValue={locationOnMap}
            onChange={e => setLocationOnMap(e.target.value)}
          />
          {showLocationOnMapError && <p className="mt-2 text-danger small">Harita üzerinden konum kısmı boş bırakılamaz</p>}

        </div>

        <div>
          <label htmlFor="numberInput">Numara</label>
          <input type="text" id="numberInput"
            defaultValue={telephone}
            onChange={e => setTelephone(e.target.value)}
          />
          {showTelephoneError && <p className="mt-2 text-danger small">Numara kısmı boş bırakılamaz</p>}

        </div>

        <div>
          <label htmlFor="emailInput">Email</label>
          <input type="text" id="emailInput"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          {showEmailError && <p className="mt-2 text-danger small">Email kısmı boş bırakılamaz</p>}
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink to={'/URSconcactPage'} className={style.cancelButton}>Geri dön</NavLink>
          <button className={style.addButton} onClick={addOffice}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
