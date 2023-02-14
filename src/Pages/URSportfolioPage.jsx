import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSportfolio/URSportfolioPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { URSdataPortfolio } from "../Data/URSdataPortfolioPage.js";
import URSeditPortfolio from "../Components/URSportfolio/URSeditPortfolio";
import axios from "axios";
import Loading from "../Components/Loading";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";


export default function URSportfolioPage() {
  axios.defaults.withCredentials = true;
  const url = 'https://185.48.182.52/v1';

  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(false);
  const [clickedPortfolioID, setClickedPortfolioID] = useState(0);

  const [selectedData, setSelectedData] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null


  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectPortfolio = useCallback((e) => {
    setClickedPortfolioID(e.target.parentElement.dataset.key);
    !selectedPortfolio ? setSelectedPortfolio(true) : null;
    e.target.parentElement.dataset.key != clickedPortfolioID
      ? setSelectedPortfolio(true)
      : null;

    URSdataPortfolio.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });



  //getData
  const [URSdataPortfolio, setURSdataPortfolio] = useState([]);
  const getData = useCallback(() => {
    axios.get(`${url}/portfolios`)
      .then(response => setURSdataPortfolio(response.data.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  });
  useEffect(() => {
    getData()
  }, [])

  //editpage
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  const showDeleteRequest = () => {
    selectedData ? handleShow() : null
  }
  const deletePortfolio = useCallback(() => {
    fetch(`${url}/portfolio/delete`, {
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
    <div className={style.URSportfolioPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.serviceName : null} Hizmet & Eğitim alanını listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hizmet & Eğitim alanını listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.serviceName : null} Hizmet & Eğitim alanını listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deletePortfolio}>
            Hizmet & Eğitim alanını sil
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
                  onClick={getEditPage}
                  to={'#'}
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
                  to={"/URSportfolioPage/URSaddNewPortfolio"}
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
                        <th>Servis ismi</th>
                        <th>Marka ismi</th>
                        <th>Açıklama</th>
                      </tr>
                    </thead>

                    <tbody>
                      {URSdataPortfolio.filter((item) => {
                        if (searchInpVal == "") {
                          return item;
                        } else if (
                          item.serviceName
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.marka
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.description
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase())
                        ) {
                          return item;
                        }
                      }).map((item, index) => {
                        return (
                          <tr
                            key={item._id}
                            data-key={item._id}
                            onClick={selectPortfolio}
                            className={
                              selectedPortfolio
                                ? clickedPortfolioID === item._id
                                  ? style.activeTR
                                  : null
                                : null
                            }
                          >
                            <td>{item.serviceName}</td>
                            <td>{item.marka}</td>
                            <td>{item.description}</td>
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
            <URSeditPortfolio data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
