import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSyoutubeVideos/URSeditYoutubeVideo.module.css";
import axios from 'axios'

export default function URSeditYoutubeVideo(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';


  const [videoTitle, setVideoTitle] = useState(props.data.videoTitle);
  const [link, setLink] = useState(props.data.link)

  const [showVideoTitleError, setShowVideoTitleError] = useState(false);
  const [showLinkError, setShowLinkError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const editVideo = useCallback((e) => {
    e.preventDefault();
    videoTitle ? setShowVideoTitleError(false) : setShowVideoTitleError(true);
    link ? setShowLinkError(false) : setShowLinkError(true);

    if (videoTitle && link) {
      var formdata = new FormData();
      formdata.append("id", props.data._id);
      formdata.append("videoTitle", videoTitle);
      formdata.append("link", link);
      axios.put(`${url}/video/edit`, formdata, {
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
    }
  })

  return (
    <div className={style.URSeditYoutubeVideo}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Video değiştirildi!
      </div>}
      <form action="#" className={style.editYoutubeVideoForm}>
        <div className={style.nameAndUrl}>
          <div>
            <label htmlFor="videoNameInput">Video ismi</label>
            <input
              type="text"
              className={style.videoName}
              defaultValue={videoTitle}
              id="videoNameInput"
              onChange={e => setVideoTitle(e.target.value)}
            />
            {showVideoTitleError && <p className="mt-2 text-danger small">Video ismi boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="videoUrlInput">URL</label>
            <input
              type="text"
              className={style.videoUrl}
              defaultValue={link}
              id="videoUrlInput"
              onChange={e => setLink(e.target.value)}
            />
            {showLinkError && <p className="mt-2 text-danger small">URL kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>Geri dön</button>
          <button className={style.addButton} onClick={editVideo}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
