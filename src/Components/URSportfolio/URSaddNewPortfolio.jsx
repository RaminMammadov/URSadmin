import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSportfolio/URSaddNewPortfolio.module.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function URSaddNewPortfolio() {
  const [image, setImage] = useState(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });

  return (
    <div className={style.URSaddNewPortfolio}>
      <form action="#" className={style.URSaddNewPortfolioForm}>
        <div className={style.nameAndBrand}>
          <div>
            <label htmlFor="serviceNameInput">Servis ismi</label>
            <input
              type="text"
              className={style.serviceName}
              id="serviceNameInput"
            />
          </div>

          <div>
            <label htmlFor="brandNameInput">Marka ismi</label>
            <input type="text" id="brandNameInput" />
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
