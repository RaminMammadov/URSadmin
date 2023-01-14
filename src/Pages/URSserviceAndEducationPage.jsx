import React, { useState, useCallback } from "react";
import style from "../assets/css/URSserviceAndEducation/URSserviceAndEducationPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import URSdataServiceAndEducation from "../Data/URSdataServiceAndEducation.json";
import URSeditServiceAndEducation from "../Components/URSserviceAndEducation/URSeditServiceAndEducation";

export default function URSserviceAndEducationPage() {
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
      parseInt(e.target.parentElement.dataset.key)
    );
    !selectedServiceAndEducation ? setSelectedServiceAndEducation(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedServiceAndEducationID
      ? setSelectedServiceAndEducation(true)
      : null;

    URSdataServiceAndEducation.data.filter((item) => {
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
    <div className={style.URSserviceAndEducationPage}>
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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Ad</th>
                    <th>Qısa təsvir</th>
                    <th>Təsvir</th>
                  </tr>
                </thead>

                <tbody>
                  {URSdataServiceAndEducation.data
                    .filter((item) => {
                      if (searchInpVal == "") {
                        return item;
                      } else if (
                        item.name
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
                          data-key={item.id}
                          onClick={selectServiceAndEducation}
                          className={
                            selectedServiceAndEducation
                              ? clickedServiceAndEducationID === item.id
                                ? style.activeTR
                                : null
                              : null
                          }
                        >
                          <td>{item.name}</td>
                          <td>{item.shortDescription}</td>
                          <td>{item.description}</td>
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
            <URSeditServiceAndEducation data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
