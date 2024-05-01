import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAirplay, FiUser, FiUsers } from "../../../middlewares/icons";

const InitChallenge = () => {
  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );
  return (
    <div className="challenges">
      <div className="container">
        <p className="title t-2">
          All of your quiz and challenges appear here.
        </p>
        <div className="block block-1">
          <div className="tile">
            <MdAirplay className="icon" />
            <div className="content">
              <h3 className="title t-2">Join a Quiz</h3>
              <p className="title t-3">Your will be competing in quiz design for a specific host.</p>
            </div>
          </div>
          <div className="tile">
            <FiUser className="icon" />
            <div className="content">
              <h3 className="title t-2">Compete in Solo</h3>
              <p className="title t-3">Your will be competing for yourself</p>
            </div>
          </div>
          <div className="tile">
            <FiUsers className="icon" />
            <div className="content">
              <h3 className="title t-2">Compete in Teams</h3>
              <p className="title t-3">
                Random teams compete together(+2 players)(Recommended)
              </p>
            </div>
          </div>
        </div>
        <div className="block block-2">
          <h3 className="title t-2">Create a new MASSE (MASOMO-Assess)</h3>
          <div className="container">
            <Link
              to={`/${user?.userInfo?.sys_role}/challenge/quiz`}
              className="tile link"
            >
              <FiUser className="icon" />
              <p className="title t-3">new empty MASSE</p>
            </Link>
            <div className="tile">
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt="tile1" />
              <p className="title t-3">Learning the congolese culture.</p>
            </div>
          </div>
        </div>
        <div className="block block-3">
          <h3 className="title t-2">Created and Available MASSE</h3>
          <div className="container">
            <div className="tile">
              <div className="left">
                <div className="up">
                  <h2 className="title t-2">1234567</h2>
                </div>
                <img src={process.env.PUBLIC_URL + "/logo.png"} alt="tile1" />
              </div>
              <div className="right">
                <h3 className="title t-3">Assessment title</h3>
                <p className="title t-4">Start : 14/04/2024 | 09:00 AM</p>
                <p className="title t-4">End : 14/04/2024 | 09:00 AM</p>
                <span className="msg-box msg-box-success">Ongoing</span>
                <div className="options">
                  <button className="button">Start</button>
                  <button className="button">View</button>
                  <button className="button">Update</button>
                  <button className="button">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitChallenge;
