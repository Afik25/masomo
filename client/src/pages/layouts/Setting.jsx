import React, { useState } from "react";
import {
  BiCheck,
  IoCloseOutline,
  BsEyeSlash,
  BsEye,
  BiChevronUp,
  BiChevronDown,
} from "../../middlewares/icons";
import swal from "sweetalert";

const Setting = () => {
  const [switched, setSwitched] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [theme, setTheme] = useState({
    code: "default",
    label: "Default",
  });
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState({
    code: "en",
    label: "english",
    flag: "flag-en.png",
  });
  const toggle = () => setSwitched(!switched);

  return (
    <div className="settings">
      <div className="container">
        <div className="profile">
          <h2 className="title t-1">Profile</h2>
          <hr />
          <div className="item">
            <div>
              <img src={process.env.PUBLIC_URL + "/user.png"} alt="fr-flag" />
              <h3 className="title t-2">Amisi FIKIRINI</h3>
            </div>
            <button className="button">Edit profile</button>
          </div>
          <hr />
          <div className="item">
            <h3 className="title t-2">Email address</h3>
            <p className="title t-3">amisifikirini@gmail.com</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Phone number</h3>
            <p className="title t-3">+243 81 61 94 942</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Account type</h3>
            <p className="title t-3">Student</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Date of Birth</h3>
            <p className="title t-3">25 May 1995</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Place of Birth</h3>
            <p className="title t-3">Kinshasa</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Nationality</h3>
            <p className="title t-3">Democratic Republic of Congo</p>
          </div>
        </div>
        <div className="general">
          <h2 className="title t-1">General</h2>
          <div className="item">
            <p className="title t-3">Push Notifications</p>
            <div className="switch-wrapper">
              <span>{switched ? "On" : "Off"}</span>
              <div className="switch" onClick={toggle}>
                <div
                  className={
                    switched
                      ? "switched switched-active"
                      : "switched switched-inactive"
                  }
                  onClick={toggle}
                >
                  {switched ? (
                    <BiCheck className="icon" />
                  ) : (
                    <IoCloseOutline className="icon" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div>
              <h3 className="title t-2">Theme</h3>
              <p className="title t-3">
                Configure your theme according to your preference.
              </p>
            </div>
            <div className="languages">
              <div
                className="display-flex justify-content-center align-items-center lang-selected"
                onClick={() => setOpenTheme(!openTheme)}
              >
                <span>{theme.label}</span>
                <span>{openTheme ? <BiChevronUp /> : <BiChevronDown />}</span>
              </div>
              {openTheme && (
                <div className="lang-options">
                  <div
                    className="display-flex justify-content-flex-start align-items-center lang-option"
                    onClick={() => {
                      setTheme({
                        code: "default",
                        label: "Default",
                      });
                      setOpenTheme(!openTheme);
                    }}
                  >
                    <span>Default</span>
                  </div>
                  <div
                    className="display-flex justify-content-flex-start align-items-center lang-option"
                    onClick={() => {
                      setTheme({
                        code: "light",
                        label: "Light",
                      });
                      setOpenTheme(!openTheme);
                    }}
                  >
                    <span>Light</span>
                  </div>
                  <div
                    className="display-flex justify-content-flex-start align-items-center lang-option"
                    onClick={() => {
                      setTheme({
                        code: "dark",
                        label: "Dark",
                      });
                      setOpenTheme(!openTheme);
                    }}
                  >
                    <span>Dark</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="item">
            <div>
              <h3 className="title t-2">Language</h3>
              <p className="title t-3">Choose you preference's language.</p>
            </div>
            <div className="languages">
              <div
                className="display-flex justify-content-center align-items-center lang-selected"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={process.env.PUBLIC_URL + `/flags/${language.flag}`}
                  alt={language.code + "-" + language.label}
                />
                <span>{language.label}</span>
                <span>{open ? <BiChevronUp /> : <BiChevronDown />}</span>
              </div>
              {open && (
                <div className="lang-options">
                  <div
                    className="display-flex justify-content-flex-start align-items-center lang-option"
                    onClick={() => {
                      setLanguage({
                        code: "en",
                        label: "english",
                        flag: "flag-en.png",
                      });
                      setOpen(!open);
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/flags/flag-en.png"}
                      alt="en-flag"
                    />
                    <span>english</span>
                  </div>
                  <div
                    className="display-flex justify-content-flex-start align-items-center lang-option"
                    onClick={() => {
                      setLanguage({
                        code: "fr",
                        label: "french",
                        flag: "flag-fr.png",
                      });
                      setOpen(!open);
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/flags/flag-fr.png"}
                      alt="fr-flag"
                    />
                    <span>french</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Notifications */}
          <h3 className="title t-2">Notifications and Tags</h3>
          <hr />
          <div className="item">
            <div>
              <h3 className="title t-2">Notification</h3>
              <p className="title t-3">
                You will be notified when anyone shares a report or invites you
                to a project
              </p>
            </div>
            <div className="switch-wrapper">
              <span>{switched ? "On" : "Off"}</span>
              <div className="switch" onClick={toggle}>
                <div
                  className={
                    switched
                      ? "switched switched-active"
                      : "switched switched-inactive"
                  }
                  onClick={toggle}
                >
                  {switched ? (
                    <BiCheck className="icon" />
                  ) : (
                    <IoCloseOutline className="icon" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div>
              <h3 className="title t-2">Notification</h3>
              <p className="title t-3">
                A weekly update on changes in theme sentiment and more
              </p>
            </div>
            <div className="switch-wrapper">
              <span>{switched ? "On" : "Off"}</span>
              <div className="switch" onClick={toggle}>
                <div
                  className={
                    switched
                      ? "switched switched-active"
                      : "switched switched-inactive"
                  }
                  onClick={toggle}
                >
                  {switched ? (
                    <BiCheck className="icon" />
                  ) : (
                    <IoCloseOutline className="icon" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div>
              <h3 className="title t-2">Tags</h3>
              <p className="title t-3">Who can tags you ?</p>
            </div>
            <select className="input-select">
              <option>Anybody</option>
              <option>Network Only</option>
            </select>
          </div>
        </div>
        <div className="security">
          <h2 className="title t-1">Security</h2>
          <p className="title t-2">Last change 29 December, 20203 at 6:20 PM</p>
          <div className="item">
            <button
              className="button"
              onClick={() =>
                swal({
                  icon: "warning",
                  title: "Confirmation",
                  text: "Do you really want reset your password ?",
                })
              }
            >
              Reset password
            </button>
            <p className="title t-3">
              Once clicked on the reset button, a new password will be sent by
              e-mail address.
            </p>
          </div>
          <p className="title t-2">Change password</p>
          <form>
            <div className="input-div">
              <input
                type={showPwd ? "text" : "password"}
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("password")}
              />
              <label htmlFor="password" className="label-form">
                Old password
              </label>
              <label htmlFor="password" className="label-icon">
                {showPwd ? (
                  <BsEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                )}
              </label>
              {/* {errors.password && (
                <span className="fade-in">{errors.password.message}</span>
              )} */}
            </div>
            <div className="input-div">
              <input
                type={showPwd ? "text" : "password"}
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("password")}
              />
              <label htmlFor="password" className="label-form">
                New password
              </label>
              <label htmlFor="password" className="label-icon">
                {showPwd ? (
                  <BsEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                )}
              </label>
              {/* {errors.password && (
                <span className="fade-in">{errors.password.message}</span>
              )} */}
            </div>
            <div className="input-div">
              <input
                type={showPwd ? "text" : "password"}
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("password")}
              />
              <label htmlFor="password" className="label-form">
                Confirm new password
              </label>
              <label htmlFor="password" className="label-icon">
                {showPwd ? (
                  <BsEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                )}
              </label>
              {/* {errors.password && (
                <span className="fade-in">{errors.password.message}</span>
              )} */}
            </div>
            <button type="submit" className="button">
              Change
            </button>
          </form>
          <hr />
          <p className="title t-2">Account</p>
          <div className="item">
            <button className="button" style={{ backgroundColor: "red" }}>
              Delete account
            </button>
            <p className="title t-3">
              Once clicked on the delete account button, your account will not
              longer exists. You will need another inscription for using the
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
