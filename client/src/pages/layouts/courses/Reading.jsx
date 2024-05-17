import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  MdFavoriteBorder,
  BsPatchQuestion,
  FaSlackHash,
  GoCommentDiscussion,
  MdList,
} from "../../../middlewares/icons";
import PREMUIM from "../../../assets/svg/premium.png";
import { isEmpty, capitalize } from "../../../utils/utils";
import useAuth from "../../../hooks/context/state/useAuth";

const Reading = () => {
  const { keys } = useAuth();
  const [isCurrentAction, setIsCurrentAction] = useState({
    isLesson: true,
    isExercise: false,
    isSolution: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  let { param1 } = useParams();
  const [content, setContent] = useState({
    index: -1,
    details: [],
  });

  React.useEffect(() => {
    setContent({ index: -1, details: keys?.keyDetails });
  }, []);

  // console.log({ "check keys details ": keys?.keyDetails });

  return (
    <div className="course-reading">
      <div className="left" style={{ zIndex: `${isDrawerOpen ? 1 : 0}` }}>
        <div className="courses-nav">
          <button className="button" onClick={() => navigate(-1)}>
            <FaArrowLeft className="icon" />
          </button>
          <h3 className="title t-2">Course of {capitalize(param1)}</h3>
        </div>
        <div className="reading-nav">
          <div className="r-nav">
            <button
              className={
                isCurrentAction.isLesson ? "button btn-active" : "button"
              }
              onClick={() =>
                setIsCurrentAction({
                  isLesson: true,
                  isExercise: false,
                  isSolution: false,
                })
              }
            >
              Lessons
            </button>
            <button
              className={
                isCurrentAction.isExercise ? "button btn-active" : "button"
              }
              onClick={() =>
                setIsCurrentAction({
                  isLesson: false,
                  isExercise: true,
                  isSolution: false,
                })
              }
            >
              Exercices
            </button>
            <button
              className={
                isCurrentAction.isSolution ? "button btn-active" : "button"
              }
              onClick={() =>
                setIsCurrentAction({
                  isLesson: false,
                  isExercise: false,
                  isSolution: true,
                })
              }
            >
              Solutions
            </button>
          </div>
          <button
            className="button btn-close"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            &times;
          </button>
        </div>
        <div className="reading-content">
          {isCurrentAction.isLesson && (
            <>
              {isEmpty(keys?.keyDetails) ? (
                <p
                  className="title t-2"
                  style={{ padding: "1em", textAlign: "center", color: "red" }}
                >
                  No lesson for {param1} course available yet!
                </p>
              ) : (
                <>
                  <button
                    className={
                      content.index === -1 ? "button active-reading" : "button"
                    }
                    onClick={() =>
                      setContent({
                        index: -1,
                        details: keys?.keyDetails,
                      })
                    }
                  >
                    All lessons of course
                  </button>
                  {keys?.keyDetails.map((itemLesson, i) => {
                    return (
                      <button
                        key={i}
                        className={
                          content.index === i
                            ? "button active-reading"
                            : "button"
                        }
                        onClick={() =>
                          setContent({
                            index: i,
                            details: [keys?.keyDetails[i]],
                          })
                        }
                      >
                        {itemLesson?.lesson?.title}
                      </button>
                    );
                  })}
                </>
              )}
            </>
          )}
          {isCurrentAction.isExercise && (
            <>
              {isEmpty(keys?.keyDetails) ? (
                <p
                  className="title t-2"
                  style={{ padding: "1em", textAlign: "center", color: "red" }}
                >
                  No exercise for {param1} course available yet!
                </p>
              ) : (
                <>
                  <button
                    className={
                      content.index === -1 ? "button active-reading" : "button"
                    }
                    onClick={() =>
                      setContent({
                        index: -1,
                        details: keys?.keyDetails,
                      })
                    }
                  >
                    All exercises
                  </button>
                  {keys?.keyDetails.map((itemLesson, _) => {
                    return (
                      <>
                        {!isEmpty(itemLesson?.lesson_exercises) &&
                          itemLesson?.lesson_exercises.map(
                            (exerciseItem, j) => {
                              return (
                                <button
                                  key={j}
                                  className={
                                    content.index === j
                                      ? "button active-reading"
                                      : "button"
                                  }
                                  onClick={() =>
                                    setContent({
                                      index: j,
                                      details: [keys?.keyDetails[j]],
                                    })
                                  }
                                >
                                  {exerciseItem?.exercise?.title}
                                </button>
                              );
                            }
                          )}
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
          {isCurrentAction.isSolution && (
            <>
              {isEmpty(keys?.keyDetails) ? (
                <p
                  className="title t-2"
                  style={{ padding: "1em", textAlign: "center", color: "red" }}
                >
                  No solution for {param1} exercises available yet!
                </p>
              ) : (
                <>
                  <button
                    className={
                      content.index === -1 ? "button active-reading" : "button"
                    }
                    onClick={() =>
                      setContent({
                        index: -1,
                        details: keys?.keyDetails,
                      })
                    }
                  >
                    All solutions
                  </button>
                  {keys?.keyDetails.map((itemLesson, _) => {
                    return (
                      <>
                        {!isEmpty(itemLesson?.lesson_exercises) &&
                          itemLesson?.lesson_exercises.map(
                            (exerciseItem, j) => {
                              return (
                                <button
                                  key={j}
                                  className={
                                    content.index === j
                                      ? "button active-reading"
                                      : "button"
                                  }
                                  onClick={() =>
                                    setContent({
                                      index: j,
                                      details: [keys?.keyDetails[j]],
                                    })
                                  }
                                >
                                  {exerciseItem?.exercise?.title}
                                </button>
                              );
                            }
                          )}
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="right" style={{ zIndex: `${isDrawerOpen ? 0 : 1}` }}>
        <div className="reading-actions">
          <button
            className="button btn-open"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MdList />
          </button>
          <div className="r-actions">
            <button className="button">
              <MdFavoriteBorder className="icon" />
              <span className="fade-in">Add to favorite</span>
            </button>
            <button className="button">
              <BsPatchQuestion className="icon" />
              <span className="fade-in">Questions</span>
            </button>
            <button className="button">
              <FaSlackHash className="icon" />
              <span className="fade-in">Comment</span>
            </button>
            <button className="button">
              <GoCommentDiscussion className="icon" />
              <span className="fade-in">Recommend</span>
            </button>
          </div>
        </div>
        <div className="reading-content">
          {isCurrentAction.isLesson &&
            content?.details.map((itemContent, idx) => {
              return (
                <div key={idx}>
                  <h2 className="title t-1">
                    {idx + 1}. {capitalize(itemContent?.lesson?.title)}
                  </h2>
                  <div className="inner">
                    {itemContent?.lesson_sections?.map((_itenLS, idx_ls) => {
                      const _thumbs = _itenLS?.thumbnails
                        ?.substring(1, _itenLS?.thumbnails.length - 1)
                        .split(",");
                      return (
                        <>
                          <div className="reading-content-text" key={idx_ls}>
                            {_itenLS?.description}
                          </div>
                          <div
                            className="reading-content-images"
                            key={idx_ls + 1}
                          >
                            {_thumbs.map((element, idx_img) => {
                              return (
                                !isEmpty(element) && (
                                  <img
                                    src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${element}`}
                                    alt={element}
                                    key={idx_img}
                                  />
                                )
                              );
                            })}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  {itemContent?.lesson?.type !== "freemium" && (
                    <div className="outer">
                      <img src={PREMUIM} alt="premuim" />
                      <h2 className="title t-2">
                        This is the premium content.
                      </h2>
                      <p className="title t-3">
                        The content required the subscription to date!
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          {isCurrentAction.isExercise &&
            content?.details.map((itemContent, idx_il) => {
              return (
                <>
                  <h2 className="title t-1">
                    {idx_il + 1}. {capitalize(itemContent?.lesson?.title)}
                  </h2>
                  {!isEmpty(itemContent?.lesson_exercises) &&
                    itemContent?.lesson_exercises.map(
                      (itemExercise, idx_ie) => {
                        return (
                          <>
                            <h2 className="title t-2">
                              {idx_il + 1}.{idx_ie + 1}.{" "}
                              {capitalize(itemExercise?.exercise?.title)}
                            </h2>
                            {!isEmpty(itemExercise?.execise_sections) &&
                              itemExercise?.execise_sections.map(
                                (itenExerciseSection, idx_ies) => {
                                  const _thumbs =
                                    itenExerciseSection?.thumbnails
                                      ?.substring(
                                        1,
                                        itenExerciseSection?.thumbnails.length -
                                          1
                                      )
                                      .split(",");
                                  return (
                                    <>
                                      <div className="inner" key={idx_ies}>
                                        <div className="reading-content-text">
                                          {itenExerciseSection?.description}
                                        </div>
                                        <div className="reading-content-images">
                                          {_thumbs.map((element, idx_img) => {
                                            return (
                                              !isEmpty(element) && (
                                                <img
                                                  src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${element}`}
                                                  alt={element}
                                                  key={idx_img}
                                                />
                                              )
                                            );
                                          })}
                                        </div>
                                      </div>
                                      {itemExercise?.exercise?.type !==
                                        "freemium" && (
                                        <div className="outer">
                                          <img src={PREMUIM} alt="premuim" />
                                          <h2 className="title t-2">
                                            This is the premium content.
                                          </h2>
                                          <p className="title t-3">
                                            The content required the
                                            subscription to date!
                                          </p>
                                        </div>
                                      )}
                                    </>
                                  );
                                }
                              )}
                          </>
                        );
                      }
                    )}
                </>
              );
            })}
          {isCurrentAction.isSolution &&
            content?.details.map((itemContent, idx_il) => {
              return (
                <>
                  <h2 className="title t-1">
                    {idx_il + 1}. {capitalize(itemContent?.lesson?.title)}
                  </h2>
                  {!isEmpty(itemContent?.lesson_exercises) &&
                    itemContent?.lesson_exercises.map(
                      (itemExercise, idx_ie) => {
                        return (
                          <>
                            <h2 className="title t-2">
                              {idx_il + 1}.{idx_ie + 1}.{" "}
                              {capitalize(itemExercise?.exercise?.title)}
                            </h2>
                            {isEmpty(itemContent?.exercise_solutions) ? (
                              <p className="title t-3" style={{ color: "red" }}>
                                No solution for this exercise available yet!
                              </p>
                            ) : (
                              itemContent?.exercise_solutions.map(
                                (itemSolution, idx_is) => {
                                  return (
                                    <>
                                      <h2
                                        className="title t-2"
                                        style={{ color: "grey" }}
                                      >
                                        {idx_il + 1}.{idx_ie + 1}.{idx_is + 1}.{" "}
                                        {capitalize(
                                          itemSolution?.solution?.title
                                        )}
                                      </h2>
                                      {!isEmpty(
                                        itemSolution?.solution_sections
                                      ) &&
                                        itemSolution?.solution_sections.map(
                                          (itemSolutionSection, idx_iss) => {
                                            const _thumbs =
                                            itemSolutionSection?.thumbnails
                                                ?.substring(
                                                  1,
                                                  itemSolutionSection
                                                    ?.thumbnails.length - 1
                                                )
                                                .split(",");
                                            return (
                                              <>
                                                <div
                                                  className="inner"
                                                  key={idx_iss}
                                                >
                                                  <div className="reading-content-text">
                                                    {
                                                      itemSolutionSection?.description
                                                    }
                                                  </div>
                                                  <div className="reading-content-images">
                                                    {_thumbs.map(
                                                      (element, idx_img) => {
                                                        return (
                                                          !isEmpty(element) && (
                                                            <img
                                                              src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${element}`}
                                                              alt={element}
                                                              key={idx_img}
                                                            />
                                                          )
                                                        );
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                                {itemSolution?.solution?.type !==
                                                  "freemium" && (
                                                  <div className="outer">
                                                    <img
                                                      src={PREMUIM}
                                                      alt="premuim"
                                                    />
                                                    <h2 className="title t-2">
                                                      This is the premium
                                                      content.
                                                    </h2>
                                                    <p className="title t-3">
                                                      The content required the
                                                      subscription to date!
                                                    </p>
                                                  </div>
                                                )}
                                              </>
                                            );
                                          }
                                        )}
                                    </>
                                  );
                                }
                              )
                            )}
                          </>
                        );
                      }
                    )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Reading;
