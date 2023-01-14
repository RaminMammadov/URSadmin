import React from "react";
import style from "../../assets/css/URSfrequentlyAskedQuestions/URSaddNewFrequentlyAskedQuestion.module.css";

export default function URSaddNewFrequentlyAskedQuestion() {
  return (
    <div className={style.URSaddNewFrequentlyAskedQuestion}>
      <form action="#" className={style.adddNewFrequentlyAskedQuestionForm}>
        <div className={style.questionAndAnswer}>
          <div>
            <label htmlFor="questionInput">Soru</label>
            <input type="text" className={style.question} id="questionInput" />
          </div>

          <div>
            <label htmlFor="answerInput">Cevap</label>
            <input type="text" className={style.asnwer} id="answerInput" />
          </div>
        </div>

        <div className={style.cancelButtonAndAddButton}>
          <button className={style.cancelButton}>İptal et</button>
          <button className={style.addButton}>Ekle</button>
        </div>
      </form>
    </div>
  );
}
