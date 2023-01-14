import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSmentors/URSaddNewMentor.module.css";

export default function URSaddNewMentor() {
  const [image, setImage] = useState(null);

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });

  return (
    <div className={style.URSaddNewMentor}>
      <form action="#" className={style.URSaddNewMentorForm}>
        <div className={style.nameAndDepartment}>
          <div>
            <label htmlFor="mentorNameInput">Mentor ismi</label>
            <input
              type="text"
              className={style.mentorName}
              id="mentorNameInput"
            />
          </div>

          <div>
            <label htmlFor="departmentInput">Hizmet alanı</label>
            <input type="text" id="departmentInput" />
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
          <button className={style.addButton}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
