import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationLevel } from "../../../utils/utils";
import { getPrograms } from "../../../services/programs";
import { getLevels } from "../../../services/levels";
import {
  getCustomizedLessons,
  onActivateLessons,
} from "../../../services/lessons";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import useAuth from "../../../hooks/context/state/useAuth";
import { BiSearch, RiTimerLine } from "../../../middlewares/icons";
import swal from "sweetalert";

const FragmentLesson = ({ onAdding, onPreview }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setKeys } = useAuth();
  const dispatch = useDispatch();

  const programsData = useSelector(
    (state) => state.setProgramSlice.initPrograms?.programsData
  );

  const levelsData = useSelector(
    (state) => state.setLevelSlice.initLevels?.levelsData
  );

  const customizedLessonsData = useSelector(
    (state) => state.setLessonSlice.initCustomizedLessons?.customizedLessonsData
  );

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getCustomizedLessons(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpLessons/getCustomizedLessons",
        payload: result,
      });
    });

    getPrograms(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpPrograms/getPrograms",
        payload: result,
      });
    });
    getLevels(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpLevels/getLevels",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationLevel),
  });

  const onActivate = async (title, id, status) => {
    await wait(300);
    //
    const data = {
      lesson_id: id,
      lesson_status: status,
    };
    onActivateLessons(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          swal({
            icon: "success",
            title: "Lesson Status Processing",
            text: `The lesson related to ${title} is ${
              status === 1 ? "Desactivated" : "Activated"
            }!`,
          });
          //
          getCustomizedLessons(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUpLessons/getCustomizedLessons",
              payload: result,
            });
          });
        }
        return () => {
          isMounted = false;
          isMounted && controller.abort();
        };
      })
      .catch((error) => {
        if (!error?.response) {
          swal({
            icon: "warning",
            title: "Lesson Status Processing",
            text: "No server response",
          });
        } else {
          swal({
            icon: "warning",
            title: "Lesson Status Processing",
            text: error?.response?.data?.message,
          });
        }
      });
  };

  return (
    <div className="fragment-lesson fade-in">
      <div className="fl-filter">
        <div className="section-1">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("prename")}
            />
            <label htmlFor="prename" className="label-form">
              Search course by country, program or language
            </label>
            <label htmlFor="password" className="label-icon">
              <BiSearch
                style={{ cursor: "pointer" }}
                // onClick={() =>
                //   navigate(`/search/${searchContent}`, {
                //     state: { searchContent: searchContent },
                //   })
                // }
              />
            </label>
            {/* {errors.prename && (
            <span className="fade-in">{errors.prename.message}</span>
          )} */}
          </div>
          <button className="button validate" onClick={() => null}>
            Search
          </button>
        </div>
        <div className="section-2">
          <div className="input-div">
            <select
              className="input-form"
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
            >
              <option value="" style={{ color: "grey" }} selected>
                Program country
              </option>
              {/* {isEmpty(programsData.data?.programs) ? (
                <option value="" selected>
                  {programsData.data?.message}
                </option>
              ) : (
                programsData.data?.programs.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item?.language +
                      " - " +
                      item?.title +
                      " program / " +
                      item?.country}
                  </option>
                ))
              )} */}
            </select>
          </div>
          <div className="input-div">
            <select
              className="input-form"
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
            >
              <option value="" style={{ color: "grey" }} selected>
                Level of study
              </option>
              {/* {isEmpty(programsData.data?.programs) ? (
                <option value="" selected>
                  {programsData.data?.message}
                </option>
              ) : (
                programsData.data?.programs.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item?.language +
                      " - " +
                      item?.title +
                      " program / " +
                      item?.country}
                  </option>
                ))
              )} */}
            </select>
          </div>
          <div className="input-div">
            <select
              className="input-form"
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
            >
              <option value="" style={{ color: "grey" }} selected>
                Course
              </option>
              {/* {isEmpty(programsData.data?.programs) ? (
                <option value="" selected>
                  {programsData.data?.message}
                </option>
              ) : (
                programsData.data?.programs.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item?.language +
                      " - " +
                      item?.title +
                      " program / " +
                      item?.country}
                  </option>
                ))
              )} */}
            </select>
          </div>
        </div>
      </div>
      <div className="fl-container">
        <div className="fl-country">
          {isEmpty(customizedLessonsData?.data?.customizedLessons) ? (
            <p className="title t-1">{customizedLessonsData?.data?.message}</p>
          ) : (
            customizedLessonsData?.data?.customizedLessons.map(
              (itemCountry, idx) => {
                return (
                  <div className="fl-country-item" key={idx}>
                    <h2 className="title t-1">{itemCountry?.country}</h2>
                    <div className="fl-programs">
                      {isEmpty(itemCountry?.content) ? (
                        <p className="title t-2">No program available yet!</p>
                      ) : (
                        itemCountry?.content.map((itemProgram, i) => {
                          return (
                            <div className="fl-program-item" key={i}>
                              <h2 className="title t-2">
                                {itemProgram?.program_title} Program /{" "}
                                {itemProgram?.program_language.toUpperCase()}
                              </h2>
                              <div className="fl-levels">
                                {isEmpty(itemProgram?.levels) ? (
                                  <p className="title t-3">
                                    No level for the program available yet!
                                  </p>
                                ) : (
                                  itemProgram?.levels.map((itemLevel, j) => {
                                    return (
                                      <div className="fl-level-item" key={j}>
                                        <h2 className="title t-3">
                                          {itemLevel?.level?.title.toUpperCase()}{" "}
                                          Level
                                        </h2>
                                        <div className="fl-courses">
                                          {isEmpty(itemLevel?.level_courses) ? (
                                            <p className="title t-3">
                                              No course for the level available
                                              yet!
                                            </p>
                                          ) : (
                                            itemLevel?.level_courses.map(
                                              (itemCourse, k) => {
                                                return (
                                                  <div
                                                    className="fl-course-item"
                                                    key={k}
                                                  >
                                                    <h2 className="title t-2">
                                                      course of{" "}
                                                      {itemCourse?.course?.title.toUpperCase()}
                                                    </h2>
                                                    <div className="fl-lessons">
                                                      {isEmpty(
                                                        itemCourse?.course_lessons
                                                      ) ? (
                                                        <p className="title t-3">
                                                          No lesson for the
                                                          course available yet!
                                                        </p>
                                                      ) : (
                                                        itemCourse?.course_lessons.map(
                                                          (itemLesson, l) => {
                                                            return (
                                                              <div
                                                                className="fl-lesson-item"
                                                                key={l}
                                                              >
                                                                <h3 className="title t-3">
                                                                  lesson of{" "}
                                                                  {
                                                                    itemLesson
                                                                      ?.lesson
                                                                      ?.title
                                                                  }
                                                                </h3>
                                                                <p className="title t-4">
                                                                  Reading{" "}
                                                                  <RiTimerLine className="icon" />{" "}
                                                                  {
                                                                    itemLesson
                                                                      ?.lesson
                                                                      ?.timing
                                                                  }{" "}
                                                                  min.
                                                                </p>
                                                                <div className="fl-actions">
                                                                  <button
                                                                    className="button"
                                                                    onClick={() => {
                                                                      onAdding();
                                                                      setKeys({
                                                                        keyId:
                                                                          itemLesson
                                                                            ?.lesson
                                                                            .id,
                                                                        keyTitle:
                                                                          "isExercise",
                                                                        keyCourse:
                                                                          itemCourse
                                                                            ?.course
                                                                            ?.title,
                                                                        keyDetails:
                                                                          itemLesson
                                                                            ?.lesson
                                                                            .title,
                                                                        keyLevel:
                                                                          itemLevel
                                                                            ?.level
                                                                            ?.title,
                                                                        keyProgram:
                                                                          itemProgram?.program_title +
                                                                          " Program / " +
                                                                          itemProgram?.program_language.toUpperCase(),
                                                                        keyCountry:
                                                                          itemCountry?.country,
                                                                      });
                                                                    }}
                                                                  >
                                                                    Add exercise
                                                                  </button>
                                                                  <button className="button">
                                                                    Edit
                                                                    exercise
                                                                  </button>
                                                                  <button
                                                                    className="button"
                                                                    onClick={() => {
                                                                      onPreview();
                                                                      setKeys({
                                                                        keyDetails:{
                                                                          country: itemCountry?.country,
                                                                          program: itemProgram?.program_title,
                                                                          language: itemProgram?.program_language,
                                                                          level: itemLevel?.level?.title,
                                                                          course: itemCourse?.course?.title,
                                                                          lesson: itemLesson?.lesson?.title,
                                                                          content:itemLesson?.lesson_sections,
                                                                        },
                                                                      });
                                                                    }}
                                                                  >
                                                                    Preview
                                                                  </button>
                                                                  <button
                                                                    className={
                                                                      itemLesson
                                                                        ?.lesson
                                                                        ?.status ===
                                                                      0
                                                                        ? "button activated"
                                                                        : "button desactivated"
                                                                    }
                                                                    onClick={() =>
                                                                      onActivate(
                                                                        `${itemLesson?.lesson?.title}`,
                                                                        itemLesson
                                                                          ?.lesson
                                                                          ?.id,
                                                                        itemLesson
                                                                          ?.lesson
                                                                          ?.status
                                                                      )
                                                                    }
                                                                  >
                                                                    {itemLesson
                                                                      ?.lesson
                                                                      ?.status ===
                                                                    0
                                                                      ? "Activate"
                                                                      : "Desactivate"}
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            );
                                                          }
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FragmentLesson;
