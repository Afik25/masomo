import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationLevel } from "../../../utils/utils";
import { getPrograms } from "../../../services/programs";
import { getLevels } from "../../../services/levels";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { BiSearch, RiTimerLine } from "../../../middlewares/icons";
import Programs from "../Programs";

const FragmentLesson = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationLevel),
  });
  return (
    <div className="fragment-lesson fade-in">
      <div className="fl-filter">
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
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
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
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
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
          <div className="input-div">
            <select
              className="input-form"
              {...register("program")}
              // onChange={(e) => {
              //   let _data = levelsData?.data?.levels.filter(
              //     (item) => item.program_id == e.target.value
              //   );
              //   setSelectedLevels(_data);
              // }}
            >
              <option value="" style={{ color: "grey" }} selected>
                Course
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
      <div className="fl-container">
        <div className="fl-country">
          <h2 className="title t-1">Country's name</h2>
          <div className="fl-programs">
            <div className="fl-program-item">
              <h2 className="title t-2">Program's name</h2>
              <div className="fl-levels">
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fl-program-item">
              <h2 className="title t-2">Program's name</h2>
              <div className="fl-levels">
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fl-program-item">
              <h2 className="title t-2">Program's name</h2>
              <div className="fl-levels">
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fl-level-item">
                  <h2 className="title t-3">level's title</h2>
                  <div className="fl-courses">
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fl-course-item">
                      <h2 className="title t-2">course's title</h2>
                      <div className="fl-lessons">
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                        <div className="fl-lesson-item">
                          <h3 className="title t-3">lesson's title</h3>
                          <p className="title t-4">
                            Reading <RiTimerLine className="icon" /> 25 min.
                          </p>
                          <div className="fl-actions">
                            <button className="button">Add exercise</button>
                            <button className="button">Edit exercise</button>
                            <button className="button">Preview</button>
                            <button className="button activated">
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="fl-item">
          <h2 className="title t-1">Lesson's title</h2>
          <h3 className="title t-2">course's title</h3>
          <h3 className="title t-3">english standard program / Congo DR</h3>
          <div className="display-flex justify-content-space-between align-items-center">
            <h3 className="title t-4">level of study</h3>
            <p className="title t-4">
              Reading <RiTimerLine className="icon" /> 25 min.
            </p>
          </div>
          <div className="fl-actions">
            <button className="button">Add exercise</button>
            <button className="button">Edit exercise</button>
            <button className="button">Preview</button>
            <button className="button activated">Activate</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FragmentLesson;
