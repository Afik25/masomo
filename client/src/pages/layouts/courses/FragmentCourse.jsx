import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationCourse } from "../../../utils/utils";
import { getPrograms } from "../../../services/programs";
import { getLevels } from "../../../services/levels";
import { onCreateCourse, getCustomizedCourses } from "../../../services/courses";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { BiSearch, RiTimerLine } from "../../../middlewares/icons";

const FragmentCourse = () => {
  const axiosPrivate = useAxiosPrivate();
  const [responseMessage, setResponseMessage] = React.useState("");
  const [classNameMsg, setClassNameMsg] = React.useState("");
  const [selectedLevels, setSelectedLevels] = React.useState(null);
  const dispatch = useDispatch();

  const programsData = useSelector(
    (state) => state.setProgramSlice.initPrograms?.programsData
  );

  const levelsData = useSelector(
    (state) => state.setLevelSlice.initLevels?.levelsData
  );

  const customizedCoursesData = useSelector(
    (state) => state.setCourseSlice.initCustomizedCourses?.customizedCoursesData
  );

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getCustomizedCourses(axiosPrivate, signal).then((result) => {
      console.log({"checl getCustomizedCourses":result});
      dispatch({
        type: "setUpCourses/getCustomizedCourses",
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
    resolver: yupResolver(validationCourse),
  });

  const onSubmit = async (data) => {
    await wait(300);
    //
    onCreateCourse(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          setClassNameMsg("msg-box msg-box-success fade-in");
          setResponseMessage(response?.data?.message);
          //
          getCustomizedCourses(axiosPrivate, signal).then((result) => {
            console.log({"checl getCustomizedCourses":result});
            dispatch({
              type: "setUpCourses/getCustomizedCourses",
              payload: result,
            });
          });
          //
          reset();
        }
        const timer = setTimeout(() => {
          setClassNameMsg("display-none");
        }, 4000);
        return () => {
          clearTimeout(timer);
          isMounted = false;
          isMounted && controller.abort();
        };
      })
      .catch((error) => {
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
    <div className="fragment-course fade-in">
      <div className="fc-left">
        <div className="fc-filter">
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
                // {...register("program")}
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
                // {...register("program")}
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
          </div>
        </div>
        <div className="fc-container">
          <div className="fcc-item">
            <h1 className="title t-1">Country's name</h1>
            <div className="fcc-content">
              <div className="prog-item">
                <h2 className="title t-2">Program's title</h2>
                <div className="fcc-details">
                  <div className="c-item">
                    <h2 className="title t-2">Course's title</h2>
                    <h3 className="title t-3">Course's level of study</h3>
                    <p className="title t-4">
                      Reading <RiTimerLine className="icon" /> 25 min.
                    </p>
                    <div className="fcc-actions">
                      <button className="button">Add lessons</button>
                      <button className="button desactivated">Activate</button>
                    </div>
                  </div>
                  <div className="c-item">
                    <h2 className="title t-2">Course's title</h2>
                    <h3 className="title t-3">Course's level of study</h3>
                    <p className="title t-4">
                      Reading <RiTimerLine className="icon" /> 25 min.
                    </p>
                    <div className="fcc-actions">
                      <button className="button">Add lessons</button>
                      <button className="button activated">Desactivate</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fc-right">
        <h1 className="title t-1">Adding a New Course</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classNameMsg}>
            <span>{responseMessage}</span>
          </div>
          <div className="input-div">
            <select
              className="input-form"
              {...register("program", {
                onChange: (e) => {
                  let _data = levelsData?.data?.levels.filter(
                    (item) => item.program_id == e.target.value
                  );
                  setSelectedLevels(null);
                  setSelectedLevels(_data);
                },
              })}
            >
              <option value="" style={{ color: "grey" }}>
                Program country
              </option>
              {isEmpty(programsData?.data?.programs) ? (
                <option value="" selected>
                  {programsData?.data?.message}
                </option>
              ) : (
                programsData?.data?.programs.map((_item, i) => {
                  return (
                    <option key={i} value={_item.id}>
                      {_item?.language +
                        " - " +
                        _item?.title +
                        " program / " +
                        _item?.country}
                    </option>
                  );
                })
              )}
            </select>
            {errors.program && (
              <span className="fade-in">{errors.program.message}</span>
            )}
          </div>
          <div className="input-div">
            <select className="input-form" {...register("level")}>
              <option value="" style={{ color: "grey" }}>
                Level of study
              </option>
              {isEmpty(selectedLevels) ? (
                <option value="" selected>
                  No level available!
                </option>
              ) : (
                selectedLevels.map((lev, i) => {
                  return (
                    <option key={i} value={lev.id}>
                      {lev.title.toLowerCase()}
                    </option>
                  );
                })
              )}
            </select>
            {errors.level && (
              <span className="fade-in">{errors.level.message}</span>
            )}
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("title")}
            />
            <label htmlFor="title" className="label-form">
              Course's title
            </label>
            {errors.title && (
              <span className="fade-in">{errors.title.message}</span>
            )}
          </div>
          <div className="input-div">
            <textarea
              type="text"
              className="input-textarea"
              autoComplete="none"
              placeholder=" "
              {...register("description")}
              rows={10}
            ></textarea>
            <label htmlFor="description" className="label-form">
              Description
            </label>
            {errors.description && (
              <span className="fade-in">{errors.description.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="button validate"
            style={{ borderRadius: "4px", color: "white", width: "100%" }}
          >
            Add course
          </button>
        </form>
      </div>
    </div>
  );
};

export default FragmentCourse;
