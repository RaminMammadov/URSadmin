import React, { useState, useCallback, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import URSdataOffices from "../../Data/URSdataOffices.json";
import URSeditOffices from "./URSeditOffices";
import style from "../../assets/css/URScontact/URSoffices.module.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from "../Loading";

export default function URSmentorsPage() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(false);
  const [clickedOfficeID, setClickedOfficeID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const selectOffice = useCallback((e) => {
    setClickedOfficeID(e.target.parentElement.dataset.key);
    !selectedOffice ? setSelectedOffice(true) : null;
    e.target.parentElement.dataset.key != clickedOfficeID
      ? setSelectedOffice(true)
      : null;

    URSdataOffices.filter((item) => {
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
  const [URSdataOffices, setURSdataOffices] = useState([]);
  const getData = useCallback(() => {
    axios.get(`${url}/offices`)
      .then(response => setURSdataOffices(response.data.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  });
  useEffect(() => {
    getData()
  }, [])

  //editData
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  //deleteData
  const showDeleteRequest = () => {
    selectedData ? handleShow() : null
  }

  const deleteOffice = () => {
    fetch(`${url}/office/delete`, {
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
  console.log(URSdataOffices)

  return (
    <div className={style.URSoffices}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.name : null} ofisi listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ofisi listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.name : null} ofisini listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteOffice}>
            Ofisi sil
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
                  onClick={showDeleteRequest}
                  className={`${style.eventButton} ${style.deleteButton}`}
                >
                  <FaTrash />
                </NavLink>
                <NavLink
                  className={`${style.eventButton} ${style.addButton}`}
                  to={"/URSconcactPage/URSaddNewOffice"}
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
                        <th>Ofis ismi</th>
                        <th>Konum</th>
                      </tr>
                    </thead>

                    <tbody>
                      {URSdataOffices
                        .filter((item) => {
                          if (searchInpVal == "") {
                            return item;
                          } else if (
                            item.name
                              .toLowerCase()
                              .includes(searchInpVal.toLowerCase()) ||
                            item.address
                              .toLowerCase()
                              .includes(searchInpVal.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => {
                          return (
                            <tr
                              key={item._id}
                              data-key={item._id}
                              onClick={selectOffice}
                              className={
                                selectedOffice
                                  ? clickedOfficeID === item._id
                                    ? style.activeTR
                                    : null
                                  : null
                              }
                            >
                              <td>{item.name}</td>
                              <td>{item.address}</td>
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
            <URSeditOffices data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
