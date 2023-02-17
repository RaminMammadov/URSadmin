import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSyoutubeVideos/URSaddNewYoutubeVideo.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";


export default function URSaddNewYoutubeVideo() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [videoTitle, setVideoTitle] = useState('');
  const [link, setLink] = useState('');

  const [showVideoTitleError, setShowVideoTitleError] = useState(false);
  const [showLinkError, setShowLinkError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const addVideo = (e) => {
    e.preventDefault();

    videoTitle ? setShowVideoTitleError(false) : setShowVideoTitleError(true);
    link ? setShowLinkError(false) : setShowLinkError(true);

    if (videoTitle && link) {
      const url = 'https://api.ursdanismanlik.com/v1';
      axios.post(`${url}/video/add`, {
        "videoTitle": videoTitle,
        "link": link
      })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        .finally(() => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
          form.reset();
        })
    }
  }
  return (
    <div className={style.URSaddNewYoutubeVideo}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Yeni video eklendi!
      </div>}
      <form action="#" id='form' className={style.addNewYoutubeVideoForm}>
        <div className={style.name}>
          <div>
            <label htmlFor="videoNameInput">Video ismi</label>
            <input
              type="text"
              className={style.videoName}
              id="videoNameInput"
              defaultValue={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
            />
            {showVideoTitleError && <p className="mt-2 text-danger small">Video ismi boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="videoUrlInput">URL</label>
            <input type="text" className={style.url} id="videoUrlInput" defaultValue={link} onChange={e => setLink(e.target.value)} />
            {showLinkError && <p className="mt-2 text-danger small">URL kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink to={'/URSyoutubeVideosPage'} className={style.cancelButton}>Geri dön</NavLink>
          <button className={style.addButton} onClick={addVideo}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
