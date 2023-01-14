import React, { useState, useCallback } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { URSdataMentors } from "../Data/URSdataMentors.js";
import URSeditMentor from "../Components/URSmentors/URSeditMentor";
import style from "../assets/css/URSmentors/URSmentors.module.css";

export default function URSmentorsPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedMentors, setSelectedMentors] = useState(false);
  const [clickedMentorID, setClickedMentorID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const selectMentor = useCallback((e) => {
    setClickedMentorID(parseInt(e.target.parentElement.dataset.key));
    !selectedMentors ? setSelectedMentors(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedMentorID
      ? setSelectedMentors(true)
      : null;

    URSdataMentors.filter((item) => {
      item.id == e.target.parentElement.dataset.key
        ? setSelectedData(item)
        : null;
      //burda click olunan setiri tutub yazdiqdiq konsola
    });
  });

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const [editPage, setEditPage] = useState(false);
  const getEditPage = useCallback((e) => {
    selectedData ? setEditPage(!editPage) : null;
  });

  return (
    <div className={style.URSmentorsPage}>
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
                      item.department
                        .toLowerCase()
                        .includes(searchInpVal.toLowerCase())
                    ) {
                      return item;
                    }
                  }).map((item, index) => {
                    return (
                      <tr
                        key={index}
                        data-key={item.id}
                        onClick={selectMentor}
                        className={
                          selectedMentors
                            ? clickedMentorID === item.id
                              ? style.activeTR
                              : null
                            : null
                        }
                      >
                        <td>{item.name}</td>
                        <td>{item.department}</td>
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
              Back to page
            </button>
            <URSeditMentor data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
