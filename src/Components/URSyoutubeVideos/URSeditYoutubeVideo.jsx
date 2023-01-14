import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSyoutubeVideos/URSeditYoutubeVideo.module.css";

export default function URSeditYoutubeVideo(props) {
  return (
    <div className={style.URSeditYoutubeVideo}>
      <form action="#" className={style.editYoutubeVideoForm}>
        <div className={style.nameAndUrl}>
          <div>
            <label htmlFor="videoNameInput">Video ismi</label>
            <input
              type="text"
              className={style.videoName}
              value={props.data.name}
              id="videoNameInput"
            />
          </div>

          <div>
            <label htmlFor="videoUrlInput">URL</label>
            <input
              type="text"
              className={style.videoUrl}
              value={props.data.url}
              id="videoUrlInput"
            />
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
