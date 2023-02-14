import React, { useState, useCallback, useEffect, useMemo } from "react";
import style from "../assets/css/URSaboutUs/URSaboutUsPage.module.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import Loading from "../Components/Loading";
import '../assets/css/CK.css'

export default function URSaboutusPage() {
  axios.defaults.withCredentials = true;
  const url = 'https://185.48.182.52/v1';

  const [URSDataAboutUs, setURSDataAboutUs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newImageSRC, setNewImageSRC] = useState('');
  const [newDescription, setNewDescription] = useState('')



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
      setNewImageSRC(event.target.files[0]);
    }
  };


  const getData = () => {
    axios.get(`${url}/about`)
      .then(response => {
        setURSDataAboutUs(response.data.data)
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  };
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    URSDataAboutUs.map(item => {
      setTitle(item.title);
      setId(item._id);
      setDescription(item.description)
      setImage(`https://185.48.182.52/uploads/${item.picture}`)
    })
  })
  const changeEditorData = (event, editor) => {
    const data = editor.getData();
    setNewDescription(data)
  }



  const changeData = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    if (newImage) {
      formdata.append("id", id);
      formdata.append("title", newTitle ? newTitle : title);
      formdata.append("description", newDescription ? newDescription : description);
      formdata.append("picture", newImageSRC);
      axios.put(`${url}/about/edit`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(response => {
        window.scrollTo(0, 0)
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      }).catch(error => console.log(error))
    } else {
      formdata.append("id", id);
      formdata.append("title", newTitle ? newTitle : title);
      formdata.append("description", newDescription ? newDescription : description);
      axios.put(`${url}/about/edit`, formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(response => {
        window.scrollTo(0, 0)
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 2000);
      }).catch(error => console.log(error))
    }
  }


  // editorState.getCurrentContent().getPlainText();
  return (
    <div className={style.URSaboutusPage}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Hakkımızda kısmı değiştirildi
      </div>}
      <div className="container p-0">
        <div className="row">

          {
            isLoading ? <Loading /> : <div className="row">
              <div className="col-12">
                <form className={style.URSaboutUsForm}>
                  <div className={style.pageHeading}>
                    <label htmlFor="">Başlık</label>
                    <input type="text" className={style.heading} defaultValue={title} onChange={e => setNewTitle(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="">Açıklama</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={`${description}`}
                      onChange={changeEditorData}
                    />
                  </div>

                  <div className={`col-4 ${style.photo}`}>
                    <div>
                      <label htmlFor="photoInput" className={style.photoAndIconLabel}>
                        Fotoğrafı değiştir
                      </label>
                      <input
                        type="file"
                        onChange={onImageChange}
                        className={style.photoInput}
                        id="photoInput"
                      />
                    </div>
                    <img src={newImage ? newImage : image} className={style.addedPhoto} />
                  </div>
                </form>
              </div>
            </div>
          }

          <div className={style.cancelButtonAndAddButton}>
            <button className={style.addButton} onClick={changeData}>Değiştir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
