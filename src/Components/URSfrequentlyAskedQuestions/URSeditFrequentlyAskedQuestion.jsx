import React from "react";
import style from "../../assets/css/URSfrequentlyAskedQuestions/URSeditFrequentlyAskedQuestion.module.css";

export default function URSeditFrequentlyAskedQuestion(props) {
  return (
    <div className={style.URSeditFrequentlyAskedQuestion}>
      <form action="#" className={style.editFrequentlyAskedQuestionForm}>
        <div className={style.questionAndAnswer}>
          <div>
            <label htmlFor="questionInput">Soru</label>
            <input
              type="text"
              className={style.question}
              value={props.data.question}
              id="questionInput"
            />
          </div>

          <div>
            <label htmlFor="answerInput">Cevap</label>
            <input
              type="text"
              className={style.answer}
              value={props.data.answer}
              id="answerInput"
            />
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Düzenle</button>
        </div>
      </form>
    </div>
  );
}
