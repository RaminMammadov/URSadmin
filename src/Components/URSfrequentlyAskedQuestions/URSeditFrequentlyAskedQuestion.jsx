import React, {useState,useCallback} from "react";
import style from "../../assets/css/URSfrequentlyAskedQuestions/URSeditFrequentlyAskedQuestion.module.css";
import axios from "axios";

export default function URSeditFrequentlyAskedQuestion(props) {
  axios.defaults.withCredentials = true;
  const url = 'https://api.ursdanismanlik.com/v1';

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  showSuccessAlert ? window.scrollTo(0, 0) : null
  const [question, setQuestion] = useState(props.data.question);
  const [answer, setAnswer] = useState(props.data.answer);
  const [showQuestionError, setShowQuestionError] = useState(false);
  const [showAnswerError, setShowAnswerError] = useState(false);

  const editQuestion = useCallback((e) => {
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
        })
        .catch(error => console.log(error))
    }
  })

  return (
    <div className={style.URSeditFrequentlyAskedQuestion}>
      {showSuccessAlert && <div className="alert alert-success" role="alert">
        Soru değiştirildi!
      </div>}
      <form action="#" className={style.editFrequentlyAskedQuestionForm}>
        <div className={style.questionAndAnswer}>
          <div>
            <label htmlFor="questionInput">Soru</label>
            <input
              type="text"
              className={style.question}
              id="questionInput"
              defaultValue={question}
              onChange={e => setQuestion(e.target.value)}
            />
            {showQuestionError && <p className="mt-2 text-danger small">Soru kısmı boş bırakılamaz</p>}
          </div>

          <div className={style.mt20}>
            <label htmlFor="answerInput">Cevap</label>
            <input
              type="text"
              className={style.answer}
              id="answerInput"
              defaultValue={answer}
              onChange={e => setAnswer(e.target.value)}
            />
            {showAnswerError && <p className="mt-2 text-danger small">Cevap kısmı boş bırakılamaz</p>}
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>Geri dön</button>
          <button className={style.addButton} onClick={editQuestion}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
