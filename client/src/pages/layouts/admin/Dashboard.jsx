import React from "react";
import { MdMenuBook } from "../../../middlewares/icons";

const Dashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="container">
        <div className="item">
          <MdMenuBook className="icon" />
          <p className="title t-3">Total Courses</p>
          <p className="title t-2">25</p>
        </div>
        <div className="item">
          <MdMenuBook className="icon" />
          <p className="title t-3">Total Exercices</p>
          <p className="title t-2">25</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
