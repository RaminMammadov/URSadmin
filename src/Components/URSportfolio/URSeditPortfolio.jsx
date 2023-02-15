import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSportfolio/URSeditPortfolio.module.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

export default function URSeditPortfolio(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [image, setImage] = useState(`https://api.ursdanismanlik.com/uploads/${props.data.picture}`);
  const [imageSRC, setImageSRC] = useState('');

  const [serviceName, setServiceName] = useState(props.data.serviceName);
  const [markaName, setMarkaName] = useState(props.data.marka);
  const [description, setDescription] = useState(props.data.description)

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

  //editor
  const changeEditorData = (event, editor) => {
    const data = editor.getData();
    setDescription(data)
  }
  const editPortfolio = (e) => {
    e.preventDefault();
    serviceName.trim() ? setShowServiceNameError(false) : setShowServiceNameError(true)
    markaName.trim() ? setShowMarkaNameError(false) : setShowMarkaNameError(true);
    description.trim() ? setShowDescriptionError(false) : setShowDescriptionError(true);

    if (imageSRC) {
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("serviceName", serviceName);
      formdata.append("marka", markaName);
      formdata.append("description", description);
      formdata.append("picture", imageSRC);

      axios.put(`${url}/portfolio/edit`, formdata, {
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
    } else {
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("serviceName", serviceName);
      formdata.append("marka", markaName);
      formdata.append("description", description);

      axios.put(`${url}/portfolio/edit`, formdata, {
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
  }


  return (
    <div className={style.URSeditPortfolio}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Portfolio değiştirldi!
      </div>}
      <form action="#" className={style.URSeditPortfolioForm}>
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

          <div>
            <label htmlFor="brandNameInput">Marka ismi</label>
            <input type="text" id="brandNameInput"
              defaultValue={markaName}
              onChange={e => setMarkaName(e.target.value)}
            />
            {showMarkaNameError && <p className="mt-2 text-danger small">Marka ismi boş bırakılamaz</p>}
          </div>
        </div>
        <div className={style.description}>
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
                </div>
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton} onClick={editPortfolio}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
