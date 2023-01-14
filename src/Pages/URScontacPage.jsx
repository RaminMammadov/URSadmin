import React, { useState, useCallback } from 'react';
import style from '../assets/css/URScontact/URScontactPage.module.css';
import URSsocialMedia from '../Components/URScontact/URSsocialMedia';
import URSoffices from '../Components/URScontact/URSoffices';
import URStools from '../Components/URScontact/URStools';

export default function URScontacPage() {
  const [showTools,setShowTools] = useState(true);
  const [showSocialMedia,setShowSocialMedia] = useState(false);
  const [showOffices,setShowOffices] = useState(false);

  const getTools = useCallback( e => {
    showTools ? setShowTools(false) : setShowTools(true);
    setShowSocialMedia(false);
    setShowOffices(false);
  });
  const getSocialMedia = useCallback( e => {
    showSocialMedia ? setShowSocialMedia(false) : setShowSocialMedia(true);
    setShowTools(false);
    setShowOffices(false);
  })
  const getOffices = useCallback( e => {
    showOffices ? setShowOffices(false) : setShowOffices(true);
    setShowTools(false);
    setShowSocialMedia(false);
  })
  return (
    <div className={style.URScontactPage}>
      <div className={style.URSContactHeader}>
          <div className={style.headerLinks}>
            <div className={style.headerLink} style={showTools ? {"color":"#fcba00"} : {"color":"#000"}} onClick={getTools}>Araçlar</div>
            <div className={style.headerLink} style={showSocialMedia ? {"color":"#fcba00"} : {"color":"#000"}} onClick={getSocialMedia}>Sosyal medya</div>
            <div className={style.headerLink} style={showOffices ? {"color":"#fcba00"} : {"color":"#000"}} onClick={getOffices}>Ofislerimiz</div>
          </div>
      </div>

      <div className={style.URStabs}>
          {showTools ? <div className="tools"><URStools /></div> : null}
          {showSocialMedia ? <div className="socialMedia"><URSsocialMedia /></div> : null}
          {showOffices ? <div className="offices"><URSoffices /></div> : null}
      </div>
      
    </div>
  )
}
