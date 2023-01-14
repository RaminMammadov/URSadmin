import React, { useState, useCallback } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import URSdataOffices from "../../Data/URSdataOffices.json";
import URSeditOffices from "./URSeditOffices";
import style from "../../assets/css/URScontact/URSoffices.module.css";

export default function URSmentorsPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(false);
  const [clickedOfficeID, setClickedOfficeID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const selectOffice = useCallback((e) => {
    setClickedOfficeID(parseInt(e.target.parentElement.dataset.key));
    !selectedOffice ? setSelectedOffice(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedOfficeID
      ? setSelectedOffice(true)
      : null;

    URSdataOffices.data.filter((item) => {
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
    <div className={style.URSoffices}>
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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Ofis ismi</th>
                    <th>Konum</th>
                  </tr>
                </thead>

                <tbody>
                  {URSdataOffices.data
                    .filter((item) => {
                      if (searchInpVal == "") {
                        return item;
                      } else if (
                        item.name
                          .toLowerCase()
                          .includes(searchInpVal.toLowerCase()) ||
                        item.location
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
                          onClick={selectOffice}
                          className={
                            selectedOffice
                              ? clickedOfficeID === item.id
                                ? style.activeTR
                                : null
                              : null
                          }
                        >
                          <td>{item.name}</td>
                          <td>{item.location}</td>
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
            <URSeditOffices data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
