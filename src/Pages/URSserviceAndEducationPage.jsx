import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSserviceAndEducation/URSserviceAndEducationPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import URSdataServiceAndEducation from "../Data/URSdataServiceAndEducation.json";
import URSeditServiceAndEducation from "../Components/URSserviceAndEducation/URSeditServiceAndEducation";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from '../Components/Loading';

export default function URSserviceAndEducationPage() {
  axios.defaults.withCredentials = true;
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedServiceAndEducation, setSelectedServiceAndEducation] =
    useState(false);
  const [clickedServiceAndEducationID, setClickedServiceAndEducationID] =
    useState(0);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectServiceAndEducation = useCallback((e) => {
    setClickedServiceAndEducationID(
      e.target.parentElement.dataset.key
    );
    !selectedServiceAndEducation ? setSelectedServiceAndEducation(true) : null;
    e.target.parentElement.dataset.key != clickedServiceAndEducationID
      ? setSelectedServiceAndEducation(true)
      : null;

    URSdataServiceAndEducation.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });


  //deleteModal
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(true)


  //getData
  const [URSdataServiceAndEducation, setURSdataServiceAndEducation] = useState([]);
  const url = 'https://api.ursdanismanlik.com/v1';

  const getData = useCallback(() => {
    axios.get(`${url}/services`)
      .then(response => setURSdataServiceAndEducation(response.data.data))
      .catch(error => console.log(error)).finally(() => {
        setLoading(false)
      })
  })
  useEffect(() => {
    getData()
  }, [])

  //editpage
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });


  const showDeleteRequest = () => {
    if (selectedData) {
      handleShow();
    }
  }
  //deleteService
  const deleteService = () => {
    if (selectedData) {
      fetch(`${url}/services/delete`, {
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
    }
  }


  return (
    <div className={style.URSserviceAndEducationPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Hizmet & eğitim alanı listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hizmet & eğitim alanını listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.title : null} Hizmet & eğitim alanını listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteService}>
            Hizmet & eğitim alanını sil
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
                  className={`${style.eventButton} ${style.deleteButton}`}
                  onClick={showDeleteRequest}
                  to={'#'}
                >
                  <FaTrash />
                </NavLink>
                <NavLink
                  className={`${style.eventButton} ${style.addButton}`}
                  to={
                    "/URSserviceAndEducationPage/URSaddNewServiceAndEducation"
                  }
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
              {isLoading ? <Loading /> :

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ad</th>
                      <th>Qısa təsvir</th>
                      <th>Təsvir</th>
                    </tr>
                  </thead>

                  <tbody>
                    {URSdataServiceAndEducation
                      .filter((item) => {
                        if (searchInpVal == "") {
                          return item;
                        } else if (
                          item.title
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.shortDescription
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.description
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
                            onClick={selectServiceAndEducation}
                            className={
                              selectedServiceAndEducation
                                ? clickedServiceAndEducationID === item._id
                                  ? style.activeTR
                                  : null
                                : null
                            }
                          >
                            <td>{item.title}</td>
                            <td>{item.shortDescription}</td>
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
            <URSeditServiceAndEducation data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
