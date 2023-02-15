import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSportfolio/URSaddNewPortfolio.module.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

export default function URSaddNewPortfolio() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [markaName, setMarkaName] = useState('');
  const [description, setDescription] = useState('');

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const [showServiceNameError, setShowServiceNameError] = useState(false);
  const [showMarkaNameError, setShowMarkaNameError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showImageError, setShowImageError] = useState(false);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageSRC(event.target.files[0]);
    }
  });

  const changeEditorData = (event, editor) => {
    const data = editor.getData();
    setDescription(data)
  }


  const addPortfolio = useCallback((e) => {
    e.preventDefault();
    var formdata = new FormData();
    serviceName.trim() ? setShowServiceNameError(false) : setShowServiceNameError(true);
    markaName.trim() ? setShowMarkaNameError(false) : setShowMarkaNameError(true);
    description.trim() ? setShowDescriptionError(false) : setShowDescriptionError(true);
    imageSRC ? setShowImageError(false) : setShowImageError(true);


    if (serviceName.trim() && markaName.trim() && description.trim() && imageSRC) {
      formdata.append("serviceName", serviceName);
      formdata.append("marka", markaName);
      formdata.append("description", description);
      formdata.append("picture", imageSRC);
      axios.post(`${url}/portfolio/add`, formdata, {
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
    <div className={style.URSaddNewPortfolio}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Portfolio eklendi!
      </div>}
      <form action="#" className={style.URSaddNewPortfolioForm}>
        <div className={style.nameAndBrand}>
          <div>
            <label htmlFor="serviceNameInput">Servis ismi</label>
            <input
              type="text"
              className={style.serviceName}
              id="serviceNameInput"
              defaultValue={serviceName}
              onChange={e => setServiceName(e.target.value)}
            />
            {showServiceNameError && <p className="mt-2 text-danger small">Servis ismi boş bırakılamaz</p>}

          </div>

          <div className={style.mt20}>
            <label htmlFor="brandNameInput">Marka ismi</label>
            <input type="text" id="brandNameInput"
              defaultValue={markaName}
              onChange={e => setMarkaName(e.target.value)}
            />
            {showMarkaNameError && <p className="mt-2 text-danger small">Marka ismi boş bırakılamaz</p>}
          </div>
        </div>
        <div className={`${style.description} ${style.mt20}`}>
          <label htmlFor="description">Açıklama</label>
          <CKEditor
            editor={ClassicEditor}
            data={`${description}`}
            onChange={changeEditorData}
          />
          {showDescriptionError && <p className="mt-2 text-danger small">Açıklama kısmı boş bırakılamaz</p>}

        </div>

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
                  {showImageError && <p className="mt-2 text-danger small">Fotoğraf ismi boş bırakılamaz</p>}

                </div>
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton} onClick={addPortfolio}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
