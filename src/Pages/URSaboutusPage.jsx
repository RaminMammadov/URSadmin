import React, { useState, useCallback } from "react";
import style from "../assets/css/URSaboutUs/URSaboutUsPage.module.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function URSaboutusPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [image, setImage] = useState(null);
  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  });

  return (
    <div className={style.URSaboutusPage}>
      <div className="container p-0">
        <div className="row">
          <div className="col-12 col-lg-6">
            <form className={style.URSaboutUsForm}>
              <div className={style.pageHeading}>
                <label htmlFor="">Başlık</label>
                <input type="text" className={style.heading} />
              </div>
              <div>
                <label htmlFor="">Açıklama</label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-6">
            <div className={style.photo}>
              <div>
                <label htmlFor="photoInput" className={style.photoAndIconLabel}>
                  Fotoğrafı değiştir
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

          <div className={style.cancelButtonAndAddButton}>
                <button className={style.cancelButton}>İptal et</button>
                <button className={style.addButton}>Ekle</button>
              </div>
        </div>
      </div>
    </div>
  );
}
