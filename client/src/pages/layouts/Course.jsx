import React from "react";
import { Outlet } from "react-router-dom";

const Course = () => {
  return (
    <div className="courses">
      <Outlet />
    </div>
  );
};

export default Course;
