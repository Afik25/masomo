import React from "react";
import { FiUpload } from "../../../middlewares/icons";

const AddContent = () => {
  return (
    <div className="add-content">
      <h2 className="title t-1">Add new lesson/exercise/solution</h2>
      <div className="container">
        <form className="left">
          <div className="components">
            <input type="text" value="id(lesson/Exercise/Solution)" />
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                //   {...register("course_title")}
              />
              <label htmlFor="course_title" className="label-form">
                Leson's/Exercise's/Solution's title
              </label>
              {/* {errors.course_title && (
              <span className="fade-in">{errors.course_title.message}</span>
            )} */}
            </div>
            <div className="input-div">
              <select
                className="input-form"
                // {...register("level")}
              >
                <option value="" style={{ color: "grey" }}>
                  Type of accessibility
                </option>
              </select>
              {/* {errors.level && (
              <span className="fade-in">{errors.level.message}</span>
            )} */}
            </div>
            <div className="input-div">
              <select
                className="input-form"
                // {...register("level")}
              >
                <option value="" style={{ color: "grey" }}>
                  Version (Language)
                </option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
              {/* {errors.level && (
              <span className="fade-in">{errors.level.message}</span>
            )} */}
            </div>
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                //   {...register("description")}
                rows={10}
              ></textarea>
              <label htmlFor="description" className="label-form">
                Description (Resume)
              </label>
              {/* {errors.description && (
              <span className="fade-in">{errors.description.message}</span>
            )} */}
            </div>
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                //   {...register("description")}
                rows={20}
              ></textarea>
              <label htmlFor="description" className="label-form">
                Content lesson/ exercise/ solution
              </label>
              {/* {errors.description && (
              <span className="fade-in">{errors.description.message}</span>
            )} */}
            </div>
          </div>
          <div className="input-files">
            <div className="file-wrapper">
              <div className="view"></div>
              <div className="files">
                <input type="file" id="file" accept="image/*" />
                <label htmlFor="file" className="label">
                  <div>
                    <FiUpload />
                    <p className="title t-3">Browse or Drug and Drop Files</p>
                  </div>
                </label>
              </div>
              <div className="files-container">
                <div className="file-item">
                  <h3 className="title t-3">file.png</h3>
                  <span>&times;</span>
                </div>
              </div>
              <button className="button">Process</button>
            </div>
          </div>
        </form>
        <div className="right">
          <button className="button">Validate</button>
          <div className="content">
            <div className="section"></div>
            <div className="images">
              <img src={process.env.PUBLIC_URL + "/logo.png"} />
              <img src={process.env.PUBLIC_URL + "/logo.png"} />
              <img src={process.env.PUBLIC_URL + "/logo.png"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
