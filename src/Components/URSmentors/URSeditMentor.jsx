import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSmentors/URSeditMentor.module.css";

export default function URSeditPortfolio(props) {
  const [image, setImage] = useState(null);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });
  return (
    <div className={style.URSeditMentor}>
      <form action="#" className={style.URSeditMentorForm}>
        <div className={style.nameAndDepartment}>
          <div>
            <label htmlFor="mentorNameInput">Mentor ismi</label>
            <input
              type="text"
              className={style.mentorName}
              value={props.data.name}
              id="mentorNameInput"
            />
          </div>

          <div>
            <label htmlFor="departmentInput">Hizmet alanı</label>
            <input
              type="text"
              value={props.data.department}
              id="departmentInput"
            />
          </div>
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
          <button className={style.addButton}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
