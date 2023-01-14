import React, { useState, useCallback } from "react";
import style from "../assets/css/URSserviceAndEducation/URSserviceAndEducationPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import URSdataCountries from "../Data/URSdataCountries.json";
import URSeditServiceAndEducationCountry from "../Components/URSserviceAndEducationCountries/URSeditServiceAndEducationCountry";


export default function URSserviceAndEducationCountriesPage() {
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
      parseInt(e.target.parentElement.dataset.key)
    );
    !selectedCountry ? setSelectedCountry(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedCountryID
      ? setSelectedCountry(true)
      : null;

      URSdataCountries.data.filter((item) => {
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
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ülke ismi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {URSdataCountries.data
                      .filter((item) => {
                        if (searchInpVal == "") {
                          return item;
                        } else if (
                          item.name
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
                            onClick={selectCountry}
                            className={
                              selectedCountry
                                ? clickedCountryID === item.id
                                  ? style.activeTR
                                  : null
                                : null
                            }
                          >
                            <td>{item.name}</td>
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
            <URSeditServiceAndEducationCountry 
              data={selectedData}
            />
          </div>
          )}
        </div>
    </div>
  ) 
}
