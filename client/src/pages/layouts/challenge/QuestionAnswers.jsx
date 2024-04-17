import React, { useState } from "react";
import { FaCamera, FaTrashAlt, SlPicture } from "../../../middlewares/icons";
import { colors } from "../../../utils/utils";

const QuestionAnswers = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [timing, setTiming] = useState(5);
  const [grading, setGrading] = useState(10);
  const [questionType, setQuestionType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [visibility, setVisibility] = useState("");

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const isVisibility = (value) => value === visibility;
  const onChangeVisibility = ({ target: { value } }) => {
    setVisibility(value);
  };
  return (
    <div className="question-answers">
      <div className="left">
        <div className="question-item">
          <h3 className="title t-2">1. Question type</h3>
          <p className="title t-3">Question description</p>
          <div className="timing-grad">
            <span>5 Seconds.</span>
            <span>100 Point.</span>
          </div>
          <div className="question-cover">
            <div className="background">
              <SlPicture className="icon" />
            </div>
            {selectedFile && (
              <div className="img">
                <img src={URL.createObjectURL(selectedFile)} alt="pic" />
              </div>
            )}
          </div>
          <div className="actions">
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Edit</span>
            </button>
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="question-item">
          <h3 className="title t-2">1. Question type</h3>
          <p className="title t-3">Question description</p>
          <div className="timing-grad">
            <span>5 Seconds.</span>
            <span>100 Point.</span>
          </div>
          <div className="question-cover">
            <div className="background">
              <SlPicture className="icon" />
            </div>
            {selectedFile && (
              <div className="img">
                <img src={URL.createObjectURL(selectedFile)} alt="pic" />
              </div>
            )}
          </div>
          <div className="actions">
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Edit</span>
            </button>
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="question-item">
          <h3 className="title t-2">1. Question type</h3>
          <p className="title t-3">Question description</p>
          <div className="timing-grad">
            <span>5 Seconds.</span>
            <span>100 Point.</span>
          </div>
          <div className="question-cover">
            <div className="background">
              <SlPicture className="icon" />
            </div>
            {selectedFile && (
              <div className="img">
                <img src={URL.createObjectURL(selectedFile)} alt="pic" />
              </div>
            )}
          </div>
          <div className="actions">
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Edit</span>
            </button>
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="question-item">
          <h3 className="title t-2">1. Question type</h3>
          <p className="title t-3">Question description</p>
          <div className="timing-grad">
            <span>5 Seconds.</span>
            <span>100 Point.</span>
          </div>
          <div className="question-cover">
            <div className="background">
              <SlPicture className="icon" />
            </div>
            {selectedFile && (
              <div className="img">
                <img src={URL.createObjectURL(selectedFile)} alt="pic" />
              </div>
            )}
          </div>
          <div className="actions">
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Edit</span>
            </button>
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="question-item">
          <h3 className="title t-2">1. Question type</h3>
          <p className="title t-3">Question description</p>
          <div className="timing-grad">
            <span>5 Seconds.</span>
            <span>100 Point.</span>
          </div>
          <div className="question-cover">
            <div className="background">
              <SlPicture className="icon" />
            </div>
            {selectedFile && (
              <div className="img">
                <img src={URL.createObjectURL(selectedFile)} alt="pic" />
              </div>
            )}
          </div>
          <div className="actions">
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Edit</span>
            </button>
            <button type="button" onClick={() => setSelectedFile()}>
              <FaTrashAlt className="icon" /> <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
      <form className="right">
        <div className="right-questions">
          <div className="form">
            <div className="form-head">
              <button type="button" className="button">
                Add question
              </button>
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
                Question text
              </label>
              {/* {errors.description && (
                <span className="fade-in">{errors.description.message}</span>
              )} */}
            </div>
            <div className="input-div section">
              <div className="question-cover">
                <div className="background">
                  <SlPicture className="icon" />
                </div>
                {selectedFile && (
                  <div className="img">
                    <img src={URL.createObjectURL(selectedFile)} alt="pic" />
                  </div>
                )}
                <div className="image-options">
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
                      <span>Insert image</span>
                    </label>
                  </div>
                  <button type="button" onClick={() => setSelectedFile()}>
                    <FaTrashAlt className="icon" /> <span>Remove</span>
                  </button>
                </div>
              </div>
              <div className="section-details">
                <div className="input-div">
                  <select
                    className="input-select"
                    onChange={(e) => setQuestionType(e.target.value)}
                  >
                    <option value={""} selected>
                      Type
                    </option>
                    <option value={"quiz"}>Quiz</option>
                    <option value={"tf"}>True or False</option>
                  </select>
                </div>
                <div className="input-div">
                  <label className="">
                    Timing -{" "}
                    <span className="span-view">{timing} Seconds.</span>
                  </label>
                  <input
                    className="input-form"
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                  />
                </div>
                <div className="input-div">
                  <label className="">
                    Grading -{" "}
                    <span className="span-view">{grading} Point. </span>
                  </label>
                  <input
                    className="input-form"
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={grading}
                    onChange={(e) => setGrading(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="right-answers">
          {questionType === "tf" && (
            <div className="tile">
              <div
                className="radio-tile"
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                }}
              >
                <input
                  type="radio"
                  value={"true"}
                  checked={isVisibility("true")}
                  onChange={onChangeVisibility}
                />
                <label>True</label>
              </div>
              <div
                className="radio-tile"
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                }}
              >
                <input
                  type="radio"
                  value={"false"}
                  checked={isVisibility("false")}
                  onChange={onChangeVisibility}
                />
                <label>False</label>
              </div>
            </div>
          )}
          {questionType === "quiz" && (
            <>
              <div className="answer-div">
                <div
                  className="answer-item"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <div className="question-cover">
                    <div className="background">
                      <SlPicture className="icon" />
                    </div>
                    {selectedFile && (
                      <div className="img">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="pic"
                        />
                      </div>
                    )}
                    <div className="image-options">
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
                        <label
                          htmlFor="thumbnails"
                          className="input-file-label"
                        >
                          <FaCamera className="icon" />
                          <span>Insert image</span>
                        </label>
                      </div>
                      <button type="button" onClick={() => setSelectedFile()}>
                        <FaTrashAlt className="icon" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-answer">
                    <div className="input-div">
                      <textarea
                        type="text"
                        className="input-textarea"
                        autoComplete="none"
                        placeholder=" "
                        // {...register("username")}
                        rows={4}
                      />
                      <label htmlFor="username" className="label-form">
                        Answer text
                      </label>
                      {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                    </div>
                    <div className="tile">
                      <h3 className="t-2">Is the good answer ?</h3>
                      <div className="radio-tile">
                        <input
                          type="radio"
                          value={"true"}
                          checked={isVisibility("true")}
                          onChange={onChangeVisibility}
                        />
                        <label>True</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="answer-item"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <div className="question-cover">
                    <div className="background">
                      <SlPicture className="icon" />
                    </div>
                    {selectedFile && (
                      <div className="img">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="pic"
                        />
                      </div>
                    )}
                    <div className="image-options">
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
                        <label
                          htmlFor="thumbnails"
                          className="input-file-label"
                        >
                          <FaCamera className="icon" />
                          <span>Insert image</span>
                        </label>
                      </div>
                      <button type="button" onClick={() => setSelectedFile()}>
                        <FaTrashAlt className="icon" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-answer">
                    <div className="input-div">
                      <textarea
                        type="text"
                        className="input-textarea"
                        autoComplete="none"
                        placeholder=" "
                        // {...register("username")}
                        rows={4}
                      />
                      <label htmlFor="username" className="label-form">
                        Answer text
                      </label>
                      {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                    </div>
                    <div className="tile">
                      <h3 className="t-2">Is the good answer ?</h3>
                      <div className="radio-tile">
                        <input
                          type="radio"
                          value={"true"}
                          checked={isVisibility("true")}
                          onChange={onChangeVisibility}
                        />
                        <label>True</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="answer-item"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <div className="question-cover">
                    <div className="background">
                      <SlPicture className="icon" />
                    </div>
                    {selectedFile && (
                      <div className="img">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="pic"
                        />
                      </div>
                    )}
                    <div className="image-options">
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
                        <label
                          htmlFor="thumbnails"
                          className="input-file-label"
                        >
                          <FaCamera className="icon" />
                          <span>Insert image</span>
                        </label>
                      </div>
                      <button type="button" onClick={() => setSelectedFile()}>
                        <FaTrashAlt className="icon" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-answer">
                    <div className="input-div">
                      <textarea
                        type="text"
                        className="input-textarea"
                        autoComplete="none"
                        placeholder=" "
                        // {...register("username")}
                        rows={4}
                      />
                      <label htmlFor="username" className="label-form">
                        Answer text
                      </label>
                      {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                    </div>
                    <div className="tile">
                      <h3 className="t-2">Is the good answer ?</h3>
                      <div className="radio-tile">
                        <input
                          type="radio"
                          value={"true"}
                          checked={isVisibility("true")}
                          onChange={onChangeVisibility}
                        />
                        <label>True</label>
                      </div>
                      <button>Remove option</button>
                    </div>
                  </div>
                </div>
                <div
                  className="answer-item"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <div className="question-cover">
                    <div className="background">
                      <SlPicture className="icon" />
                    </div>
                    {selectedFile && (
                      <div className="img">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="pic"
                        />
                      </div>
                    )}
                    <div className="image-options">
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
                        <label
                          htmlFor="thumbnails"
                          className="input-file-label"
                        >
                          <FaCamera className="icon" />
                          <span>Insert image</span>
                        </label>
                      </div>
                      <button type="button" onClick={() => setSelectedFile()}>
                        <FaTrashAlt className="icon" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-answer">
                    <div className="input-div">
                      <textarea
                        type="text"
                        className="input-textarea"
                        autoComplete="none"
                        placeholder=" "
                        // {...register("username")}
                        rows={4}
                      />
                      <label htmlFor="username" className="label-form">
                        Answer text
                      </label>
                      {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                    </div>
                    <div className="tile">
                      <h3 className="t-2">Is the good answer ?</h3>
                      <div className="radio-tile">
                        <input
                          type="radio"
                          value={"true"}
                          checked={isVisibility("true")}
                          onChange={onChangeVisibility}
                        />
                        <label>True</label>
                      </div>
                      <button>Remove option</button>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="button">
                Add response
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionAnswers;
