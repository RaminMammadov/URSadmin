import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSmentors/URSeditMentor.module.css";
import axios from "axios";

export default function URSeditPortfolio(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';


  const [image, setImage] = useState(`https://api.ursdanismanlik.com/uploads/${props.data.picture}`);
  const [imageURL, setImageURL] = useState('');
  const [mentorName, setMentorName] = useState(props.data.name);
  const [mentorSurname, setMentorSurname] = useState(props.data.surName);
  const [serviceType, setServiceType] = useState(props.data.serviceType);

  const [showNameError, setShowNameError] = useState(false);
  const [showSurNameError, setShowSurNameError] = useState(false);
  const [showServiceTypeError, setShowServiceType] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageURL(event.target.files[0]);
    }
  });

  const editMentor = useCallback((e) => {
    e.preventDefault();

    if (imageURL) {
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("name", mentorName);
      formdata.append("surName", mentorSurname);
      formdata.append("serviceType", serviceType);
      formdata.append("picture", imageURL);

      axios.put(`${url}/mentor/edit`, formdata, {
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
      mentorName ? setShowNameError(false) : setShowNameError(true);
      mentorSurname ? setShowSurNameError(false) : setShowSurNameError(true);
      serviceType ? setShowServiceType(false) : setShowServiceType(true);

      if (mentorName && mentorSurname && serviceType) {
        var formdata = new FormData();
        formdata.append("id", props.data._id);
        formdata.append("name", mentorName);
        formdata.append("surName", mentorSurname);
        formdata.append("serviceType", serviceType);

        axios.put(`${url}/mentor/edit`, formdata, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
          .then(response => {
            console.log(response.data)
            setShowSuccessAlert(true)
            setTimeout(() => {
              setShowSuccessAlert(false)
            }, 2000);
          })
          .catch(error => console.log(error))
      }
    }
  })
  return (
    <div className={style.URSeditMentor}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Mentor değiştirildi!
      </div>}
      <form action="#" className={style.URSeditMentorForm}>
        <div className={style.nameAndDepartment}>
          <div>
            <label htmlFor="mentorNameInput">Mentor ismi</label>
            <input
              type="text"
              className={style.mentorName}
              defaultValue={mentorName}
              onChange={e => setMentorName(e.target.value)}
              id="mentorNameInput"
            />
            {showNameError && <p className="mt-2 text-danger small">Mentor soy ismi boş bırakılamaz</p>}
          </div>


          <div className={style.mt20}>
            <label htmlFor="mentorNameInput">Mentor soy ismi</label>
            <input
              type="text"
              className={style.mentorName}
              defaultValue={mentorSurname}
              onChange={e => setMentorSurname(e.target.value)}
              id="mentorNameInput"
            />
            {showSurNameError && <p className="mt-2 text-danger small">Mentor soy ismi boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="departmentInput">Hizmet alanı</label>
            <input
              type="text"
              defaultValue={serviceType}
              onChange={e => setServiceType(e.target.value)}
              id="departmentInput"
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
                  </div>
                  <img src={image} className={style.addedPhoto} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>Geri dön</button>
          <button className={style.addButton} onClick={editMentor}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
