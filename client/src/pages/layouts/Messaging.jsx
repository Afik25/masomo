import React from "react";

const Messaging = () => {
  return (
    <div className="messaging">
      <div className="left">
        <div className="head">
          <button className="button">Create Channel</button>
          <p className="title t-3">(Re)Search Elements...</p>
          <form>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("username")}
              />
              <label htmlFor="username" className="label-form">
                Type the user pseudo, name or channel
              </label>
              {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
            </div>
            <button className="button">Search</button>
          </form>
          <p className="title t-3">Option Filter...</p>
          <div className="option-filter">
            <div className="of-item of-active">All</div>
            <div className="of-item">Chat</div>
            <div className="of-item">Channel</div>
            <div className="of-item">Online</div>
          </div>
        </div>
        <div className="body">
          <div className="item"></div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Messaging;
