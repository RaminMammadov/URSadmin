import React, { useState, useCallback } from "react";
import style from "../../assets/css//URSserviceAndEducation/URSaddNewServiceAndEducation.module.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function URSaddNewServiceAndEducation() {
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [hoverIcon, setHoverIcon] = useState(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });

  const onIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setIcon(URL.createObjectURL(event.target.files[0]));
    }
  });

  const onHoverIconChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setHoverIcon(URL.createObjectURL(event.target.files[0]));
    }
  });

  return (
    <div className={style.URSaddNewServiceAndEducation}>
      <form action="#" className={style.addNewServiceAndEducationForm}>
        <div className={style.nameAndShortDescription}>
          <div>
            <label htmlFor="name">İsim</label>
            <input
              type="text"
              className={style.serviceAndEducationName}
              id="name"
            />
          </div>

          <div>
            <label htmlFor="shortDescription">Kısa açıklama</label>
            <input type="text" id="shortDescription" />
          </div>
        </div>
        <div className={style.description}>
          <label htmlFor="description">Açıklama</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            id="description"
          />
        </div>

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

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
