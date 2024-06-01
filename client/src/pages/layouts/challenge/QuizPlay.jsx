import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "../../../routes/NavLink";
import { useSelector } from "react-redux";
import { capitalize} from "../../../utils/utils"
import moment from "moment"

const QuizPlay = () => {
  const location = useLocation();
  let currentQuiz = location.state.quiz;
  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <div className="quiz-play">
      <div className="qp-left">
        <h2 className="title t-1">Quiz Overview</h2>
        <label>Quiz code</label>
        <h2 className="title t-2">{currentQuiz?.code}</h2>
        <label>Quiz title</label>
        <p className="title t-2">{capitalize(currentQuiz?.title)}</p>
        <div className="qp-left-row">
          <span>Visibility</span>
          <span className="t-3">{capitalize(currentQuiz?.visibility)}</span>
        </div>
        <div className="qp-left-row">
          <span>Mode</span>
          <span className="t-3">{capitalize(currentQuiz?.mode)}</span>
        </div>
        <div className="qp-left-row">
          <span>Timing (Hosting)</span>
          <span className="t-3">{capitalize(currentQuiz?.timing)}</span>
        </div>
        <div className="qp-left-row">
          <span>Start</span>
          <span className="t-3">{moment(currentQuiz?.start).format("LLLL")}</span>
        </div>
        <div className="qp-left-row">
          <span>End</span>
          <span className="t-3">{moment(currentQuiz?.end).format("LLLL")}</span>
        </div>
        <label>Quiz description</label>
        <p className="title t-3">
          {capitalize(currentQuiz?.description)}
        </p>
        <div className="qp-left-row">
          <span>Randomize order of questions</span>
          <span className="t-3">{capitalize(currentQuiz?.random_order_questions.toString())}</span>
        </div>
        <div className="qp-left-row">
          <span>Randomize order of answers</span>
          <span className="t-3">{capitalize(currentQuiz?.random_order_answers.toString())}</span>
        </div>
        <div className="qp-left-row">
          <span>Automatically move through questions</span>
          <span className="t-3">{capitalize(currentQuiz?.auto_move_questions.toString())}</span>
        </div>
        <div className="qp-left-row">
          <span>Enabled player anonymat</span>
          <span className="t-3">{capitalize(currentQuiz?.player_anonymat.toString())}</span>
        </div>
      </div>
      <div className="qp-right">
        <div className="qp-right-head">
          <NavLink
            activeClassName="active"
            inactiveClassName="inactive"
            className="link"
            to={`/${user?.userInfo?.sys_role}/challenge/quiz-play`}
            exact={true}
          >
            <span>Leaderboard</span>
          </NavLink>
          <NavLink
            activeClassName="active"
            inactiveClassName="inactive"
            className="link"
            to={`/${user?.userInfo?.sys_role}/challenge/quiz-play/qa`}
          >
            <span>View reports</span>
          </NavLink>
        </div>
        <div className="qp-right-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
