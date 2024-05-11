import React, { useState, useEffect, useRef } from "react";
import { FaCheck, GiCheckMark, GrClose } from "../../../../middlewares/icons";
import { shapes } from "../../../../utils/utils";

const Play = () => {
  // Challenge starting
  const [isStarted, setIsStarted] = useState(false);
  // Progress Bar
  const [progressFilled, setProgressFilled] = useState(0);
  const [isProgressing, setIsProgressing] = useState(false);
  // Count down
  const [countDown, setCountDown] = useState(30);
  const timerdId = useRef();
  //
  useEffect(() => {
    if (progressFilled < 100 && isProgressing) {
      setTimeout(() => setProgressFilled((prev) => prev + 5), 300);
    }
  }, [progressFilled, isProgressing]);
  //
  useEffect(() => {
    timerdId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerdId.current);
  }, []);
  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timerdId.current);
    }
  });
  //
  return (
    <div className="play">
      {/* <button onClick={()=> setIsProgressing(true)}>Test</button> */}
      {isStarted && (
        <div className="frame play-started">
          <img src={process.env.PUBLIC_URL + "/questions.png"} alt="icon" />
          <p className="title t-2">Waiting for Host...</p>
          <p className="title t-1">5 questions</p>
          <p className="title t-2">
            Your goal is to be able to answer almost all questions correctly!
          </p>
          <p className="title t-2">Are you ready ?</p>
        </div>
      )}
      {/* <div className="frame pre-question">
        <span>1 0f 5</span>
        <div className="ruban">
          <img src={process.env.PUBLIC_URL + "/TrueOrFalse.png"} alt="icon" />
          <h3 className="title t-2">True or False</h3>
          <div className="question-ruban">
            <p>How can someone succed in MASSE's challenge ?</p>
          </div>
        </div>
        <div className="timer">
          <div className="timer-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progressFilled}%`, transition: "width 0.5s" }}
            ></div>
          </div>
        </div>
      </div> */}
      <div className="frame questions">
        <div className="inner">
          <div className="q-up">
            <p>How do you success in MASSE's challenges ?</p>
          </div>
          <div className="q-middle">
            <div className="counter-down">
              <span>{countDown}</span>
            </div>
            <div className="illustrate">
              <img src={process.env.PUBLIC_URL + "/ecoliers.jpg"} />
            </div>
            <div className="more">
              <button className="button">Next Question</button>
              <h3 className="t-2">10 questions left</h3>
            </div>
          </div>
          <div className="q-bottom">
            <button className="button button-selected">
              {/* <img src={process.env.PUBLIC_URL+'/cover.jpeg'} alt="answer-illustr"/> */}
              <div
                className={`${
                  shapes[Math.floor(Math.random() * shapes.length)]
                }`}
              ></div>
              <span>Answer Option 1</span>
              <FaCheck className="icon" />
            </button>
            <button className="button">
              {/* <img src={process.env.PUBLIC_URL+'/cover.jpeg'} alt="answer-illustr"/> */}
              <div
                className={`${
                  shapes[Math.floor(Math.random() * shapes.length)]
                }`}
              ></div>
              <span>Answer Option 1</span>
              <FaCheck className="icon" />
            </button>
            <button className="button">
              {/* <img src={process.env.PUBLIC_URL+'/cover.jpeg'} alt="answer-illustr"/> */}
              <div
                className={`${
                  shapes[Math.floor(Math.random() * shapes.length)]
                }`}
              ></div>
              <span>Answer Option 1</span>
              <FaCheck className="icon" />
            </button>
            <button className="button">
              {/* <img src={process.env.PUBLIC_URL+'/cover.jpeg'} alt="answer-illustr"/> */}
              <div
                className={`${
                  shapes[Math.floor(Math.random() * shapes.length)]
                }`}
              ></div>
              <span>Answer Option 1</span>
              <FaCheck className="icon" />
            </button>
            <button className="button">
              <img
                src={process.env.PUBLIC_URL + "/cover.jpeg"}
                alt="answer-illustr"
              />
              {/* <div
                className={`${
                  shapes[Math.floor(Math.random() * shapes.length)]
                }`}
              ></div> */}
              <span>Answer Option 1</span>
              <FaCheck className="icon" />
            </button>
          </div>
        </div>
        <div className="outer">
          <div className="content">
            {/* <div className="fade-in">
              <h3 className="t-1">Answer Sent!</h3>
              <p>&#128519;</p>
            </div> */}
            {/* <div className="fade-in">
              <h3 className="t-1-failed">Correct! /Incorrect!</h3>
              <GiCheckMark className="t-1-failed"/>
              <h3 className="t-1-success">Correct answer is : xxxxxxx</h3>
              <button className="button">Next question</button>
            </div> */}
            <div  className="fade-in">
              <h1 className="t-1">14th Place</h1>
              <p>&#129321;</p>
              <h2 className="t-2">Totally Rad :</h2>
              <p>354 Points</p>
              <h2 className="t-2">Accuracy :</h2>
              <h2 className="t-1">11/15</h2>
              <p>73%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
