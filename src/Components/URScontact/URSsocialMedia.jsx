import React from "react";
import style from "../../assets/css/URScontact/URSsocialMedia.module.css";

export default function URSsocialMedia() {
  return (
    <div className={style.URSsocialMedia}>
      <form action="#" className={style.URSsocialMediaForm}>
        <div>
          <label htmlFor="youtubeInput">Youtube</label>
          <input
            type="text"
            className={style.socialMediaUrl}
            id="youtubeInput"
          />
        </div>

        <div>
          <label htmlFor="facebookInput">Facebook</label>
          <input
            type="text"
            className={style.socialMediaUrl}
            id="facebookInput"
          />
        </div>

        <div>
          <label htmlFor="instagramInput">Instagram</label>
          <input
            type="text"
            className={style.socialMediaUrl}
            id="instagramInput"
          />
        </div>

        <div>
          <label htmlFor="tiktokInput">Tiktok</label>
          <input
            type="text"
            className={style.socialMediaUrl}
            id="tiktokInput"
          />
        </div>

        <div>
          <label htmlFor="telegramInput">Telegram</label>
          <input
            type="text"
            className={style.socialMediaUrl}
            id="telegramInput"
          />
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
