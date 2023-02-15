import React, { useState, useCallback } from "react";
import style from "../../assets/css/URSfrequentlyAskedQuestions/URSaddNewFrequentlyAskedQuestion.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function URSaddNewFrequentlyAskedQuestion() {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';
  

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showQuestionError, setShowQuestionError] = useState(false);
  const [showAnswerError, setShowAnswerError] = useState(false);

  const addQuestion = useCallback((e) => {
    e.preventDefault();
    question ? setShowQuestionError(false) : setShowQuestionError(true);
    answer ? setShowAnswerError(false) : setShowAnswerError(true);
    if (question && answer) {
      axios.post(`${url}/faq/add`, {
        "question": question,
        "answer": answer
      })
        .then(response => {
          setShowSuccessAlert(true)
          setTimeout(() => {
            setShowSuccessAlert(false)
          }, 2000);
          setQuestion('');
          setAnswer('');
          form.reset();
        })
        .catch(error => console.log(error))
    }

  })


  return (
    <div className={style.URSaddNewFrequentlyAskedQuestion}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Soru eklendi!
      </div>}
      <form action="#" id="form" className={style.adddNewFrequentlyAskedQuestionForm}>
        <div className={style.questionAndAnswer}>
          <div>
            <label htmlFor="questionInput">Soru</label>
            <input type="text" className={style.question} onChange={e => setQuestion(e.target.value)} defaultValue={question} id="questionInput" />
            {showQuestionError && <p className="mt-2 text-danger small">Soru kısmı boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="answerInput">Cevap</label>
            <input type="text" className={style.asnwer} id="answerInput" defaultValue={answer} onChange={e => setAnswer(e.target.value)} />
            {showAnswerError && <p className="mt-2 text-danger small">Cevap kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <NavLink className={style.cancelButton} to={'/URSfrequentlyAskedQuestionsPage'}>Geri dön</NavLink>
          <button className={style.addButton} to={'#'} onClick={addQuestion}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
