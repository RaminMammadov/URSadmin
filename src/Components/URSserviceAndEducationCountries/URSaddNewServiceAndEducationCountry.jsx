import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSserviceAndEducationCountries/URSaddNewServiceAndEducationCountry.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";


export default function URSaddNewServiceAndEducationCountry() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [image, setImage] = useState(null);
  const [imageURL, setImageUrl] = useState('');
  const [countryName, setCountryName] = useState('');

  const [showCountryNameError, setShowCountryNameError] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageUrl(event.target.files[0])
    }
  });

  const addCountry = useCallback((e) => {
    e.preventDefault();
    countryName ? setShowCountryNameError(false) : setShowCountryNameError(true);
    imageURL ? setShowImageError(false) : setShowImageError(true);

    var formdata = new FormData();

    if (imageURL && countryName) {
      formdata.append("countryName", countryName);
      formdata.append("picture", imageURL);
      axios.post(`${url}/country/add`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
          setCountryName('');
          setImage('');
          form.reset();
        })
        .catch(error => console.log(error))
    }


  })
  return (
    <div className={style.URSaddNewServiceAndEducationCountry}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Ülke eklendi!
      </div>}
      <form action="#" id="form" className={style.addNewServiceAndEducationCountryForm}>
        <div className={style.nameAndPhoto}>
          <div>
            <label htmlFor="countryNameInput">Ülke ismi</label>
            <input
              type="text"
              className={style.countryName}
              id="countryNameInput"
              onChange={e => setCountryName(e.target.value)}
            />
            {showCountryNameError && <p className="mt-2 text-danger small">Ülke ismi boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.countryFlagPhoto}>
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className={style.photo}>
                <div>
                  <label
                    htmlFor="photoInput"
                    className={style.photoAndIconLabel}
                  >
                    Fotoğraf seç
                  </label>
                  <input
                    type="file"
                    onChange={onImageChange}
                    className={style.photoInput}
                    id="photoInput"
                  />
                </div>
                {showImageError && <p className="mt-2 text-danger small">Fotoğraf kısmı boş bırakılamaz</p>}
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink to={'/URSserviceAndEducationCountriesPage'} className={style.cancelButton}>Geri dön</NavLink>
          <button className={style.addButton} onClick={addCountry}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
