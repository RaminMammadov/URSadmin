import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSmentors/URSaddNewMentor.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function URSaddNewMentor() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';


  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [serviceType, setServiceType] = useState('');

  const [showNameError, setShowNameError] = useState(false);
  const [showSurNameError, setShowSurNameError] = useState(false);
  const [showServiceTypeError, setShowServiceType] = useState(false);
  const [showPictureError, setShowPictureError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null


  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageURL(event.target.files[0]);
    }
  });

  const addMentor = useCallback((e) => {
    e.preventDefault();
    name ? setShowNameError(false) : setShowNameError(true);
    surName ? setShowSurNameError(false) : setShowSurNameError(true);
    serviceType ? setShowServiceType(false) : setShowServiceType(true);
    imageURL ? setShowPictureError(false) : setShowPictureError(true);

    if (name && surName && serviceType && imageURL) {
      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("surName", surName);
      formdata.append("serviceType", serviceType);
      formdata.append("picture", imageURL);

      axios.post(`${url}/mentor/add`, formdata, {
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

  })

  return (
    <div className={style.URSaddNewMentor}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Mentor eklendi!
      </div>}
      <form action="#" className={style.URSaddNewMentorForm}>
        <div className={style.nameAndDepartment}>
          <div>
            <label htmlFor="mentorNameInput">Mentor ismi</label>
            <input
              type="text"
              className={style.mentorName}
              id="mentorNameInput"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
            {showNameError && <p className="mt-2 text-danger small">Mentor ismi boş bırakılamaz</p>}

          </div>

          <div className={style.mt20}>
            <label htmlFor="mentorNameInput">Mentor soy ismi</label>
            <input
              type="text"
              className={style.mentorName}
              id="mentorSurName"
              defaultValue={surName}
              onChange={e => setSurName(e.target.value)}
            />
            {showSurNameError && <p className="mt-2 text-danger small">Mentor soy ismi boş bırakılamaz</p>}

          </div>

          <div className={style.mt20}>
            <label htmlFor="departmentInput">Hizmet alanı</label>
            <input type="text" id="departmentInput"
              defaultValue={serviceType}
              onChange={e => setServiceType(e.target.value)}
            />
            {showServiceTypeError && <p className="mt-2 text-danger small">Hizmet alanı kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.mt20}>
          <div className={style.photoAndIcon}>
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
                    {showPictureError && <p className="mt-2 text-danger small">Fotoğraf kısmı boş bırakılamaz</p>}
                  </div>
                  <img src={image} className={style.addedPhoto} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink to={'/URSmentorsPage'} className={style.cancelButton}>İptal et</NavLink>
          <button className={style.addButton} onClick={addMentor}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
