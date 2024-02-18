import React from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/Modal";
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

const Library = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [bm, setBm] = React.useState(0);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [classNameMsg, setClassNameMsg] = React.useState("");
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(!open);
  };

  // React.useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   getCustomizedPrograms(axiosPrivate, signal).then((result) => {
  //     dispatch({
  //       type: "setUpPrograms/getCustomizedPrograms",
  //       payload: result,
  //     });
  //   });

  //   return () => {
  //     isMounted = false;
  //     isMounted && controller.abort();
  //   };
  // }, []);

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

  return (
    <div className="wrapper">
      <div className="library">
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
              Search book by title, category
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
            Book management
          </button>
        </div>
        <div className="filter-category">
          <button className="button active-button">All</button>
          <button className="button">Church</button>
          <button className="button">Roman</button>
        </div>
        <div className="body">
          <div className="item-category">
            <h3 className="title t-2">Category's title</h3>
            <div className="item-category-content">
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
            </div>
          </div>
          <div className="item-category">
            <h3 className="title t-2">Category's title</h3>
            <div className="item-category-content">
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
              <Link to="#" className="link">
                <div>
                  <img src={process.env.PUBLIC_URL + "/cover.jpeg"} alt="img" />
                  <button className="button">Activate</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          visibility={true}
          open={onClose}
          height="auto"
          maxHeight="55%"
          width="50%"
          title="Book Management"
          content={
            <div className="book-management">
              <div className="bm-head">
                <button
                  className={bm === 0 ? "button active-tab" : "button"}
                  onClick={() => setBm(0)}
                >
                  New book
                </button>
                <button
                  className={bm === 1 ? "button active-tab" : "button"}
                  onClick={() => setBm(1)}
                >
                  Othor
                </button>
                <button
                  className={bm === 2 ? "button active-tab" : "button"}
                  onClick={() => setBm(2)}
                >
                  Category
                </button>
              </div>
              <div className="bm-body">
                {bm === 0 && <div className="new-book">New book</div>}
                {bm === 1 && <div className="othor">Othor</div>}
                {bm === 2 && (
                  <div className="category">
                    <form>
                      <div className="input-div">
                        <input
                          type="text"
                          className="input-form"
                          autoComplete="none"
                          placeholder=" "
                          // {...register("prename")}
                        />
                        <label htmlFor="prename" className="label-form">
                          Category's title
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
                      <button
                        className="button validate"
                        onClick={() => setOpen(!open)}
                      >
                        Add category
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Library;
