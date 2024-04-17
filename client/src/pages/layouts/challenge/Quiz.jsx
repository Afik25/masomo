import React, { useState } from "react";
import {
  FaCamera,
  FaTrashAlt,
  BiCheck,
  IoCloseOutline,
} from "../../../middlewares/icons";

const Quiz = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [visibility, setVisibility] = useState("");
  const [switched, setSwitched] = useState(false);

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const isVisibility = (value) => value === visibility;
  const onChangeVisibility = ({ target: { value } }) => {
    setVisibility(value);
  };
  const toggle = () => setSwitched(!switched);
  return (
    <div className="quiz">
      <div className="container">
        <form>
          <div className="input-cover">
            <div className="file">
              <input
                type="file"
                id="thumbnails"
                className="input-file"
                autoComplete="none"
                placeholder=" "
                onChange={handleFile}
                //   {...register("thumbnails")}
                accept="image/*"
              />
              <label htmlFor="thumbnails" className="input-file-label">
                <FaCamera className="icon" />
                <p>Insert the cover image</p>
              </label>
            </div>
            <img
              src={
                !selectedFile
                  ? process.env.PUBLIC_URL + "/quiz-cover.jpg"
                  : URL.createObjectURL(selectedFile)
              }
              alt="quiz-cover"
              className="logo"
            />
            {selectedFile && (
              <button
                type="button"
                className="button"
                onClick={() => setSelectedFile()}
              >
                <FaTrashAlt className="icon" />
                <span>Remove image</span>
              </button>
            )}
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("title")}
            />
            <label htmlFor="title" className="label-form">
              Quiz title
            </label>
            {/* {errors.title && (
                <span className="fade-in">{errors.title.message}</span>
              )} */}
          </div>
          <div className="input-radio">
            <div className="tile">
              <h3 className="t-2">Visibility :</h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"private"}
                  checked={isVisibility("private")}
                  onChange={onChangeVisibility}
                />
                <label>Private</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"public"}
                  checked={isVisibility("public")}
                  onChange={onChangeVisibility}
                />
                <label>Public</label>
              </div>
            </div>
            <div className="tile">
              <h3 className="t-2">Mode :</h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"private"}
                  checked={isVisibility("private")}
                  onChange={onChangeVisibility}
                />
                <label>Classic</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"public"}
                  checked={isVisibility("public")}
                  onChange={onChangeVisibility}
                />
                <label>Teams</label>
              </div>
            </div>
            <div className="tile">
              <h3 className="t-2">Timing :</h3>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"private"}
                  checked={isVisibility("private")}
                  onChange={onChangeVisibility}
                />
                <label>Live</label>
              </div>
              <div className="radio-tile">
                <input
                  type="radio"
                  value={"public"}
                  checked={isVisibility("public")}
                  onChange={onChangeVisibility}
                />
                <label>Delayed</label>
              </div>
            </div>
          </div>
          <div className="input-div">
            <textarea
              type="text"
              className="input-textarea"
              autoComplete="none"
              placeholder=" "
              // {...register("description")}
              rows={5}
            />
            <label htmlFor="description" className="label-form">
              Quiz Description (Optional)
            </label>
            {/* {errors.description && (
                <span className="fade-in">{errors.description.message}</span>
              )} */}
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="datetime-local"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("start")}
              />
              <label htmlFor="start" className="label-form">
                Quiz Start date & time
              </label>
              {/* {errors.start && (
                <span className="fade-in">{errors.start.message}</span>
              )} */}
            </div>
            <div className="input-div">
              <input
                type="datetime-local"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("end")}
              />
              <label htmlFor="end" className="label-form">
                Quiz End date & time
              </label>
              {/* {errors.end && (
                <span className="fade-in">{errors.end.message}</span>
              )} */}
            </div>
          </div>
          <div className="input-options">
            <div className="tile">
              <p className="title t-3">Randomize order of questions</p>
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
            <div className="tile">
              <p className="title t-3">Randomize order of answers</p>
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
            <div className="tile">
              <p className="title t-3">Automatically move through questions</p>
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
            <div className="tile">
              <p className="title t-3">Enabled player anonymat</p>
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
          </div>
          <button type="submit" className="button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
