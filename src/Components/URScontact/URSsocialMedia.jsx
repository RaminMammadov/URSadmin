import React, { useState, useEffect } from "react";
import style from "../../assets/css/URScontact/URSsocialMedia.module.css";
import axios from "axios";
import Loading from "../Loading";
import { mdiConsoleNetworkOutline } from "@mdi/js";

export default function URSsocialMedia() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';


  const [isLoading, setLoading] = useState(true);

  const [whatsApp, setWhatsApp] = useState('');
  const [whatsAppID, setWhatsAppID] = useState('');

  const [telegram, setTelegram] = useState('');
  const [telegramID, setTelegramID] = useState('');

  const [youtube, setYoutube] = useState('');
  const [youtubeID, setYoutubeID] = useState('');

  const [faceebook, setFacebook] = useState('');
  const [faceebookID, setFacebookID] = useState('');

  const [instagram, setInstagram] = useState('');
  const [instagramID, setInstagramID] = useState('');

  const [tiktok, setTiktok] = useState('');
  const [tiktokID, setTiktokID] = useState('');

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const getData = () => {
    axios.get(`${url}/socials`)
      .then(response => {
        response.data.data.map(item => {
          switch (item.name) {
            case 'WhatsApp':
              setWhatsApp(item.link)
              setWhatsAppID(item._id)
              break;
            case 'Facebook':
              setFacebook(item.link)
              setFacebookID(item._id)
              break;
            case 'Youtube':
              setYoutube(item.link)
              setYoutubeID(item._id)
              break;
            case 'Instagram':
              setInstagram(item.link)
              setInstagramID(item._id)
              break;
            case 'Telegram':
              setTelegram(item.link)
              setTelegramID(item._id)
              break;
            case 'Tiktok':
              setTiktok(item.link)
              setTiktokID(item._id)
              break;
          }
        })
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  const updateSocial = (e) => {
    e.preventDefault();
    let data = {};
    switch (e.target.dataset.key) {
      case 'Youtube':
        data = { "id": youtubeID, "name": "Youtube", "link": youtube }
        break;
      case 'WhastApp':
        data = { "id": whatsAppID, "name": "WhatsApp", "link": whatsApp }
        break;
      case 'Telegram':
        data = { "id": telegramID, "name": "Telegram", "link": telegram }
        break;
      case 'Instagram':
        data = { "id": instagramID, "name": "Instagram", "link": instagram }
        break;
      case 'Facebook':
        data = { "id": faceebookID, "name": "Facebook", "link": faceebook }
        break;
      case 'Tiktok':
        data = { "id": tiktokID, "name": "Tiktok", "link": tiktok }
        break;
    }
    axios.put(`${url}/social/edit`, data).then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => {
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      })
  }
  return (
    <div className={style.URSsocialMedia}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Sosial media linkleri değiştirildi!
      </div>}
      {
        isLoading ? <Loading /> :
          <form action="#" className={style.URSsocialMediaForm}>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="youtubeInput">Youtube</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="youtubeInput"
                  defaultValue={youtube}
                  onChange={e => setYoutube(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="Youtube" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="whatsAppInput">WhatsApp</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="whatsAppInput"
                  defaultValue={whatsApp}
                  onChange={e => setWhatsApp(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="WhastApp" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="telegramInput">Telegram</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="telegramInput"
                  defaultValue={telegram}
                  onChange={e => setTelegram(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="Telegram" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="instagramInput">Instagram</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="instagramInput"
                  defaultValue={instagram}
                  onChange={e => setInstagram(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="Instagram" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="facebookInput">Facebook</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="facebookInput"
                  defaultValue={faceebook}
                  onChange={e => setFacebook(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="Facebook" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
            <div className={style.socialMediaInputAndAddButton}>
              <div>
                <label htmlFor="tiktokInput">Tiktok</label>
                <input
                  type="text"
                  className={style.socialMediaUrl}
                  id="tiktokInput"
                  defaultValue={tiktok}
                  onChange={e => setTiktok(e.target.value)}
                />
              </div>
              <div>
                <button className={style.addButton} data-key="Tiktok" onClick={updateSocial}>Düzenle</button>
              </div>
            </div>
          </form>
      }
    </div>
  );
}
