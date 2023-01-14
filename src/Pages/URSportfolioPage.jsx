import React, { useState, useCallback } from "react";
import style from "../assets/css/URSportfolio/URSportfolioPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { URSdataPortfolio } from "../Data/URSdataPortfolioPage.js";
import URSeditPortfolio from "../Components/URSportfolio/URSeditPortfolio";

export default function URSportfolioPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(false);
  const [clickedPortfolioID, setClickedPortfolioID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectPortfolio = useCallback((e) => {
    setClickedPortfolioID(parseInt(e.target.parentElement.dataset.key));
    !selectedPortfolio ? setSelectedPortfolio(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedPortfolioID
      ? setSelectedPortfolio(true)
      : null;

    URSdataPortfolio.filter((item) => {
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
    <div className={style.URSportfolioPage}>
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
                  to={"/URSportfolioPage/URSaddNewPortfolio"}
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
                    <th>Servis ismi</th>
                    <th>Marka ismi</th>
                    <th>Açıklama</th>
                  </tr>
                </thead>

                <tbody>
                  {URSdataPortfolio.filter((item) => {
                    if (searchInpVal == "") {
                      return item;
                    } else if (
                      item.service
                        .toLowerCase()
                        .includes(searchInpVal.toLowerCase()) ||
                      item.text
                        .toLowerCase()
                        .includes(searchInpVal.toLowerCase()) ||
                      item.description
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
                        onClick={selectPortfolio}
                        className={
                          selectedPortfolio
                            ? clickedPortfolioID === item.id
                              ? style.activeTR
                              : null
                            : null
                        }
                      >
                        <td>{item.service}</td>
                        <td>{item.text}</td>
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
            <URSeditPortfolio data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
