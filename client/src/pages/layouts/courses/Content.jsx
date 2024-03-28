import React from "react";
import CourseItem from "../../../components/CourseItem/CourseItem";
import { BiSearch } from "../../../middlewares/icons";
import Modal from "../../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import FragmentCourse from "./FragmentCourse";
import FragmentLesson from "./FragmentLesson";
import FragmentExercise from "./FragmentExercise";
import FragmentSolution from "./FragmentSolution";
import AddContent from "./AddContent";
import PreviewContent from "./PreviewContent";
//
import { isEmpty, capitalize } from "../../../utils/utils";
import { getCustomizedCoursesByLevels } from "../../../services/courses";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";

const Content = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [_courses, setCourses] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getCustomizedCoursesByLevels(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpCourses/getCustomizedCoursesbyLevels",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );
  const customizedCoursesByLevelsData = useSelector(
    (state) =>
      state.setCourseSlice.initCustomizedCoursesByLevels
        ?.customizedCoursesByLevelsData
  );

  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <div className="course-filter">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("search")}
            />
            <label htmlFor="search" className="label-form">
              Search course, lesson, exercises...
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
            <span className="fade-in">{errors.search.message}</span>
          )} */}
          </div>
          {user?.userInfo?.sys_role != "student" && (
            <button className="button validate" onClick={() => setOpen(!open)}>
              Course Manager
            </button>
          )}
        </div>
        <div className="course-content">
          {isEmpty(
            customizedCoursesByLevelsData?.data?.customizedCoursesByLevels
          ) ? (
            <p className="title t-2">No course available yet!</p>
          ) : (
            customizedCoursesByLevelsData?.data?.customizedCoursesByLevels.map(
              (itemLevel, i) => {
                return (
                  <div className="course-content-container" key={i}>
                    <h3 className="title t-1">
                      {itemLevel?.level?.title.toUpperCase()}
                    </h3>
                    <div className="course-content-item" key={i}>
                      {isEmpty(itemLevel?.level_courses) ? (
                        <p className="title t-2" style={{ color: "red" }}>
                          No course available for the{" "}
                          {itemLevel?.level?.title.toUpperCase()} Level yet!
                        </p>
                      ) : (
                        itemLevel?.level_courses.map((itemCourse, j) => {
                          return (
                            <CourseItem
                              to={`/${
                                user.userInfo?.sys_role
                              }/courses/reading/${
                                itemCourse?.course?.title
                              }/${JSON.stringify(itemCourse?.course_lessons)}`}
                              courseTitle={capitalize(itemCourse?.course?.title)}
                              totalLessons={itemCourse?.total_lessons}
                              totalExercises={itemCourse?.total_exercises}
                            />
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
      {open && (
        <Modal
          visibility={true}
          open={onClose}
          height="98%"
          maxHeight="100%"
          width="98%"
          title="Courses Management"
          content={
            <div className="course-modal">
              <div className="cm-head">
                <button
                  className={tab === 0 ? "button active-tab" : "button"}
                  onClick={() => setTab(0)}
                >
                  Solutions
                </button>
                <button
                  className={tab === 1 ? "button active-tab" : "button"}
                  onClick={() => setTab(1)}
                >
                  Exercises
                </button>
                <button
                  className={tab === 2 ? "button active-tab" : "button"}
                  onClick={() => setTab(2)}
                >
                  Lessons
                </button>
                <button
                  className={tab === 3 ? "button active-tab" : "button"}
                  onClick={() => setTab(3)}
                >
                  Courses
                </button>
                <button className={tab === 4 ? "button active-tab" : "button"}>
                  Adding content
                </button>
                <button className={tab === 5 ? "button active-tab" : "button"}>
                  Preview content
                </button>
              </div>
              <div className="cm-content">
                {tab === 0 && (
                  <FragmentSolution
                    onAdding={() => setTab(4)}
                    onPreview={() => setTab(5)}
                  />
                )}
                {tab === 1 && (
                  <FragmentExercise
                    onAdding={() => setTab(4)}
                    onPreview={() => setTab(5)}
                  />
                )}
                {tab === 2 && (
                  <FragmentLesson
                    onAdding={() => setTab(4)}
                    onPreview={() => setTab(5)}
                  />
                )}
                {tab === 3 && <FragmentCourse onAdding={() => setTab(4)} />}
                {tab === 4 && <AddContent />}
                {tab === 5 && <PreviewContent />}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Content;
