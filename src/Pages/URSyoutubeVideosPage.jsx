import React, { useState, useCallback } from "react";
import style from "../assets/css/URSyoutubeVideos/URSyoutubeVideosPage.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import URSdataYoutubeVideos from "../Data/URSdataYoutubeVideos.json";
import URSeditYoutubeVideo from "../Components/URSyoutubeVideos/URSeditYoutubeVideo";

export default function URSyoutubeVideosPage() {
  const [searchInpVal, setSearchInpVal] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [clickedVideoID, setClicktedVideoID] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const searchOnTable = useCallback((e) => {
    setSearchInpVal(e.target.value);
  });

  const selectVideo = useCallback((e) => {
    setClicktedVideoID(parseInt(e.target.parentElement.dataset.key));
    !selectedVideo ? setSelectedVideo(true) : null;
    parseInt(e.target.parentElement.dataset.key) != clickedVideoID
      ? setSelectedVideo(true)
      : null;

    URSdataYoutubeVideos.data.filter((item) => {
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
    <div className={style.URSyoutubeVideosPage}>
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
                  to={"/URSyoutubeVideosPage/URSaddNewYoutubeVideo"}
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
                    <th>Video ismi</th>
                    <th>URL</th>
                  </tr>
                </thead>

                <tbody>
                  {URSdataYoutubeVideos.data
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
                          onClick={selectVideo}
                          className={
                            selectedVideo
                              ? clickedVideoID === item.id
                                ? style.activeTR
                                : null
                              : null
                          }
                        >
                          <td>{item.name}</td>
                          <td>{item.url}</td>
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
            <URSeditYoutubeVideo data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
}
