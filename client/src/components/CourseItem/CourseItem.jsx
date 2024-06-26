import React from "react";
import { Link } from "react-router-dom";
import BOARD from "../../assets/svg/board.jpg";

const CourseItem = ({ reading, to, courseTitle, totalLessons, totalExercises }) => {
  return (
    <Link onClick={reading} to={to} className="course-item">
      <img src={BOARD} alt="board" className="back" />
      <div className="inner">
        <h3 className="title t-2">{courseTitle}</h3>
      </div>
      <div className="outer fade-in">
        <p className="title t-3">
          {totalLessons} {totalLessons > 0 ? " lessons":" lesson"} & {totalExercises} {totalExercises > 0 ? " exercises":" exercise"}
        </p>
      </div>
    </Link>
  );
};

export default CourseItem;
