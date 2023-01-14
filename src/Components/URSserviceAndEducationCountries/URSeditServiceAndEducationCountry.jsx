import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSserviceAndEducationCountries/URSeditServiceAndEducationCountry.module.css";

export default function URSeditServiceAndEducationCountry(props) {
  const [image, setImage] = useState(null);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });

  return (
    <div className={style.URSeditServiceAndEducationCountry}>
      <form action="#" className={style.URSeditServiceAndEducationCountryForm}>
        <div className={style.nameAndPhoto}>
          <div>
            <label htmlFor="countryNameInput">Ülke ismi</label>
            <input
              type="text"
              className={style.countryName}
              value={props.data.name}
              id="countryNameInput"
            />
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
          <button className={style.addButton}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
