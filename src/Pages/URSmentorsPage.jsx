import React, { useState, useCallback, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { URSdataMentors } from "../Data/URSdataMentors.js";
import URSeditMentor from "../Components/URSmentors/URSeditMentor";
import style from "../assets/css/URSmentors/URSmentors.module.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from '../Components/Loading';

export default function URSmentorsPage() {
  axios.defaults.withCredentials = true;
  const url = 'https://185.48.182.52/v1';

  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedMentors, setSelectedMentors] = useState(false);
  const [clickedMentorID, setClickedMentorID] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const selectMentor = useCallback((e) => {
    setClickedMentorID(e.target.parentElement.dataset.key);
    !selectedMentors ? setSelectedMentors(true) : null;
    e.target.parentElement.dataset.key != clickedMentorID
      ? setSelectedMentors(true)
      : null;

    URSdataMentors.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });




  //getData
  const [URSdataMentors, setURSdataMentors] = useState([]);
  const getData = useCallback(() => {
    axios.get(`${url}/mentors`)
      .then(response => setURSdataMentors(response.data.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  });
  useEffect(() => {
    getData()
  }, [])


  //editMentor
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  //deleteMentor
  const showDeleteRequest = () => {
    selectedData ? handleShow() : null
  }
  const deleteMentor = useCallback(() => {
    fetch(`${url}/mentor/delete`, {
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
    <div className={style.URSmentorsPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.name : null} mentoru listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mentoru listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.name : null} mentorunu listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteMentor}>
            Mentoru sil
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
                  to={"/URSmentorsPage/URSaddNewMentor"}
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
                        <th>Mentor ismi</th>
                        <th>Hizmet alanı</th>
                      </tr>
                    </thead>

                    <tbody>
                      {URSdataMentors.filter((item) => {
                        if (searchInpVal == "") {
                          return item;
                        } else if (
                          item.name
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.serviceType
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase())
                          ||
                          item.surName
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
                            onClick={selectMentor}
                            className={
                              selectedMentors
                                ? clickedMentorID === item._id
                                  ? style.activeTR
                                  : null
                                : null
                            }
                          >
                            <td>{item.name} {item.surName}</td>
                            <td>{item.serviceType}</td>
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
            <URSeditMentor data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
