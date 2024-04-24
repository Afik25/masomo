import React, { useState } from "react";
import {
  FaCamera,
  FaTrashAlt,
  BiCheck,
  IoCloseOutline,
} from "../../../middlewares/icons";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import useAuth from "../../../hooks/context/state/useAuth";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  isEmpty,
  validationSchemaQuiz,
  validationSchemaQuizWithDelayed,
  wait,
} from "../../../utils/utils";
//
import { onCreateChallenge } from "../../../services/challenge";
import swal from "sweetalert";

const Quiz = ({ setStep }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setKeys } = useAuth();
  const [selectedFile, setSelectedFile] = useState();
  const [visibility, setVisibility] = useState("");
  const [mode, setMode] = useState("");
  const [timing, setTiming] = useState("");
  const [switched, setSwitched] = useState({
    random_order_questions: false,
    random_order_answers: false,
    auto_move_questions: false,
    player_anonymat: false,
  });
  //
  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [classNameMsg, setClassNameMsg] = useState("");

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const isVisibility = (value) => value === visibility;
  const isMode = (value) => value === mode;
  const isTiming = (value) => value === timing;
  const onChangeVisibility = ({ target: { value } }) => {
    setVisibility(value);
  };
  const onChangeMode = ({ target: { value } }) => {
    setMode(value);
  };
  const onChangeTiming = ({ target: { value } }) => {
    setTiming(value);
  };
  const toggle = (num) =>
    setSwitched({
      random_order_questions:
        num === 1
          ? !switched.random_order_questions
          : switched.random_order_questions,
      random_order_answers:
        num === 2
          ? !switched.random_order_answers
          : switched.random_order_answers,
      auto_move_questions:
        num === 3
          ? !switched.auto_move_questions
          : switched.auto_move_questions,
      player_anonymat:
        num === 4 ? !switched.player_anonymat : switched.player_anonymat,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(
      timing === "delayed"
        ? validationSchemaQuizWithDelayed
        : validationSchemaQuiz
    ),
    defaultValues: {
      options: switched,
    },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(500);
    //
    const formData = new FormData();
    setValue("options", switched);
    //
    const ext = selectedFile?.name.split(".").pop();
    const newName = `mf-quiz-cover-img-${
      selectedFile?.name?.split(".")[0]
    }-${Date.now()}.${ext}`;
    const newFile = new File([selectedFile], newName, {
      type: selectedFile?.type,
    });
    formData.append("user_id", user?.userInfo?.user_id);
    formData.append("thumbnail", isEmpty(selectedFile) ? "" : newFile);
    formData.append("quiz_title", data.quiz_title);
    formData.append("visibility", data.visibility);
    formData.append("mode", data.mode);
    formData.append("timing", data.timing);
    formData.append("description", data.description);
    formData.append("start", data?.start || new Date());
    formData.append("end", data?.end || new Date());
    formData.append(
      "random_order_questions",
      data.options.random_order_questions
    );
    formData.append("random_order_answers", data.options.random_order_answers);
    formData.append("auto_move_questions", data.options.auto_move_questions);
    formData.append("player_anonymat", data.options.player_anonymat);
    //
    onCreateChallenge(axiosPrivate, formData)
      .then((response) => {
        if (response?.data?.success) {
          setIsSending(false);
          setClassNameMsg("msg-box msg-box-success fade-in");
          setResponseMessage(response?.data?.message);
          setKeys({
            keyDetails: response?.data?.quiz,
          });
          reset();
          setVisibility("");
          setMode("");
          setTiming("");
          setSwitched({
            random_order_questions: false,
            random_order_answers: false,
            auto_move_questions: false,
            player_anonymat: false,
          });
        }
        const timer = setTimeout(() => {
          setClassNameMsg("display-none");
          setStep(1);
        }, 4000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setClassNameMsg("msg-box msg-box-failed fade-in");
        if (!error?.response) {
          setResponseMessage("No server response");
        } else {
          setResponseMessage(error?.response?.data?.message);
        }
        const timer = setTimeout(() => {
          setClassNameMsg("display-none");
        }, 4000);
        return () => clearTimeout(timer);
      });
  };
  return (
    <div className="quiz">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classNameMsg}>
            <span>{responseMessage}</span>
          </div>
          <div className="input-cover">
            <div className="file">
              <input
                type="file"
                id="thumbnails"
                className="input-file"
                autoComplete="none"
                placeholder=" "
                onChange={handleFile}
                //   {...register("thumbnails")}
                accept="image/*"
              />
              <label htmlFor="thumbnails" className="input-file-label">
                <FaCamera className="icon" />
                <p>Insert the cover image</p>
              </label>
            </div>
            <img
              src={
                !selectedFile
                  ? process.env.PUBLIC_URL + "/quiz-cover.jpg"
                  : URL.createObjectURL(selectedFile)
              }
              alt="quiz-cover"
              className="logo"
            />
            {selectedFile && (
              <button
                type="button"
                className="button"
                onClick={() => setSelectedFile()}
              >
                <FaTrashAlt className="icon" />
                <span>Remove image</span>
              </button>
            )}
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("quiz_title")}
            />
            <label htmlFor="quiz_title" className="label-form">
              Quiz title
            </label>
            {errors.quiz_title && (
              <span className="fade-in">{errors.quiz_title.message}</span>
            )}
          </div>
          <div className="input-radio">
            <div className="tile">
              <h3 className="t-2">
                Visibility{" "}
                {errors.visibility && (
                  <span className="fade-in">({errors.visibility.message})</span>
                )}
                :
              </h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"private"}
                  checked={isVisibility("private")}
                  // onChange={onChangeVisibility}
                  {...register("visibility", {
                    onChange: onChangeVisibility,
                  })}
                />
                <label>Private</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"public"}
                  checked={isVisibility("public")}
                  // onChange={onChangeVisibility}
                  {...register("visibility", {
                    onChange: onChangeVisibility,
                  })}
                />
                <label>Public</label>
              </div>
            </div>
            <div className="tile">
              <h3 className="t-2">
                Mode{" "}
                {errors.mode && (
                  <span className="fade-in">({errors.mode.message})</span>
                )}
                :
              </h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"classic"}
                  checked={isMode("classic")}
                  // onChange={onChangeMode}
                  {...register("mode", {
                    onChange: onChangeMode,
                  })}
                />
                <label>Classic</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"teams"}
                  checked={isMode("teams")}
                  // onChange={onChangeMode}
                  {...register("mode", {
                    onChange: onChangeMode,
                  })}
                />
                <label>Teams</label>
              </div>
            </div>
            <div className="tile">
              <h3 className="t-2">
                Timing{" "}
                {errors.timing && (
                  <span className="fade-in">({errors.timing.message})</span>
                )}
                :
              </h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"live"}
                  checked={isTiming("live")}
                  // onChange={onChangeTiming}
                  {...register("timing", {
                    onChange: onChangeTiming,
                  })}
                />
                <label>Live</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"delayed"}
                  checked={isTiming("delayed")}
                  // onChange={onChangeTiming}
                  {...register("timing", {
                    onChange: onChangeTiming,
                  })}
                />
                <label>Delayed</label>
              </div>
            </div>
          </div>
          <div className="input-div">
            <textarea
              type="text"
              className="input-textarea"
              autoComplete="none"
              placeholder=" "
              {...register("description")}
              rows={5}
            />
            <label htmlFor="description" className="label-form">
              Quiz Description (Optional)
            </label>
            {/* {errors.description && (
                <span className="fade-in">{errors.description.message}</span>
              )} */}
          </div>
          {timing === "delayed" && (
            <div className="container-48">
              <div className="input-div">
                <input
                  type="datetime-local"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("start")}
                />
                <label htmlFor="start" className="label-form">
                  Quiz Start date & time
                </label>
                {errors.start && (
                  <span className="fade-in">{errors.start.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="datetime-local"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("end")}
                />
                <label htmlFor="end" className="label-form">
                  Quiz End date & time
                </label>
                {errors.end && (
                  <span className="fade-in">{errors.end.message}</span>
                )}
              </div>
            </div>
          )}
          <div className="input-options">
            <div className="tile">
              <p className="title t-3">Randomize order of questions</p>
              <div className="switch-wrapper">
                <span>{switched.random_order_questions ? "On" : "Off"}</span>
                <div className="switch" onClick={() => toggle(1)}>
                  <div
                    className={
                      switched.random_order_questions
                        ? "switched switched-active"
                        : "switched switched-inactive"
                    }
                    onClick={() => toggle(1)}
                  >
                    {switched.random_order_questions ? (
                      <BiCheck className="icon" />
                    ) : (
                      <IoCloseOutline className="icon" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="tile">
              <p className="title t-3">Randomize order of answers</p>
              <div className="switch-wrapper">
                <span>{switched.random_order_answers ? "On" : "Off"}</span>
                <div className="switch" onClick={() => toggle(2)}>
                  <div
                    className={
                      switched.random_order_answers
                        ? "switched switched-active"
                        : "switched switched-inactive"
                    }
                    onClick={() => toggle(2)}
                  >
                    {switched.random_order_answers ? (
                      <BiCheck className="icon" />
                    ) : (
                      <IoCloseOutline className="icon" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="tile">
              <p className="title t-3">Automatically move through questions</p>
              <div className="switch-wrapper">
                <span>{switched.auto_move_questions ? "On" : "Off"}</span>
                <div className="switch" onClick={() => toggle(3)}>
                  <div
                    className={
                      switched.auto_move_questions
                        ? "switched switched-active"
                        : "switched switched-inactive"
                    }
                    onClick={() => toggle(3)}
                  >
                    {switched.auto_move_questions ? (
                      <BiCheck className="icon" />
                    ) : (
                      <IoCloseOutline className="icon" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="tile">
              <p className="title t-3">Enabled player anonymat</p>
              <div className="switch-wrapper">
                <span>{switched.player_anonymat ? "On" : "Off"}</span>
                <div className="switch" onClick={() => toggle(4)}>
                  <div
                    className={
                      switched.player_anonymat
                        ? "switched switched-active"
                        : "switched switched-inactive"
                    }
                    onClick={() => toggle(4)}
                  >
                    {switched.player_anonymat ? (
                      <BiCheck className="icon" />
                    ) : (
                      <IoCloseOutline className="icon" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type={isSending ? "button" : "submit"}
              className={isSending ? "button normal" : "button validate"}
            >
              {isSending ? "Quiz on creation..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
