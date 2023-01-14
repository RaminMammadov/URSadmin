import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSyoutubeVideos/URSaddNewYoutubeVideo.module.css";

export default function URSaddNewYoutubeVideo() {
  return (
    <div className={style.URSaddNewYoutubeVideo}>
      <form action="#" className={style.addNewYoutubeVideoForm}>
        <div className={style.name}>
          <div>
            <label htmlFor="videoNameInput">Video ismi</label>
            <input
              type="text"
              className={style.videoName}
              id="videoNameInput"
            />
          </div>

          <div>
            <label htmlFor="videoUrlInput">URL</label>
            <input type="text" className={style.url} id="videoUrlInput" />
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
