import React from "react";
import Modal from "../../components/modal/Modal";
import countries from "../../middlewares/countries.json";
import {
  BiSearch,
  IoBook,
  IoBookOutline,
  GiSpellBook,
  RiTimerLine,
} from "../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationProgram } from "../../utils/utils";
import {
  onCreatePrograms,
  getCustomizedPrograms,
  onActivatePrograms,
} from "../../services/programs";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/context/state/useAxiosPrivate";
import swal from "sweetalert";

const Programs = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [classNameMsg, setClassNameMsg] = React.useState("");
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(!open);
  };

  const customizedPrograms = useSelector(
    (state) =>
      state.setProgramSlice.initCustomizedPrograms?.customizedProgramsData
  );

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getCustomizedPrograms(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpPrograms/getCustomizedPrograms",
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
    resolver: yupResolver(validationProgram),
  });

  const onSubmit = async (data) => {
    await wait(300);
    //
    onCreatePrograms(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          setClassNameMsg("msg-box msg-box-success fade-in");
          setResponseMessage(response?.data?.message);
          //
          getCustomizedPrograms(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUpPrograms/getCustomizedPrograms",
              payload: result,
            });
          });
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

  const onActivate = async (title, id, status) => {
    await wait(300);
    //
    const data = {
      program_id: id,
      program_status: status,
    };
    onActivatePrograms(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          swal({
            icon: "success",
            title: "Program Status Processing",
            text: `The ${title} is ${
              status === 1 ? "Desactivated" : "Activated"
            }!`,
          });
          //
          getCustomizedPrograms(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUpPrograms/getCustomizedPrograms",
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
            title: "Program Status Processing",
            text: "No server response",
          });
        } else {
          swal({
            icon: "warning",
            title: "Program Status Processing",
            text: error?.response?.data?.message,
          });
        }
      });
  };

  return (
    <div className="wrapper">
      <div className="programs">
        <div className="head">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("prename")}
            />
            <label htmlFor="prename" className="label-form">
              Search programs by country, language or type
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
          <button className="button validate" onClick={() => setOpen(!open)}>
            New Program
          </button>
        </div>
        <div className="body">
          {isEmpty(customizedPrograms?.data?.customizedPrograms) ? (
            <div
              style={{ width: "100%", textAlign: "center", padding: "1rem 0" }}
            >
              <p
                className="title t-1"
                style={{
                  color: "red",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {customizedPrograms?.data?.message}
              </p>
            </div>
          ) : (
            customizedPrograms?.data?.customizedPrograms.map((item, i) => {
              return (
                <div className="program-item" key={i}>
                  <div
                    className={
                      item.program_status === 1
                        ? "status s-act"
                        : "status s-inact"
                    }
                  ></div>
                  <h3 className="title t-2">{item.program_country}</h3>
                  <h3 className="title t-1">{`${item.program_language} ${item.program_title} Program`}</h3>
                  <p className="title t-3">{`${item.total_levels} classes`}</p>
                  <p className="title t-3">
                    <span>
                      <IoBook className="icon" />
                      {`${item.courses.total} Courses`}
                    </span>
                    <span>
                      <RiTimerLine className="icon" />
                      {`${item.courses.timing} min.`}
                    </span>
                  </p>
                  <p className="title t-3">
                    <span>
                      <IoBookOutline className="icon" />
                      {`${item.lessons.total} Lessons`}
                    </span>
                    <span>
                      <RiTimerLine className="icon" />
                      {`${item.lessons.timing} min.`}
                    </span>
                  </p>
                  <p className="title t-3">
                    <span>
                      <GiSpellBook className="icon" />
                      {`${item.exercices.total} Exercices`}
                    </span>
                    <span>
                      <RiTimerLine className="icon" />
                      {`${item.exercices.timing} min.`}
                    </span>
                  </p>
                  <div>
                    <button className="button normal">Remove</button>
                    <button
                      className={
                        item.program_status === 1
                          ? "button danger"
                          : "button normal"
                      }
                      onClick={() =>
                        onActivate(
                          `${item.program_language} ${item.program_title} Program for ${item.program_country}}`,
                          item.program_id,
                          item.program_status
                        )
                      }
                    >
                      {item.program_status === 1 ? "Desactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {open && (
        <Modal
          visibility={true}
          open={onClose}
          height="auto"
          maxHeight="55%"
          width="50%"
          title="New Study Program registration"
          content={
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classNameMsg}>
                <span>{responseMessage}</span>
              </div>
              <div className="input-div">
                <select className="input-form" {...register("program_country")}>
                  <option value="" style={{ color: "grey" }}>
                    Program country
                  </option>
                  {isEmpty(countries) ? (
                    <option value="" selected>
                      No country available!
                    </option>
                  ) : (
                    countries.map((item, i) => (
                      <option key={i} value={item.name.official}>
                        {item.name.official}
                      </option>
                    ))
                  )}
                </select>
                {errors.program_country && (
                  <span className="fade-in">
                    {errors.program_country.message}
                  </span>
                )}
              </div>
              <div className="input-div">
                <select
                  className="input-form"
                  {...register("program_language")}
                >
                  <option value="" style={{ color: "grey" }} selected>
                    Program Language
                  </option>
                  <option value="english">English</option>
                  <option value="french">Français</option>
                </select>
                {errors.program_language && (
                  <span className="fade-in">
                    {errors.program_language.message}
                  </span>
                )}
              </div>
              <div className="input-div">
                <select className="input-form" {...register("program_type")}>
                  <option value="" style={{ color: "grey" }} selected>
                    Program type
                  </option>
                  <option value="National">National</option>
                  <option value="Standard">Standard</option>
                </select>
                {errors.program_type && (
                  <span className="fade-in">{errors.program_type.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="button validate"
                style={{ borderRadius: "4px", color: "white", width: "100%" }}
              >
                Create program
              </button>
            </form>
          }
        />
      )}
    </div>
  );
};

export default Programs;
