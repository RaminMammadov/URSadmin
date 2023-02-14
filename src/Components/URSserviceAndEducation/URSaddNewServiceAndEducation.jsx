import React, { useState, useCallback, useRef } from "react";
import style from "../../assets/css//URSserviceAndEducation/URSaddNewServiceAndEducation.module.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import FormData from "form-data";

export default function URSaddNewServiceAndEducation() {
  axios.defaults.withCredentials = true;
  const url = 'https://185.48.182.52/v1';


  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');

  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState('');

  const [icon, setIcon] = useState(null);
  const [iconSRC, setIconSRC] = useState('');

  const [hoverIcon, setHoverIcon] = useState(null);
  const [hoverIconSRC, setHoverIconSRC] = useState('');

  const [showServiceNameError, setShowServiceNameError] = useState(false);
  const [showShortDescriptionError, setShowShortDescriptionError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [showIconError, setShowIconError] = useState(false);
  const [showHoverIconError, setShowHoverIconError] = useState(false);



  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageSRC(event.target.files[0]);
    }
  });

  const onIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setIcon(URL.createObjectURL(event.target.files[0]));
      setIconSRC(event.target.files[0]);
    }
  });

  const onHoverIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setHoverIcon(URL.createObjectURL(event.target.files[0]));
      setHoverIconSRC(event.target.files[0]);
    }
  });


  const changeEditorData = (event, editor) => {
    const data = editor.getData();
    setDescription(data)
  }
  //addService
  const addService = (e) => {
    e.preventDefault();

    serviceName.trim() ? setShowServiceNameError(false) : setShowServiceNameError(true);
    shortDescription.trim() ? setShowShortDescriptionError(false) : setShowShortDescriptionError(true);
    description.trim() ? setShowDescriptionError(false) : setShowDescriptionError(true);
    imageSRC ? setShowImageError(false) : setShowImageError(true);
    iconSRC ? setShowIconError(false) : setShowIconError(true);
    hoverIconSRC ? setShowHoverIconError(false) : setShowHoverIconError(true);

    if (serviceName.trim() && shortDescription.trim() && description.trim() && imageSRC && iconSRC && hoverIconSRC) {
      var formdata = new FormData();
      formdata.append('title', serviceName);
      formdata.append('shortDescription', shortDescription);
      formdata.append('description', description);
      formdata.append('picture1', imageSRC);
      formdata.append('picture2', iconSRC);
      formdata.append('picture3', hoverIconSRC);

      axios.post(`${url}/services/add`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          if (response.data.status === 'success') {
            window.scrollTo(0, 0)
            setShowSuccessAlert(true)
            setTimeout(() => {
              setShowSuccessAlert(false)
            }, 2000);
          }

          setServiceName('');
          setShortDescription('');
          setDescription('');
          setImage(null);
          setImageSRC('');
          setHoverIcon(null);
          setHoverIconSRC('');
          setIcon(null);
          setIconSRC('');
          form.reset();
        })
        .catch(error => console.log(error))
    }
  }


  return (
    <div className={style.URSaddNewServiceAndEducation}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Hizmet & eğitim alanı eklendi!
      </div>}
      <form action="#" className={style.addNewServiceAndEducationForm} id='form'>
        <div className={style.nameAndShortDescription}>
          <div>
            <label htmlFor="name">Servis ismi</label>
            <input
              type="text"
              className={style.serviceAndEducationName}
              id="name"
              defaultValue={serviceName}
              onChange={e => setServiceName(e.target.value)}
            />
            {showServiceNameError && <p className="mt-2 text-danger small">Servis ismi boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="shortDescription">Kısa açıklama</label>
            <input type="text" id="shortDescription"
              defaultValue={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
            />
            {showShortDescriptionError && <p className="mt-2 text-danger small">Kısa açıklama kısmı boş bırakılamaz</p>}

          </div>
        </div>

        <div className={style.mt20}>
          <div className={style.description}>
            <label htmlFor="description" >Açıklama</label>
            <CKEditor
              editor={ClassicEditor}
              data={`${description}`}
              onChange={changeEditorData}

            />
            {showDescriptionError && <p className="mt-2 text-danger small">Açıklama kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.mt20}>
          <div className={`row ${style.photoAndIcon}`}>
            <div className="col-lg-4 col-md-12">
              <div className={style.photo}>
                <div>
                  <label htmlFor="photoInput" className={style.photoAndIconLabel}>
                    Fotoğraf seç
                  </label>
                  <input
                    type="file"
                    onChange={onImageChange}
                    className={style.photoInput}
                    id="photoInput"
                  />
                  {showImageError && <p className="mt-2 text-danger small">Fotoğraf kısmı boş bırakılamaz</p>}
                </div>
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className={style.icon}>
                <div>
                  <label htmlFor="iconInput" className={style.photoAndIconLabel}>
                    İcon seç
                  </label>
                  <input
                    type="file"
                    onChange={onIconChange}
                    className={style.iconInput}
                    id="iconInput"
                  />
                  {showIconError && <p className="mt-2 text-danger small">İcon kısmı boş bırakılamaz</p>}
                </div>
                <img src={icon} className={style.addedPhoto} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className={style.hoveredIcon}>
                <div>
                  <label
                    htmlFor="hoverIconInput"
                    className={style.photoAndIconLabel}
                  >
                    Hover icon seç
                  </label>
                  <input
                    type="file"
                    onChange={onHoverIconChange}
                    className={style.hoverIconInput}
                    id="hoverIconInput"
                  />
                  {showHoverIconError && <p className="mt-2 text-danger small">Hover icon kısmı boş bırakılamaz</p>}
                </div>
                <img src={hoverIcon} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink to={'/URSserviceAndEducationPage'} className={style.cancelButton}>İptal et</NavLink>
          <button className={style.addButton} onClick={addService}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
