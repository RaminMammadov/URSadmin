import React, { useState, useCallback } from "react";
import style from "../assets/css/URSfrequentlyAskedQuestions/URSfrequentlyAskedQuestionPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import URSdataFrequentlyAskedQuestions from "../Data/URSdataFrequentlyAskedQuestions.json";
import URSeditFrequentlyAskedQuestion from "../Components/URSfrequentlyAskedQuestions/URSeditFrequentlyAskedQuestion";

export default function URSfrequentlyAskedQuestionsPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [clickedQuestionID, setClickedQuestionID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectQuestion = useCallback((e) => {
    setClickedQuestionID(parseInt(e.target.parentElement.dataset.key));
    !selectedQuestion ? setSelectedQuestion(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedQuestionID
      ? setSelectedQuestion(true)
      : null;

    URSdataFrequentlyAskedQuestions.data.filter((item) => {
      item.id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });

  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });
  return (
    <div className={style.URSfrequentlyAskedQuestions}>
      <div className={style.URStableComponent}>
        {!editPage ? (
          <div className="tableEventsAndURStable">
            <div className={style.tableEvents}>
              <div className={style.events}>
                <NavLink
                  className={`${style.eventButton} ${style.updateButton}`}
                  onClick={getEditPage}
                >
                  <FaEdit />
                </NavLink>
                <NavLink
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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Soru</th>
                    <th>Cevab</th>
                  </tr>
                </thead>

                <tbody>
                  {URSdataFrequentlyAskedQuestions.data
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
                          key={index}
                          data-key={item.id}
                          onClick={selectQuestion}
                          className={
                            selectedQuestion
                              ? clickedQuestionID === item.id
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
            </div>
          </div>
        ) : (
          <div className={style.editPage}>
            <button onClick={getEditPage} className={style.backToPageButton}>
              Geri dön
            </button>
            <URSeditFrequentlyAskedQuestion data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
