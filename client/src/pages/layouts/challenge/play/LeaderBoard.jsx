import React from "react";
import FIRST from "../../../../assets/images/first.png";
import SECOND from "../../../../assets/images/second.png";
import THIRD from "../../../../assets/images/third.png";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";

function LeaderBoard() {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="leaderboard">
      <div className="block block-1">
        <div className="joined">
          <h2 className="title t-2">0</h2>
          <span className="t-3">Players</span>
        </div>
        <p className="title t-3">Share the code of quiz with the players. </p>
        <button className="button">Start</button>
      </div>
      <div className="block block-2">
        <div
          className="place first"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src={FIRST} alt="first" className="img-place" />
          <div className="player">
            <img src={process.env.PUBLIC_URL + "/user.png"} alt="player" />
            <h3 className="title t-2">Player name</h3>
          </div>
          <p className="title t-3">10 Questions Left</p>
        </div>
        <div
          className="place second"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <img src={SECOND} alt="second" className="img-place" />
          <div className="player">
            <img src={process.env.PUBLIC_URL + "/user.png"} alt="player" />
            <h3 className="title t-2">Player name</h3>
          </div>
          <p className="title t-3">10 Questions Left</p>
        </div>
        <div
          className="place third"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <img src={THIRD} alt="third" className="img-place" />
          <div className="player">
            <img src={process.env.PUBLIC_URL + "/user.png"} alt="player" />
            <h3 className="title t-2">Player name</h3>
          </div>
          <p className="title t-3">10 Questions Left</p>
        </div>
      </div>
      <div className="block block-3">
        <div className="block-item">
          <div className="bi-left">
            <img src={process.env.PUBLIC_URL + "/user.png"} alt="player" />
            <h3 className="title t-2">Player name</h3>
          </div>
          <span>100 points</span>
          <div className="bi-right">
            <button className="button">Cancel</button>
            <button className="button">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
