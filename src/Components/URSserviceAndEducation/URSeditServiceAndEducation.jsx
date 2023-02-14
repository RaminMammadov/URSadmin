import React, { useState, useCallback, useEffect } from "react";
import style from "../../assets/css/URSserviceAndEducation/URSeditServiceAndEducation.module.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { mdiWindowShutter } from "@mdi/js";

export default function URSeditServiceAndEducation(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://185.48.182.52/v1';
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [serviceName, setServiceName] = useState(props.data.title);
  const [shortDescription, setShortDescription] = useState(props.data.shortDescription);
  const [description, setDescription] = useState(props.data.description);

  const [image, setImage] = useState(`https://185.48.182.52/uploads/${props.data.picture1}`);
  const [imageSRC, setImageSRC] = useState('');

  const [icon, setIcon] = useState(`https://185.48.182.52/uploads/${props.data.picture2}`);
  const [iconSRC, setIconSRC] = useState('');

  const [hoverIcon, setHoverIcon] = useState(`https://185.48.182.52/uploads/${props.data.picture3}`);
  const [hoverIconSRC, setHoverIconSRC] = useState('');

  const [showServiceNameError, setShowServiceNameError] = useState(false);
  const [showShortDescriptionError, setShowShortDescriptionError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageSRC(event.target.files[0]);
    }
  });

  const onIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setIcon(URL.createObjectURL(event.target.files[0]));
      setIconSRC(event.target.files[0])
    }
  });

  const onHoverIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setHoverIcon(URL.createObjectURL(event.target.files[0]));
      setHoverIconSRC(event.target.files[0]);
    }
  });

  //editor
  const changeEditorData = (event, editor) => {
    const data = editor.getData();
    setDescription(data)
  }


  console.log(props.data._id)


  //updateServce
  const updateService = useCallback((e) => {
    e.preventDefault();
    var formdata = new FormData();

    serviceName.trim() ? setShowServiceNameError(false) : setShowServiceNameError(true);
    shortDescription.trim() ? setShowShortDescriptionError(false) : setShowShortDescriptionError(true);
    description.trim() ? setShowDescriptionError(false) : setShowDescriptionError(true);
    formdata.append("id", props.data._id)
    formdata.append("title", serviceName)
    formdata.append("shortDescription", shortDescription)
    formdata.append("description", description)
    formdata.append("picture1", imageSRC)
    formdata.append("picture2", iconSRC)
    formdata.append("picture3", hoverIconSRC)
    axios.put(`${url}/services/edit`, formdata, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        window.scrollTo(0, 0)
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      })
      .catch(error => console.log(error))
  })

  return (
    <div className={style.URSeditServiceAndEducation}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Hizmet & eğitim alanı değiştirildi!
      </div>}
      <form action="#" className={style.URSeditServiceAndEducationForm}>
        <div className={style.nameAndShortDescription}>
          <div>
            <label htmlFor="nameInput">Servis ismi</label>
            <input
              type="text"
              className={style.serviceAndEducationName}
              id="nameInput"
              defaultValue={serviceName}
              onChange={e => setServiceName(e.target.value)}
            />
            {showServiceNameError && <p className="mt-2 text-danger small">Servis ismi boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="shortDescription">Kısa açıklama</label>
            <input
              type="text"
              id="shortDescription"
              defaultValue={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
            />
            {showShortDescriptionError && <p className="mt-2 text-danger small">Kısa açıklama kısmı boş bırakılamaz</p>}
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
                </div>
                <img src={image} className={style.addedPhoto} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className={style.icon}>
                <div>
                  <label
                    htmlFor="iconInput"
                    className={style.photoAndIconLabel}
                  >
                    İcon seç
                  </label>
                  <input
                    type="file"
                    onChange={onIconChange}
                    className={style.iconInput}
                    id="iconInput"
                  />
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
                </div>
                <img src={hoverIcon} className={style.addedPhoto} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>Geri dön</button>
          <button className={style.addButton} onClick={updateService}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
