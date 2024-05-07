import React, { useState } from "react";
import { MdMenuBook, MdQuiz, FaBookReader } from "../../../middlewares/icons";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      // xaxis: {
      //   type: "datetime",
      // },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],

    // series: [
    //   {
    //     name: "Day",
    //     data: [
    //       {
    //         x: new Date("2018-02-12").getTime(),
    //         y: 76,
    //       },
    //       {
    //         x: new Date("2018-02-12").getTime(),
    //         y: 76,
    //       },
    //     ],
    //   },
    // ],
  });
  return (
    <div className="student-dashboard">
      <div className="container">
        <div className="sd-left">
          <div className="item">
            <p>
              You are enroled in<span>First level</span>to
              <span>
                National French Program of Democratic Republic of Congo.
              </span>
            </p>
          </div>
          <div className="item">
            <p>
              You have an <span>active</span> subscription that expire on
              <span>Monday 6 May 2024 at 11:42 AM.</span>
            </p>
          </div>
          <div className="item">
            <h3 className="title t-2">Historic of logins</h3>
            <p className="title t-3">
              Last login, <span>Monday 6 May 2024 at 11:42 AM</span>
            </p>
            <div className="chart">
              <Chart
                options={data.options}
                series={data.series}
                type="line"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
        <div className="sd-right">
          <div className="item">
            <MdQuiz className="icon" />
            <span>25 Challenges completed</span>
          </div>
          <div className="item">
            <MdMenuBook className="icon" />
            <span>25 courses</span>
          </div>
          <div className="item timeline">
            <div className="timeline-container tc-left">
              <div className="icon-container">
                <FaBookReader className="icon" />
              </div>
              <div className="text-box">
                <h2 className="title t-2">Course title 1</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                  accusamus debitis.
                </p>
                <span className="left-arrow"></span>
              </div>
            </div>
            <div className="timeline-container tc-right">
              <div className="icon-container">
                <FaBookReader className="icon" />
              </div>
              <div className="text-box">
                <h2 className="title t-2">Course title 1</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                  accusamus debitis. Et sint laudantium nobis voluptatum nostrum
                  magnam voluptas sequi repudiandae.
                </p>
                <span className="right-arrow"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
