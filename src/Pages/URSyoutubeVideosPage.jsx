import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSyoutubeVideos/URSyoutubeVideosPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import URSdataYoutubeVideos from "../Data/URSdataYoutubeVideos.json";
import URSeditYoutubeVideo from "../Components/URSyoutubeVideos/URSeditYoutubeVideo";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from '../Components/Loading';


export default function URSyoutubeVideosPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [clickedVideoID, setClicktedVideoID] = useState(0);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(true);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectVideo = useCallback((e) => {
    setClicktedVideoID(e.target.parentElement.dataset.key);
    !selectedVideo ? setSelectedVideo(true) : null;
    e.target.parentElement.dataset.key != clickedVideoID
      ? setSelectedVideo(true)
      : null;

    URSdataYoutubeVideos.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });



  //getData
  const [URSdataYoutubeVideos, setURSdataYoutubeVideos] = useState([]);
  const url = 'https://api.ursdanismanlik.com/v1';
  
  const getData = useCallback(() => {
    axios.get(`${url}/videos`)
      .then(response => setURSdataYoutubeVideos(response.data.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  });
  useEffect(() => {
    getData()
  }, [])


  //editVideo
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  //deleteVideo
  const showDeleteRequest = () => {
    selectedData ? handleShow() : null
  }

  const deleteVideo = useCallback((e) => {
    e.preventDefault();
    fetch(`${url}/video/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": selectedData._id
      })
    }).then(response => { getData() })
      .catch(error => console.log(error))
      .finally(() => {
        handleClose();
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      })

  })
  return (
    <div className={style.URSyoutubeVideosPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.videoTitle : null} videosu listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Videoyu listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.videoTitle : null} videosunu listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteVideo}>
            Videoyu sil
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.URStableComponent}>
        {!editPage ? (
          <div className="tableEventsAndURStable">
            <div className={style.tableEvents}>
              <div className={style.events}>
                <NavLink
                  className={`${style.eventButton} ${style.updateButton}`}
                  onClick={getEditPage} to={'#'}
                >
                  <FaEdit />
                </NavLink>
                <NavLink
                  to={'#'}
                  className={`${style.eventButton} ${style.deleteButton}`}
                  onClick={showDeleteRequest}
                >
                  <FaTrash />
                </NavLink>
                <NavLink
                  className={`${style.eventButton} ${style.addButton}`}
                  to={"/URSyoutubeVideosPage/URSaddNewYoutubeVideo"}
                >
                  <FaPlus />
                </NavLink>
              </div>

              <div className={style.searchOnTable}>
                <input
                  type="text"
                  placeholder="Listede ara"
                  onChange={searchOnTable}
                />
              </div>
            </div>

            <div className={style.URStable}>
              {
                isLoading ? <Loading /> :
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Video ismi</th>
                        <th>URL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {URSdataYoutubeVideos
                        .filter((item) => {
                          if (searchInpVal == "") {
                            return item;
                          } else if (
                            item.videoTitle
                              .toLowerCase()
                              .includes(searchInpVal.toLowerCase()) ||
                            item.link
                              .toLowerCase()
                              .includes(searchInpVal.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => {
                          return (
                            <tr
                              key={index}
                              data-key={item._id}
                              onClick={selectVideo}
                              className={
                                selectedVideo
                                  ? clickedVideoID === item._id
                                    ? style.activeTR
                                    : null
                                  : null
                              }
                            >
                              <td>{item.videoTitle}</td>
                              <td>{item.link}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
              }
            </div>
          </div>
        ) : (
          <div className={style.editPage}>
            <URSeditYoutubeVideo data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
