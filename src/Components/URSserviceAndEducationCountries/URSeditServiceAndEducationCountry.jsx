import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSserviceAndEducationCountries/URSeditServiceAndEducationCountry.module.css";
import axios from "axios";

export default function URSeditServiceAndEducationCountry(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [image, setImage] = useState(`https://api.ursdanismanlik.com/uploads/${props.data.picture}`);
  const [imageURL, setImageURL] = useState();
  const [countryName, setCountryName] = useState(props.data.countryName)

  const [showCountryNameError, setShowCountryNameError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageURL(event.target.files[0]);
    }
  });

  //editCountry
  const editCountry = useCallback((e) => {
    e.preventDefault();
    
    if (imageURL) {
      countryName ? setShowCountryNameError(false) : setShowCountryNameError(true);
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("countryName", countryName);
      formdata.append("picture", imageURL);
      axios.put(`${url}/country/edit`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
        })
        .catch(error => console.log(error))
    }else {
      countryName ? setShowCountryNameError(false) : setShowCountryNameError(true);
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("countryName", countryName);
      axios.put(`${url}/country/edit`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
        })
        .catch(error => console.log(error))
    }
  },[])
  return (
    <div className={style.URSeditServiceAndEducationCountry}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Ülke değiştirildi!
      </div>}
      <form action="#" className={style.URSeditServiceAndEducationCountryForm}>
        <div className={style.nameAndPhoto}>
          <div>
            <label htmlFor="countryNameInput">Ülke ismi</label>
            <input
              type="text"
              className={style.countryName}
              defaultValue={countryName}
              id="countryNameInput" onChange={e => setCountryName(e.target.value)}
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
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton} onClick={editCountry}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
