import React from "react";
import { BiSearch } from "../../middlewares/icons";
import Modal from "../../components/modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationLevel } from "../../utils/utils";
import { getPrograms } from "../../services/programs";
import {
  onCreateLevel,
  getCustomizedLevels,
  onActivateLevels,
} from "../../services/levels";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/context/state/useAxiosPrivate";
import swal from "sweetalert";

const StudyLevel = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [classNameMsg, setClassNameMsg] = React.useState("");
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(!open);
  };

  const programsData = useSelector(
    (state) => state.setProgramSlice.initPrograms?.programsData
  );

  const customizedLevels = useSelector(
    (state) => state.setLevelSlice.initCustomizedLevels?.customizedLevelsData
  );

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getCustomizedLevels(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpLevels/getCustomizedLevels",
        payload: result,
      });
    });

    getPrograms(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpPrograms/getPrograms",
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

  const onSubmit = async (data) => {
    await wait(300);
    //
    onCreateLevel(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          setClassNameMsg("msg-box msg-box-success fade-in");
          setResponseMessage(response?.data?.message);
          //
          getCustomizedLevels(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUpLevels/getCustomizedLevels",
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

  const onActivate = async (title, id, status) => {
    await wait(300);
    //
    const data = {
      level_id: id,
      level_status: status,
    };
    onActivateLevels(axiosPrivate, data)
      .then((response) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        if (response?.data?.status === 1) {
          swal({
            icon: "success",
            title: "Level Status Processing",
            text: `The ${title} is ${
              status === 1 ? "Desactivated" : "Activated"
            }!`,
          });
          //
          getCustomizedLevels(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUpLevels/getCustomizedLevels",
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
            title: "Level Status Processing",
            text: "No server response",
          });
        } else {
          swal({
            icon: "warning",
            title: "Level Status Processing",
            text: error?.response?.data?.message,
          });
        }
      });
  };

  return (
    <div className="wrapper">
      <div className="levels">
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
          {isEmpty(customizedLevels?.data?.customizedLevels) ? (
            <div style={{ width: "100%", textAlign: "center", padding: "1rem 0" }}>
              <p
                className="title t-1"
                style={{
                  color: "red",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {customizedLevels?.data?.message}
              </p>
            </div>
          ) : (
            customizedLevels?.data?.customizedLevels.map((item, i) => {
              return (
                <div className="level-item" key={i}>
                  <div
                    className={
                      item.level_status === 1
                        ? "status s-act"
                        : "status s-inact"
                    }
                  ></div>
                  <h3 className="title t-2">{item.program_country}</h3>
                  <h3 className="title t-1">
                    {item.level_title.toUpperCase()}
                  </h3>
                  <h3 className="title t-2">
                    {item?.program_language +
                      " - " +
                      item?.program_title +
                      " program"}
                  </h3>
                  <div>
                    <button className="button normal">Remove</button>
                    <button
                      className={
                        item.level_status === 1
                          ? "button danger"
                          : "button normal"
                      }
                      onClick={() =>
                        onActivate(
                          `${item.level_title}, class related to ${item.program_language} ${item.program_title} program for ${item.program_country}}`,
                          item.level_id,
                          item.level_status
                        )
                      }
                    >
                      {item.level_status === 1 ? "Desactivate" : "Activate"}
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
          title="New Level of Study registration"
          content={
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classNameMsg}>
                <span>{responseMessage}</span>
              </div>
              <div className="input-div">
                <select className="input-form" {...register("program")}>
                  <option value="" style={{ color: "grey" }}>
                    Program country
                  </option>
                  {isEmpty(programsData.data?.programs) ? (
                    <option value="" selected>
                      No country available!
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
                  )}
                </select>
                {errors.program && (
                  <span className="fade-in">{errors.program.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("level")}
                />
                <label htmlFor="level" className="label-form">
                  Level of Study
                </label>
                {errors.level && (
                  <span className="fade-in">{errors.level.message}</span>
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
                Save level of study
              </button>
            </form>
          }
        />
      )}
    </div>
  );
};

export default StudyLevel;
