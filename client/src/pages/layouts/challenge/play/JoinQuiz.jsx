import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForward, FaPlus } from "../../../../middlewares/icons";
import {
  onGetAvatars,
  onCheckJoinChallenge,
  onJoinChallenge,
  onGetParticipationRequestStatusById,
} from "../../../../services/challenge";
import {
  isEmpty,
  wait,
  validationSchemaJoinInitialStep,
  validationSchemaJoinStepTwo,
} from "../../../../utils/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxiosPrivate from "../../../../hooks/context/state/useAxiosPrivate";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const JoinQuiz = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [emojis, setEmojis] = useState("");
  const [participation, setParticipation] = useState(null);

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetAvatars(axiosPrivate, signal).then((result) => {
      setAvatars(result);
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  useEffect(() => {
    participation?.id &&
      onGetParticipationRequestStatusById(participation?.id, axiosPrivate)
        .then((response) => {
          if (response?.data?.status) {
            if (response?.data?.joinRequest?.status.toString()) {
              console.log({ ceccccc: response?.data?.joinRequest?.status });
              navigate(`/${user?.userInfo?.sys_role}/challenge/play`);
            } else {
              swal({
                title: "Join Quiz Request",
                text: "Request permission denied by the host...",
                icon: "info",
              });
              const timer = setTimeout(() => {
                navigate(`/${user?.userInfo?.sys_role}/challenge/`);
              }, 6000);
              return () => clearTimeout(timer);
            }
          }
        })
        .catch((error) => {
          if (!error?.response) {
            swal({
              title: "Join Quiz",
              text: "No server response",
              icon: "warning",
            });
          } else {
            swal({
              title: "Join Quiz",
              text: error?.response?.data?.message,
              icon: "error",
            });
          }
        });
  }, [participation]);

  let validations = {
    0: validationSchemaJoinInitialStep,
    1: validationSchemaJoinStepTwo,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validations[step]),
  });

  const onSubmit = async (data) => {
    if (step === 0) {
      setIsSubmitting(true);
      await wait(300);
      //
      await onCheckJoinChallenge(data, axiosPrivate)
        .then((response) => {
          setIsSubmitting(false);
          if (response?.data?.status) {
            setQuiz(response?.data?.quiz);
            if (response?.data?.quiz?.is_completed) {
              swal({
                title: "Join Quiz",
                text: "The challenge is completed already!",
                icon: "info",
              });
              return;
            }
            setStep((prev) => prev + 1);
          }
          if (!response?.data?.status) {
            swal({
              title: "Join Quiz",
              text: response?.data?.message,
              icon: "warning",
            });
            return;
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (!error?.response) {
            swal({
              title: "Join Quiz",
              text: "No server response",
              icon: "warning",
            });
          } else {
            swal({
              title: "Join Quiz",
              text: error?.response?.data?.message,
              icon: "error",
            });
          }
        });
    }
    if (step === 1) {
      if (isEmpty(emojis)) {
        swal({
          title: "Avatar Join Quiz",
          text: "Please choose your avatar!",
          icon: "warning",
        });
        return;
      }
      if (quiz?.mode === "classic") {
        setIsSubmitting(true);
        await wait(300);
        //
        const _data = {
          quiz_id: quiz?.id,
          user_id: user?.userInfo?.user_id,
          names: data?.names,
          avatar: emojis,
          request_dates: new Date(),
        };
        await onJoinChallenge(_data, axiosPrivate)
          .then((response) => {
            setIsSubmitting(false);
            console.log({ res: response?.data?.status });
            if (response?.data?.status) {
              setParticipation(response?.data?.participate);
              swal({
                title: "Join Quiz",
                text: "Waiting permission from the host...",
                icon: "info",
                closeOnClickOutside: false,
                closeOnEsc: false,
                buttons: false,
              });
            }
          })
          .catch((error) => {
            setIsSubmitting(false);
            if (!error?.response) {
              swal({
                title: "Join Quiz",
                text: "No server response",
                icon: "warning",
              });
            } else {
              swal({
                title: "Join Quiz",
                text: error?.response?.data?.message,
                icon: "error",
              });
            }
          });
      } else {
        setStep((prev) => prev + 1);
      }
    }
    if (step === 2) {
    }
  };

  return (
    <div className="join-quiz">
      <div className="join-head">
        <h2 className="title t-2">MASOMO</h2>
        <h3 className="title t-2">Join a MASSE</h3>
      </div>
      <div className="join-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <div className="step">
              <h3 className="title t-2">Enter MASSE's CODE</h3>
              <div className="content">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("quiz_code")}
                  />
                  <label htmlFor="quiz_code" className="label-form">
                    Challenge's CODE
                  </label>
                  {errors.quiz_code && (
                    <span className="fade-in">{errors.quiz_code.message}</span>
                  )}
                </div>
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  <button className="button">
                    <IoArrowForward className="icon" />
                  </button>
                )}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="step">
              <h3 className="title t-3">
                Challenge in{" "}
                {quiz?.mode === "classic" ? "Classic Mode" : "Team Mode"}
              </h3>
              <div className="emojis">
                <p className="title t-3">Choose your avatar </p>
                <div className="details">
                  {isEmpty(avatars?.data?.avatars) ? (
                    <p className="title t-2">No avatar available!</p>
                  ) : (
                    avatars?.data?.avatars?.map((item, i) => {
                      return (
                        <img
                          src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/avatars/${item}`}
                          className={
                            emojis === item
                              ? "emojis-item selected"
                              : "emojis-item"
                          }
                          key={i}
                          onClick={() => setEmojis(item)}
                        />
                      );
                    })
                  )}
                </div>
              </div>
              <h3 className="title t-2">
                Enter your{" "}
                {quiz?.mode === "classic" ? "Nickname" : "Team Nickname"}
              </h3>
              <div className="content">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("names")}
                  />
                  <label htmlFor="names" className="label-form">
                    Nickname
                  </label>
                  {errors.names && (
                    <span className="fade-in">{errors.names.message}</span>
                  )}
                </div>
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  <button className="button">
                    <IoArrowForward className="icon" />
                  </button>
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="step">
              <h3 className="title t-2">Enter the players Nickname</h3>
              <h3 className="title t-3">The nickname of every team member</h3>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  Nickname for Player 1
                </label>
                {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  Nickname for Player 2
                </label>
                {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
              </div>
              {isSubmitting ? (
                <div className="loader">Loader</div>
              ) : (
                <div className="buttons">
                  <button className="button">
                    <FaPlus className="icon" />
                    <span>Add Player</span>
                  </button>
                  <button className="button">Ready to Join!</button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinQuiz;
