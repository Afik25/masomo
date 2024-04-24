import React, { useState } from "react";
import { MdOutlineArrowForwardIos } from "../../../middlewares/icons";
import Quiz from "./Quiz";
import QuestionAnswers from "./QuestionAnswers";

const NewChallenge = ({ key }) => {
  const [step, setStep] = useState(0);
  return (
    <div className="new-challenge">
      <div className="nc-head">
        <span
          style={{
            backgroundColor: `${step === 0 && "red"}`,
            color: `${step === 0 && "white"}`,
          }}
        >
          1.
        </span>{" "}
        Setup Quiz <MdOutlineArrowForwardIos className="icon" />
        <span
          style={{
            backgroundColor: `${step === 1 && "red"}`,
            color: `${step === 1 && "white"}`,
          }}
        >
          2.
        </span>{" "}
        Setup Questions & Answers
      </div>
      <div className="nc-body">
        {step === 0 && <Quiz setStep={setStep} />}
        {step === 1 && <QuestionAnswers />}
      </div>
    </div>
  );
};

export default NewChallenge;
