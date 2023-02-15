import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSserviceAndEducation/URSserviceAndEducationPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import URSdataCountries from "../Data/URSdataCountries.json";
import URSeditServiceAndEducationCountry from "../Components/URSserviceAndEducationCountries/URSeditServiceAndEducationCountry";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from '../Components/Loading';



export default function URSserviceAndEducationCountriesPage() {
  axios.defaults.withCredentials = true;

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(true);

  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState(false);
  const [clickedCountryID, setClickedCountryID] =
    useState(0);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectCountry = useCallback((e) => {
    setClickedCountryID(
      e.target.parentElement.dataset.key
    );
    !selectedCountry ? setSelectedCountry(true) : null;
    e.target.parentElement.dataset.key != clickedCountryID
      ? setSelectedCountry(true)
      : null;

    URSdataCountries.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });


  //getData
  const [URSdataCountries, setURSdataCountries] = useState([]);
  const url = 'https://api.ursdanismanlik.com/v1';

  const getData = useCallback(() => {
    axios.get(`${url}/countries`)
      .then(response => setURSdataCountries(response.data.data))
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

  //deleteService
  const showDeleteRequest = () => {
    if (selectedData) {
      handleShow();
    }
  }

  const deleteCountry = (e) => {
    fetch(`${url}/country/delete`, {
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



  return (
    <div className={style.URSserviceAndEducationPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.countryName : null} ülkesi listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ülkeyi listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.countryName : null} ülkesini listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteCountry}>
            Ülkeyi sil
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
                  onClick={showDeleteRequest}
                  className={`${style.eventButton} ${style.deleteButton}`}
                >
                  <FaTrash />
                </NavLink>
                <NavLink
                  className={`${style.eventButton} ${style.addButton}`}
                  to={
                    "/URSserviceAndEducationCountriesPage/URSaddNewServiceAndEducationCountry"
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
              {
                isLoading ? <Loading /> :
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Ülke ismi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {URSdataCountries
                        .filter((item) => {
                          if (searchInpVal == "") {
                            return item;
                          } else if (
                            item.countryName
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
                              onClick={selectCountry}
                              className={
                                selectedCountry
                                  ? clickedCountryID === item._id
                                    ? style.activeTR
                                    : null
                                  : null
                              }
                            >
                              <td>{item.countryName}</td>
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
            <URSeditServiceAndEducationCountry
              data={selectedData}
            />
          </div>
        )}
      </div>
    </div>
  )
}
