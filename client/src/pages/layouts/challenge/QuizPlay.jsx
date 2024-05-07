import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "../../../routes/NavLink";
import { useSelector } from "react-redux";

const QuizPlay = () => {
    const user = useSelector(
        (state) => state.setInitConf.initConnectedUser.connectedUserData
      );
  return (
    <div className="quiz-play">
      <div className="qp-left">
        <h2 className="title t-1">Panel Control</h2>
        <label>Quiz code</label>
        <h2 className="title t-2">1234567</h2>
        <label>Quiz title</label>
        <p className="title t-2">General culture</p>
        <div className="qp-left-row">
          <span>Visibility</span>
          <span className="t-3">Private</span>
        </div>
        <div className="qp-left-row">
          <span>Mode</span>
          <span className="t-3">Classic</span>
        </div>
        <div className="qp-left-row">
          <span>Timing (Hosting)</span>
          <span className="t-3">Live</span>
        </div>
        <div className="qp-left-row">
          <span>Start</span>
          <span className="t-3">Sat 4 May 2024 at 10:15 AM</span>
        </div>
        <div className="qp-left-row">
          <span>End</span>
          <span className="t-3">Sat 4 May 2024 at 10:25 AM</span>
        </div>
        <label>Quiz description</label>
        <p className="title t-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          error alias adipisci fugiat, temporibus possimus ipsa iusto incidunt
          ea ad labore voluptatum odio earum eligendi, corrupti nesciunt
          reiciendis optio sunt.
        </p>
        <div className="qp-left-row">
          <span>Randomize order of questions</span>
          <span className="t-3">False</span>
        </div>
        <div className="qp-left-row">
          <span>Randomize order of answers</span>
          <span className="t-3">False</span>
        </div>
        <div className="qp-left-row">
          <span>Automatically move through questions</span>
          <span className="t-3">False</span>
        </div>
        <div className="qp-left-row">
          <span>Enabled player anonymat</span>
          <span className="t-3">False</span>
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
