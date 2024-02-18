import React from "react";
import CourseItem from "../../../components/CourseItem/CourseItem";
import { BiSearch } from "../../../middlewares/icons";
import Modal from "../../../components/modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { isEmpty, wait, validationProgram } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import FragmentCourse from "./FragmentCourse";
import FragmentLesson from "./FragmentLesson";
import FragmentExercise from "./FragmentExercise";
import FragmentSolution from "./FragmentSolution";
import AddContent from "./AddContent";
import PreviewContent from "./PreviewContent";

const Content = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [classNameMsg, setClassNameMsg] = React.useState("");
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(!open);
  };

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationProgram),
  });

  const onSubmit = async (data) => {
    await wait(300);
    //
    // onCreatePrograms(axiosPrivate, data)
    //   .then((response) => {
    //     let isMounted = true;
    //     const controller = new AbortController();
    //     const signal = controller.signal;
    //     if (response?.data?.status === 1) {
    //       setClassNameMsg("msg-box msg-box-success fade-in");
    //       setResponseMessage(response?.data?.message);
    //       //
    //       getCustomizedPrograms(axiosPrivate, signal).then((result) => {
    //         dispatch({
    //           type: "setUpPrograms/getCustomizedPrograms",
    //           payload: result,
    //         });
    //       });
    //       reset();
    //     }
    //     const timer = setTimeout(() => {
    //       setClassNameMsg("display-none");
    //     }, 4000);
    //     return () => {
    //       clearTimeout(timer);
    //       isMounted = false;
    //       isMounted && controller.abort();
    //     };
    //   })
    //   .catch((error) => {
    //     setClassNameMsg("msg-box msg-box-failed fade-in");
    //     if (!error?.response) {
    //       setResponseMessage("No server response");
    //     } else {
    //       setResponseMessage(error?.response?.data?.message);
    //     }
    //     const timer = setTimeout(() => {
    //       setClassNameMsg("display-none");
    //     }, 4000);
    //     return () => clearTimeout(timer);
    //   });
  };

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
          <button className="button validate" onClick={() => setOpen(!open)}>
            Course Manager
          </button>
        </div>
        <div className="course-content">
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Mathematics" + user.userInfo?.sys_role} totalLessons={25} totalExercises={25}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Physics"} totalLessons={15} totalExercises={30}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
          <CourseItem to={`/${user.userInfo?.sys_role}/courses/reading`} courseTitle={"Chemistry"} totalLessons={5} totalExercises={10}/>
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
                <button
                  className={tab === 4 ? "button active-tab" : "button"}
                  onClick={() => setTab(4)}
                >
                  Add
                </button>
                <button
                  className={tab === 5 ? "button active-tab" : "button"}
                  onClick={() => setTab(5)}
                >
                  Preview
                </button>
              </div>
              <div className="cm-content">
                {tab === 0 && <FragmentSolution />}
                {tab === 1 && <FragmentExercise />}
                {tab === 2 && <FragmentLesson />}
                {tab === 3 && <FragmentCourse />}
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
