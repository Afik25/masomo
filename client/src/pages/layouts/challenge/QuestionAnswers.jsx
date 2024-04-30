import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaCamera,
  FaTrashAlt,
  SlPicture,
  RiImageEditLine,
} from "../../../middlewares/icons";
import { colors } from "../../../utils/utils";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  validationSchemaQuestionAnswers,
  wait,
  isEmpty,
  onHandleFile,
} from "../../../utils/utils";
//
import { onCreateQuestionsAnswers } from "../../../services/challenge";
import swal from "sweetalert";

const QuestionAnswers = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [questionCover, setQuestionCover] = useState();
  const [timing, setTiming] = useState(5);
  const [grading, setGrading] = useState(10);
  const [questionType, setQuestionType] = useState("");
  const [answers, setAnswers] = useState([
    { cover: "", text: "", isGoodOne: false },
    { cover: "", text: "", isGoodOne: false },
  ]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const [trueOrFalse, setIsTrueOrFalse] = useState("");
  const [isSending, setIsSending] = useState(false);
  //
  // Question cover
  const handleQuestionCover = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setQuestionCover(e.target.files[0]);
    }
  };
  // Question's Answers covers handling
  const handleAnswersCovers = (e, coverOption) => {
    if (e.target.files && e.target.files.length !== 0) {
      for (let i = 0; i < answers.length; i++) {
        if (coverOption === i) {
          setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[i].cover = e.target.files[0];
            return newAnswers;
          });
        }
      }
    }
  };
  const onRemoveAnswersCover = (coverOption) => {
    for (let i = 0; i < answers.length; i++) {
      if (coverOption === i) {
        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[i].cover = "";
          return newAnswers;
        });
      }
    }
  };
  const onChangeGoodAnswer = (coverOption) => {
    for (let i = 0; i < answers.length; i++) {
      if (coverOption === i) {
        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[i].isGoodOne = true;
          return newAnswers;
        });
      } else {
        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[i].isGoodOne = false;
          return newAnswers;
        });
      }
    }
  };
  //
  const isTrueOrFalse = (value) => value === trueOrFalse;
  const onChangeTrueOrFalse = ({ target: { value } }) => {
    setIsTrueOrFalse(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaQuestionAnswers),
  });

  const onAdd = (data) => {
    if (questionType === "tf") {
      if (trueOrFalse === "") {
        swal(
          "Answer Missing",
          "The answer should be specified (True or False)",
          "warning"
        );
        return;
      }
      // setCurrentQuestionAnswers({
      //   question_type: data?.question_type,
      //   question_description: data?.question_description,
      //   question_timing: parseInt(timing),
      //   question_grading: parseInt(grading),
      //   answers: trueOrFalse,
      // });
    }
    if (questionType === "quiz") {
      for (let index = 0; index < answers.length; index++) {
        if (answers[index].text === "") {
          swal(
            "Answer Option Missing",
            "The answer option " + (index + 1) + " should be filled out.",
            "warning"
          );
          return;
        }
      }
      const checkGoodOne = answers.some((elmnt) => elmnt.isGoodOne === true);
      if (!checkGoodOne) {
        swal(
          "Good Answer Missing",
          "Please specified the good answer for the question among answer's options.",
          "warning"
        );
        return;
      }
      // console.log({ "answers ": answers });
      // setCurrentQuestionAnswers({
      //   question_description: data?.question_description,
      //   question_type: questionType,
      //   question_timing: parseInt(timing),
      //   question_grading: parseInt(grading),
      //   answers: answers,
      // });
    }
    setQuestionsAnswers([
      ...questionsAnswers,
      {
        question_type: data?.question_type,
        question_description: data?.question_description,
        question_cover: questionCover,
        question_timing: parseInt(timing),
        question_grading: parseInt(grading),
        answers: questionType === "tf" ? trueOrFalse : answers,
      },
    ]);
    reset();
    setQuestionCover();
    setTiming(5);
    setGrading(10);
    setIsTrueOrFalse("");
    setAnswers([
      { cover: "", text: "", isGoodOne: false },
      { cover: "", text: "", isGoodOne: false },
    ]);
    return;
  };
  const onRemoveQuestion = (i) => {
    setQuestionsAnswers((prevState) => {
      const newQuestions = [...prevState];
      newQuestions.splice(i, 1);
      return newQuestions;
    });
  };
  // Adding answer option for quiz/multiple choice
  const onAddAnswer = async () => {
    setAnswers([...answers, { cover: "", text: "", isGoodOne: false }]);
  };
  const onRemoveAnswer = (i) => {
    setAnswers((prevState) => {
      const newAnswers = [...prevState];
      newAnswers.splice(i, 1);
      return newAnswers;
    });
  };
  const handleOnChange = (e, idx) => {
    const inputData = [...answers];
    inputData[idx].text = e.target.value;
    setAnswers(inputData);
  };
  //
  const onSubmit = async () => {
    setIsSending(!isSending);
    await wait(300);
    const formData = new FormData();
    //
    formData.append("quiz_id", location.state.quiz.id);
    for (let idx = 0; idx < questionsAnswers.length; idx++) {
      const _newQuestionCover = onHandleFile(
        questionsAnswers[idx]?.question_cover,
        `mf-question-cover-${
          questionsAnswers[idx]?.question_cover?.name?.split(".")[0]
        }-${Date.now()}`
      );
      formData.append("question_cover", _newQuestionCover || "");
      formData.append("question_cover_name", _newQuestionCover?.name || "");
      formData.append(
        "question_description",
        questionsAnswers[idx]?.question_description
      );
      formData.append(
        "question_grading",
        questionsAnswers[idx]?.question_grading
      );
      formData.append(
        "question_timing",
        questionsAnswers[idx]?.question_timing
      );
      formData.append("question_type", questionsAnswers[idx]?.question_type);
      //
      if (typeof questionsAnswers[idx]?.answers === "object") {
        for (let j = 0; j < questionsAnswers[idx]?.answers.length; j++) {
          const _newAnswerCover = onHandleFile(
            questionsAnswers[idx]?.answers[j].cover,
            `mf-answer-cover-${
              questionsAnswers[idx]?.answers[j].cover?.name?.split(".")[0]
            }-${Date.now()}`
          );
          //
          formData.append("answer_cover", _newAnswerCover || "");
          formData.append(
            "answer_cover_name",
            _newAnswerCover?.name !== ""
              ? idx + "#" + _newAnswerCover?.name
              : ""
          );
          formData.append(
            "answer_text",
            idx + "#" + questionsAnswers[idx]?.answers[j].text
          );
          formData.append(
            "answer_isGoodOne",
            idx + "#" + questionsAnswers[idx]?.answers[j].isGoodOne
          );
        }
      } else {
        formData.append("answers", idx + "#" + questionsAnswers[idx]?.answers);
      }
    }
    onCreateQuestionsAnswers(axiosPrivate, formData)
      .then((response) => {
        if (response?.data?.success) {
          setIsSending(!isSending);
          swal({
            title: "Quiz : Questions - Answers creation process",
            text: response?.data?.message,
            icon: "success",
          });
          setQuestionsAnswers([]);
        }
      })
      .catch((error) => {
        setIsSending(false);
        if (!error?.response) {
          swal({
            title: "Quiz : Questions - Answers creation process",
            text: "No server response",
            icon: "warning",
          });
        } else {
          swal({
            title: "Quiz : Questions - Answers creation process",
            text: error?.response?.data?.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="question-answers">
      <div className="left">
        {isEmpty(questionsAnswers) ? (
          <p className="title t-2">No question setup yet!</p>
        ) : (
          questionsAnswers.map((el, i) => {
            return (
              <div key={i} className="question-item">
                <h3 className="title t-2">
                  {i + 1}.{" "}
                  {el?.question_type === "tf"
                    ? "True or False"
                    : "Multiple Choice"}
                </h3>
                <p className="title t-3">{el?.question_description}</p>
                <div className="timing-grad">
                  <span>{el?.question_timing} Seconds.</span>
                  <span>{el?.question_grading} Point.</span>
                </div>
                <div className="question-cover">
                  <div className="background">
                    <SlPicture className="icon" />
                  </div>
                  {el?.question_cover && (
                    <div className="img">
                      <img
                        src={URL.createObjectURL(el?.question_cover)}
                        alt="pic"
                      />
                    </div>
                  )}
                </div>
                <div className="actions">
                  <button type="button" onClick={(e) => null}>
                    <RiImageEditLine className="icon" /> <span>Edit</span>
                  </button>
                  <button type="button" onClick={() => onRemoveQuestion(i)}>
                    <FaTrashAlt className="icon" /> <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <form className="right" onSubmit={handleSubmit(onAdd)}>
        <div className="right-questions">
          <div className="form">
            <div className="form-head">
              <button type="submit" className="button">
                Add question
              </button>
              <button type="button" className="button">
                Question Bank
              </button>
              <button type="button" className="button" onClick={onSubmit}>
                Done & Finish
              </button>
            </div>
            <div className="input-div">
              <select
                className="input-select"
                defaultValue={''}
                {...register("question_type", {
                  onChange: (e) => {
                    setQuestionType(e.target.value);
                    if (e.target.value === "") {
                      setIsTrueOrFalse("");
                      setAnswers([
                        { cover: "", text: "", isGoodOne: false },
                        { cover: "", text: "", isGoodOne: false },
                      ]);
                    }
                  },
                })}
              >
                <option value={""}>
                  Type
                </option>
                <option value={"quiz"}>Quiz</option>
                <option value={"tf"}>True or False</option>
              </select>
              {errors.question_type && (
                <span className="fade-in">{errors.question_type.message}</span>
              )}
            </div>
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                {...register("question_description")}
                rows={5}
              />
              <label htmlFor="question_description" className="label-form">
                Question Description
              </label>
              {errors.question_description && (
                <span className="fade-in">
                  {errors.question_description.message}
                </span>
              )}
            </div>
            <div className="input-div section">
              <div className="question-cover">
                <div className="background">
                  <SlPicture className="icon" />
                </div>
                {questionCover && (
                  <div className="img">
                    <img src={URL.createObjectURL(questionCover)} alt="pic" />
                  </div>
                )}
                <div className="image-options">
                  <div className="file">
                    <input
                      type="file"
                      id="question_cover"
                      className="input-file"
                      autoComplete="none"
                      placeholder=" "
                      onChange={handleQuestionCover}
                      accept="image/*"
                    />
                    <label
                      htmlFor="question_cover"
                      className="input-file-label"
                    >
                      <FaCamera className="icon" />
                      <span>Insert image</span>
                    </label>
                  </div>
                  {questionCover && (
                    <button type="button" onClick={() => setQuestionCover()}>
                      <FaTrashAlt className="icon" /> <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="section-details">
                <div className="input-div">
                  <label className="">
                    Timing -{" "}
                    <span className="span-view">{timing} Seconds.</span>
                  </label>
                  <input
                    className="input-form"
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                  />
                </div>
                <div className="input-div">
                  <label className="">
                    Grading -{" "}
                    <span className="span-view">{grading} Point. </span>
                  </label>
                  <input
                    className="input-form"
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={grading}
                    onChange={(e) => setGrading(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="right-answers">
          {questionType === "tf" && (
            <div className="tile">
              <div
                className="radio-tile"
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                }}
              >
                <input
                  type="radio"
                  value={"true"}
                  checked={isTrueOrFalse("true")}
                  onChange={onChangeTrueOrFalse}
                />
                <label>True</label>
              </div>
              <div
                className="radio-tile"
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                }}
              >
                <input
                  type="radio"
                  value={"false"}
                  checked={isTrueOrFalse("false")}
                  onChange={onChangeTrueOrFalse}
                />
                <label>False</label>
              </div>
            </div>
          )}
          {questionType === "quiz" && (
            <>
              <div className="answer-div">
                {answers.map((elmnt, i) => {
                  return (
                    <div
                      key={i}
                      className="answer-item"
                      style={{
                        backgroundColor:
                          colors[Math.floor(Math.random() * colors.length)],
                      }}
                    >
                      <div className="question-cover">
                        <div className="background">
                          <SlPicture className="icon" />
                        </div>
                        {elmnt.cover && (
                          <div className="img">
                            <img
                              src={URL.createObjectURL(elmnt.cover)}
                              alt="pic"
                            />
                          </div>
                        )}
                        <div className="image-options">
                          <div className="file">
                            <input
                              type="file"
                              id={`answer_cover-${i}`}
                              className="input-file"
                              autoComplete="none"
                              placeholder=" "
                              onChange={(e) => handleAnswersCovers(e, i)}
                              accept="image/*"
                            />
                            <label
                              htmlFor={`answer_cover-${i}`}
                              className="input-file-label"
                            >
                              <FaCamera className="icon" />
                              <span>Insert image</span>
                            </label>
                          </div>
                          {elmnt.cover && (
                            <button
                              type="button"
                              onClick={() => onRemoveAnswersCover(i)}
                            >
                              <FaTrashAlt className="icon" />{" "}
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-answer">
                        <div className="input-div">
                          <textarea
                            type="text"
                            className="input-textarea"
                            autoComplete="none"
                            placeholder=" "
                            rows={4}
                            onChange={(e) => handleOnChange(e, i)}
                          />
                          <label htmlFor="username" className="label-form">
                            Answer text
                          </label>
                        </div>
                        <div className="tile">
                          <h3 className="t-2">Is the good answer ?</h3>
                          <div className="radio-tile">
                            <input
                              type="radio"
                              name="isGoodOne"
                              value={elmnt.isGoodOne}
                              checked={elmnt.isGoodOne ? true : false}
                              onChange={() => onChangeGoodAnswer(i)}
                            />
                            <label>True</label>
                          </div>
                          {i > 1 && (
                            <button
                              type="button"
                              onClick={() => onRemoveAnswer(i)}
                            >
                              Remove option
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button type="button" className="button" onClick={onAddAnswer}>
                Add response
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionAnswers;
