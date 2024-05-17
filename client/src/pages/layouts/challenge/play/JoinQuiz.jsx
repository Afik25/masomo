import React, { useState } from "react";
import { IoArrowForward, FaPlus } from "../../../../middlewares/icons";

const JoinQuiz = () => {
  const [step, setStep] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClassicMode, setIsClassicMode] = useState(true);
  const [emojis, setEmojis] = useState("");
  return (
    <div className="join-quiz">
      <div className="join-head">
        <h2 className="title t-2">MASOMO</h2>
        <h3 className="title t-2">Join a MASSE</h3>
      </div>
      <div className="join-body">
        <form>
          {step === 0 && (
            <div className="step">
              <h3 className="title t-2">Enter MASSE's CODE</h3>
              <div className="content">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    // {...register("username")}
                  />
                  <label htmlFor="username" className="label-form">
                    Challenge's CODE
                  </label>
                  {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                </div>
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  <button className="button">
                    <IoArrowForward className="icon" />
                  </button>
                )}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="step">
              <h3 className="title t-3">
                Challenge in {isClassicMode ? "Classic Mode" : "Team Mode"}
              </h3>
              <div className="emojis">
                <p className="title t-3">Choose your emojis</p>
                <div className="details">
                    <div className="emojis-item">Emojis Item</div>
                </div>
              </div>
              <h3 className="title t-2">
                Enter your {isClassicMode ? "Nickname" : "Team Nickname"}
              </h3>
              <div className="content">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    // {...register("username")}
                  />
                  <label htmlFor="username" className="label-form">
                    Nickname
                  </label>
                  {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
                </div>
                {isSubmitting ? (
                  <div className="loader">Loader</div>
                ) : (
                  <button className="button">
                    <IoArrowForward className="icon" />
                  </button>
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="step">
              <h3 className="title t-2">Enter the players Nickname</h3>
              <h3 className="title t-3">The nickname of every team member</h3>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  Nickname for Player 1
                </label>
                {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  Nickname for Player 2
                </label>
                {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
              </div>
              {isSubmitting ? (
                <div className="loader">Loader</div>
              ) : (
                <div className="buttons">
                  <button className="button">
                    <FaPlus className="icon" />
                    <span>Add Player</span>
                  </button>
                  <button className="button">Ready to Join!</button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinQuiz;
