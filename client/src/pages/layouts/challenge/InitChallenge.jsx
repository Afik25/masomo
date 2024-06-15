import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MdAirplay,
  FiUser,
  FiUsers,
  MdOutlineQuiz,
} from "../../../middlewares/icons";
import { onGetThemes, onGetQuizByUser } from "../../../services/challenge";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { isEmpty, capitalize } from "../../../utils/utils";
import moment from "moment";

const InitChallenge = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    user?.userInfo?.sys_role !== "student" &&
      onGetThemes(axiosPrivate, signal).then((result) => {
        dispatch({
          type: "setUpChallenge/getThemes",
          payload: result,
        });
      });

    onGetQuizByUser(user?.userInfo?.user_id, axiosPrivate, signal).then(
      (result) => {
        dispatch({
          type: "setUpChallenge/getQuizByUser",
          payload: result,
        });
      }
    );

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const themes = useSelector(
    (state) => state.setChallengeSlice.initTheme?.themesData
  );

  const quizByUser = useSelector(
    (state) => state.setChallengeSlice.initQuizByUser?.quizByUserData
  );

  return (
    <div className="challenges">
      <div className="container">
        <p className="title t-2">
          All of your quiz and challenges appear here.
        </p>
        <div className="block block-1">
          <Link
            to={`/${user?.userInfo?.sys_role}/challenge/join-quiz`}
            className="tile link"
          >
            <MdAirplay className="icon" />
            <div className="content">
              <h3 className="title t-2">Join a Quiz</h3>
              <p className="title t-3">
                Your will be competing in quiz design for a specific host.
              </p>
            </div>
          </Link>
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
        {user?.userInfo?.sys_role !== "student" && (
          <div className="block block-2">
            <h3 className="title t-2">Create a new MASSE (MASOMO-Assess)</h3>
            <div className="container">
              <Link
                to={`/${user?.userInfo?.sys_role}/challenge/quiz`}
                className="tile link"
              >
                <MdOutlineQuiz className="icon" />
                <p className="title t-3">new empty MASSE</p>
              </Link>
              {isEmpty(themes?.data?.themes) ? (
                <div className="tile">
                  <img
                    src={process.env.PUBLIC_URL + "/ecoliers.jpg"}
                    alt="default"
                  />
                  <div className="outer">
                    <p className="title t-3">{themes?.data?.message}</p>
                  </div>
                </div>
              ) : (
                themes?.data?.themes.map((theme, idx) => {
                  return (
                    <div className="tile">
                      <img
                        src={process.env.PUBLIC_URL + "/ecoliers.jpg"}
                        alt="tile1"
                      />
                      <div className="outer">
                        <p className="title t-3">
                          Learning the congolese culture.
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        <div className="block block-3">
          <h3 className="title t-2">
            {user?.userInfo?.sys_role !== "student"
              ? "Created and Available MASSE"
              : "Completed MASSE"}
          </h3>
          <div className="container">
            {isEmpty(quizByUser?.data?.quiz) ? (
              <p>
                {" "}
                {user?.userInfo?.sys_role !== "student"
                  ? "No Quiz available. (You did not set quiz yet!)"
                  : "Youd did not attend any MASSE yet!"}
              </p>
            ) : (
              quizByUser?.data?.quiz.map((quiz, idx) => {
                return (
                  <div className="tile">
                    <div className="left">
                      <div className="up">
                        <h2 className="title t-2">{quiz?.code}</h2>
                      </div>
                      <img
                        src={
                          quiz?.thumbnail
                            ? `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${quiz?.thumbnail}`
                            : process.env.PUBLIC_URL + "/ecoliers.jpg"
                        }
                        alt={`quiz-cover-${idx}`}
                        className="img"
                      />
                      <p>{process.env.API_SERVER_URL}</p>
                    </div>
                    <div className="right">
                      <h3 className="title t-3">{capitalize(quiz?.title)}</h3>
                      <p className="title t-4">
                        Start : {moment(quiz?.start).format("LLLL")}
                      </p>
                      <p className="title t-4">
                        End : {moment(quiz?.end).format("LLLL")}
                      </p>
                      {moment(Date.now()).isSameOrAfter(moment(quiz?.start)) &&
                        moment(Date.now()).isSameOrBefore(
                          moment(quiz?.end)
                        ) && (
                          <span className="msg-box msg-box-success">
                            onGoing
                          </span>
                        )}
                      {moment(Date.now()).isBefore(moment(quiz?.start)) && (
                        <span className="msg-box msg-box-pending">
                          onWaiting
                        </span>
                      )}
                      {moment(Date.now()).isAfter(moment(quiz?.end)) && (
                        <span className="msg-box msg-box-failed">Finished</span>
                      )}
                      <div className="options">
                        <button
                          className="button link"
                          onClick={() => {
                            dispatch({
                              type: "setUpChallenge/getQuizCurrent",
                              payload: quiz,
                            });
                            navigate(
                              `/${user?.userInfo?.sys_role}/challenge/quiz-play`
                            );
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitChallenge;
