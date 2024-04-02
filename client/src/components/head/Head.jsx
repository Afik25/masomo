import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/context/state/useLogout";
import { useSelector } from "react-redux";
import {
  BiSearch,
  IoNotificationsOutline,
  BiEnvelope,
  BiChevronUp,
  BiChevronDown,
  FiUser,
  IoHelp,
  FiLogOut,
} from "../../middlewares/icons";
import { capitalize } from "../../utils/utils";

const Head = () => {
  const [option, setOption] = useState(false);

  // logout
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <div className="user-head">
      <img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" />
      <div className="input-div">
        <input
          type="text"
          className="input-form"
          autoComplete="none"
          placeholder=" "
        />
        <label htmlFor="password" className="label-form">
          Find course, lessons, exercices, solutions, and more...
        </label>
        <label htmlFor="password" className="label-icon">
          <BiSearch style={{ cursor: "pointer" }} />
        </label>
      </div>
      <div className="options display-flex">
        <div className="option">
          <IoNotificationsOutline className="icon-element" />
          <span></span>
        </div>
        <div className="option">
          <BiEnvelope className="icon-element" />
          <span></span>
        </div>
        <div className="profile">
          <div
            className="profile-item display-flex align-items-center"
            onClick={() => setOption(!option)}
            style={{ cursor: "pointer" }}
          >
            <div className="option">
              <img
                src={
                  !connectedUser?.userInfo?.thumbnails
                    ? process.env.PUBLIC_URL + "/user.png"
                    : `${process.env.API_SERVER_URL}:${process.env.API_SERVER_PORT}/${connectedUser?.userInfo?.thumbnails}`
                }
                alt="user-profile"
              />
            </div>
            <h3 className="title t-2">
              {capitalize(connectedUser?.userInfo?.prename) +
                " " +
                capitalize(connectedUser?.userInfo?.name)}
            </h3>
            {option ? (
              <BiChevronUp className="icon" />
            ) : (
              <BiChevronDown className="icon" />
            )}
          </div>
          <div className={option ? "profile-item display" : "profile-item"}>
            <Link to="" className="nav-link">
              <FiUser className="icon" />
              <span>Profile</span>
            </Link>
            <Link to="" className="nav-link">
              <IoHelp className="icon" />
              <span>Help</span>
            </Link>
            <div className="nav-link" onClick={signOut}>
              <FiLogOut className="icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
