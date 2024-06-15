import React, { useEffect } from "react";
import FIRST from "../../../../assets/images/first.png";
import SECOND from "../../../../assets/images/second.png";
import THIRD from "../../../../assets/images/third.png";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../../../hooks/context/state/useAxiosPrivate";
import {
  onGetQuizLeaderBoardById,
  onJoinChallengePermission,
} from "../../../../services/challenge";
import { capitalize, isEmpty } from "../../../../utils/utils";

function LeaderBoard() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const currentQuiz = useSelector(
    (state) => state.setChallengeSlice.initQuizCurrent.quizCurrentData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    onGetQuizLeaderBoardById(currentQuiz?.id, axiosPrivate, signal).then(
      (result) => {
        dispatch({
          type: "setUpChallenge/getQuizLeaderBoardById",
          payload: result,
        });
      }
    );
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const quizLeaderBoard = useSelector(
    (state) =>
      state.setChallengeSlice.initQuizLeaderBoardById.quizLeaderBoardByIdData
  );

  useEffect(() => {
    AOS.init();
  }, []);

  const onPermission = (id, status) => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    //
    const data = {
      participation_id: id,
      response_dates: new Date(),
      status: status,
    };
    //
    onJoinChallengePermission(data, axiosPrivate, signal);
    onGetQuizLeaderBoardById(currentQuiz?.id, axiosPrivate, signal).then(
      (result) => {
        dispatch({
          type: "setUpChallenge/getQuizLeaderBoardById",
          payload: result,
        });
      }
    );
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  };

  return (
    <div className="leaderboard">
      <div className="block block-1">
        <div className="joined">
          <h2 className="title t-2">{quizLeaderBoard?.data?.length}</h2>
          <span className="t-3">Players</span>
        </div>
        <p className="title t-3">Share the code of quiz with the players. </p>
        {quizLeaderBoard?.data?.length > 0 &&
          currentQuiz?.is_completed === false && (
            <button className="button">Start</button>
          )}
      </div>
      {quizLeaderBoard?.data?.length > 0 && (
        <div className="block block-2">
          <div
            className="place first"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img src={FIRST} alt="first" className="img-place" />
            <div className="player">
              <img
                src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/avatars/${quizLeaderBoard?.data?.participations[0]?.thumbnail}`}
                alt="player"
              />
              <h3 className="title t-2">
                {capitalize(quizLeaderBoard?.data?.participations[0]?.player)}
              </h3>
            </div>
            <p className="title t-3">
              {quizLeaderBoard?.data?.participations[0]?.remainQuestions}{" "}
              questions left.
            </p>
          </div>
          <div
            className="place second"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <img src={SECOND} alt="second" className="img-place" />
            <div className="player">
              <img
                src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/avatars/${quizLeaderBoard?.data?.participations[1]?.thumbnail}`}
                alt="player"
              />
              <h3 className="title t-2">
                {capitalize(quizLeaderBoard?.data?.participations[1]?.player)}
              </h3>
            </div>
            <p className="title t-3">
              {quizLeaderBoard?.data?.participations[1]?.remainQuestions}{" "}
              questions left.
            </p>
          </div>
          <div
            className="place third"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <img src={THIRD} alt="third" className="img-place" />
            <div className="player">
              <img
                src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/avatars/${quizLeaderBoard?.data?.participations[2]?.thumbnail}`}
                alt="player"
              />
              <h3 className="title t-2">
                {capitalize(quizLeaderBoard?.data?.participations[2]?.player)}
              </h3>
            </div>
            <p className="title t-3">
              {quizLeaderBoard?.data?.participations[2]?.remainQuestions}{" "}
              questions left.
            </p>
          </div>
        </div>
      )}
      <div className="block block-3">
        {isEmpty(quizLeaderBoard?.data?.participations) ? (
          <p className="title t-2" style={{ margin: "1em" }}>
            No player joined yet!
          </p>
        ) : (
          quizLeaderBoard?.data?.participations.map((partElement, i) => {
            return (
              <div
                className="block-item"
                key={i}
                data-aos="fade-up"
                data-aos-duration={`${1500 + (i + 1) * 500}`}
              >
                <div className="bi-left">
                  <span>{i + 1}</span>
                  <img
                    src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/avatars/${partElement?.thumbnail}`}
                    alt="player"
                  />
                  <h3 className="title t-2">
                    {capitalize(partElement?.player)}
                  </h3>
                </div>
                <span>{partElement?.score} points</span>
                <div className="bi-right">
                  {isEmpty(partElement?.participation_status?.toString()) && (
                    <>
                      <button
                        className="button"
                        onClick={() =>
                          onPermission(partElement?.participation_id, true)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          onPermission(partElement?.participation_id, false)
                        }
                      >
                        Deny
                      </button>
                    </>
                  )}
                  <button className="button">Details</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
