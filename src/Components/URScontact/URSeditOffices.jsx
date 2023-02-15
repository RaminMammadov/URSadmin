import React, { useState } from 'react';
import style from '../../assets/css/URScontact/URSeditOffice.module.css';
import axios from 'axios';
import { NavLink } from 'react-bootstrap';

export default function URSeditOffices(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [name, setName] = useState(props.data.name);
  const [address, setAddress] = useState(props.data.address);
  const [locationOnMap, setLocationOnMap] = useState(props.data.locationOnMap);
  const [email, setEmail] = useState(props.data.email);
  const [telephone, setTelephone] = useState(props.data.telephone);

  const [showNameError, setShowNameError] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);
  const [showLocationOnMapError, setShowLocationOnMapError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showTelephoneError, setShowTelephoneError] = useState(false);

  const updateOffice = (e) => {
    e.preventDefault();

    axios.put(`${url}/office/edit`, {
      "id": props.data._id,
      "name": name,
      "address": address,
      "locationOnMap": locationOnMap,
      "email": email,
      "telephone": telephone
    })
      .then(response => {
        console.log(response)
        window.scrollTo(0, 0)
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      })
      .catch(error => console.log(error))
  }
  return (
    <div className={style.URSeditOffice}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Office değiştirildi!
      </div>}
      <form action="#" className={style.URSeditOfficeForm}>
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
          <button className={style.addButton} onClick={updateOffice}>Ekle</button>
        </div>
      </form>
    </div>
  )
}
