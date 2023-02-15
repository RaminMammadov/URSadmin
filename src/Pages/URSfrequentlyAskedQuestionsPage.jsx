import React, { useState, useCallback, useEffect } from "react";
import style from "../assets/css/URSfrequentlyAskedQuestions/URSfrequentlyAskedQuestionPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import URSdataFrequentlyAskedQuestions from "../Data/URSdataFrequentlyAskedQuestions.json";
import URSeditFrequentlyAskedQuestion from "../Components/URSfrequentlyAskedQuestions/URSeditFrequentlyAskedQuestion";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Loading from '../Components/Loading';


export default function URSfrequentlyAskedQuestionsPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [clickedQuestionID, setClickedQuestionID] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(true);

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectQuestion = useCallback((e) => {
    setClickedQuestionID(e.target.parentElement.dataset.key);
    !selectedQuestion ? setSelectedQuestion(true) : null;
    e.target.parentElement.dataset.key != clickedQuestionID
      ? setSelectedQuestion(true)
      : null;

    URSdataFrequentlyAskedQuestions.filter((item) => {
      item._id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });


  //getData
  const [URSdataFrequentlyAskedQuestions, setURSdataFrequentlyAskedQuestions] = useState([]);
  const url = 'https://api.ursdanismanlik.com/v1';

  const getData = useCallback(() => {
    axios.get(`${url}/faqs`)
      .then(response => setURSdataFrequentlyAskedQuestions(response.data.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  });
  useEffect(() => {
    getData()
  }, [])

  //editQuestion
  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  //deleteQuestion
  const showDeleteRequest = () => {
    selectedData ? handleShow() : null
  }

  const deleteQuestion = useCallback((e) => {
    e.preventDefault();
    fetch(`${url}/faq/delete`, {
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
    <div className={style.URSfrequentlyAskedQuestions}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        {selectedData ? selectedData.question : null} sorusu listeden silindi!
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Soruyu listeden sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? selectedData.question : null} sorusunu listeden silmek istediğine eminmisin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="danger" onClick={deleteQuestion}>
            Soruyu sil
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
                  to={
                    "/URSfrequentlyAskedQuestionsPage/URSaddNewFrequentlyAskedQuestion"
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
                  <th>Soru</th>
                  <th>Cevab</th>
                </tr>
              </thead>

                  <tbody>
                    {URSdataFrequentlyAskedQuestions
                      .filter((item) => {
                        if (searchInpVal == "") {
                          return item;
                        } else if (
                          item.question
                            .toLowerCase()
                            .includes(searchInpVal.toLowerCase()) ||
                          item.answer
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
                            onClick={selectQuestion}
                            className={
                              selectedQuestion
                                ? clickedQuestionID === item._id
                                  ? style.activeTR
                                  : null
                                : null
                            }
                          >
                            <td>{item.question}</td>
                            <td>{item.answer}</td>
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
            <URSeditFrequentlyAskedQuestion data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
