import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSearch } from "../middlewares/icons";
import FREEMIUM from "../assets/svg/fremium.png";
import PREMIUM from "../assets/svg/premium.png";
import Modal from "../components/modal/Modal";

const Research = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const onRead = async(title, content) => {
    setModalContent({ title: title, content: content });
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="research">
        <div className="container margin-auto">
          <div className="header">
            <div className="top">
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  className="logo"
                />
              </Link>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // onChange={(e) => setSearchContent(e.target.value)}
                />
                <label htmlFor="password" className="label-form">
                  Find course, lessons, exercices, solutions, and more...
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
              </div>
              <div className="sign-nav">
                <Link to="/login" className="button">
                  Sign in
                </Link>
                <Link to="/register" className="button">
                  Sign up
                </Link>
              </div>
            </div>
            <div className="bottom">
              <div className="tabs">
                <button
                  className={
                    activeTab === 0 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(0)}
                >
                  All
                </button>
                <button
                  className={
                    activeTab === 1 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(1)}
                >
                  Programs
                </button>
                <button
                  className={
                    activeTab === 2 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(2)}
                >
                  Courses
                </button>
                <button
                  className={
                    activeTab === 3 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(3)}
                >
                  Lessons
                </button>
                <button
                  className={
                    activeTab === 4 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(4)}
                >
                  Exercices
                </button>
                <button
                  className={
                    activeTab === 5 ? "button tab active-tab" : "button tab"
                  }
                  onClick={() => setActiveTab(5)}
                >
                  Study level
                </button>
                <span>About 14,700,000 results (0.48 seconds) </span>
              </div>
            </div>
          </div>
          <div className="content">
            {/* {location.state.searchContent} */}
            <div
              className="item"
              onClick={() => onRead("Title 1", "Content 1")}
            >
              <img src={FREEMIUM} className="icon" />
              <h3 className="title t-2">Mathematics algebra</h3>
              <p className="title t-3">
                Details over Mathematics algebra course content ...
              </p>
            </div>
            <div
              className="item"
              onClick={() => onRead("Title 2", "Content 2")}
            >
              <img src={FREEMIUM} className="icon" />
              <h3 className="title t-2">Mathematics algebra</h3>
              <p className="title t-3">
                Details over Mathematics algebra course content ...
              </p>
            </div>
            <div
              className="item"
              onClick={() => onRead("Title 3", "Content 3")}
            >
              <img src={PREMIUM} className="icon" />
              <h3 className="title t-2">Mathematics algebra</h3>
              <p className="title t-3">
                Details over Mathematics algebra course content ...
              </p>
            </div>
            <div
              className="item"
              onClick={() => onRead("Title 4", "Content 4")}
            >
              <img src={PREMIUM} className="icon" />
              <h3 className="title t-2">Mathematics algebra</h3>
              <p className="title t-3">
                Details over Mathematics algebra course content ...
              </p>
            </div>
            <div
              className="item"
              onClick={() => onRead("Title 5", "Content 5")}
            >
              <img src={FREEMIUM} className="icon" />
              <h3 className="title t-2">Mathematics algebra</h3>
              <p className="title t-3">
                Details over Mathematics algebra course content ...
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Modal
        visibility={true}
          open={onClose}
          width="80%"
          height="50%"
          title={modalContent.title}
          content={modalContent.content}
        />
      )}
    </>
  );
};

export default Research;
