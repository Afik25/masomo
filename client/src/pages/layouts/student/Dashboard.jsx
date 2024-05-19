import React, { useState, useEffect } from "react";
import { MdMenuBook, MdQuiz, FaBookReader } from "../../../middlewares/icons";
import ReactApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";
import { onGetStudentDashboard } from "../../../services/user";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import moment from "moment";
import { capitalize, isEmpty } from "../../../utils/utils";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    challenge_progress: {
      series: [10],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "50%",
            },
          },
        },
        labels: ["System Quiz Progression"],
      },
    },
    reading_progress: {
      series: [5],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "50%",
            },
          },
        },
        labels: ["Reading Progression"],
        fill: {
          colors: ["#F44336"],
        },
      },
    },
    login: {
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
    },
  });

  const user = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetStudentDashboard(user?.userInfo?.user_id, axiosPrivate, signal).then(
      (result) => {
        dispatch({
          type: "setUpUser/getStudentDashboard",
          payload: result,
        });
      }
    );

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const studentDashboard = useSelector(
    (state) => state.setUserSlice.initStudentDashboard?.studentDashboardsData
  );

  console.log({ studentDashboard: studentDashboard });

  return (
    <div className="student-dashboard">
      <div className="container">
        <div className="sd-left">
          <div className="item">
            <p>
              You are enrolled in the{" "}
              <span>
                {capitalize(studentDashboard?.data?.dashboardData?.level)} level
              </span>{" "}
              of
              <span>
                {capitalize(
                  studentDashboard?.data?.dashboardData?.program_title
                )}{" "}
                {capitalize(
                  studentDashboard?.data?.dashboardData?.program_language
                )}{" "}
                Program in{" "}
                {studentDashboard?.data?.dashboardData?.program_country}.
              </span>
              And you have a subscription that expires on
              <span>
                {moment(
                  studentDashboard?.data?.dashboardData?.subscription_end
                ).format("LLLL")}
              </span>
            </p>
          </div>
          <div className="item">
            <div className="item-progression">
              <ReactApexCharts
                options={data.challenge_progress.options}
                series={data.challenge_progress.series}
                type="radialBar"
                height="100%"
                width="100%"
              />
            </div>
            <div className="item-progression">
              <ReactApexCharts
                options={data.reading_progress.options}
                series={data.reading_progress.series}
                type="radialBar"
                height="100%"
                width="100%"
              />
            </div>
          </div>
          <div className="item">
            <h3 className="title t-2">Historic of logins</h3>
            <p className="title t-3">
              Last login,{" "}
              <span>
                {moment(
                  studentDashboard?.data?.dashboardData?.lastLogin?.dates
                ).format("LLLL")}
              </span>
            </p>
            <div className="chart">
              <Chart
                options={data.login.options}
                series={data.login.series}
                type="line"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
        <div className="sd-right">
          <div className="item">
            <MdMenuBook className="icon" />
            <span>
              {studentDashboard?.data?.dashboardData?.totalCourse}{" "}
              {studentDashboard?.data?.dashboardData?.totalCourse > 1
                ? "Courses"
                : "Course"}
            </span>
          </div>
          <div className="item">
            <MdMenuBook className="icon" />
            <span>
              {studentDashboard?.data?.dashboardData?.totalLesson}{" "}
              {studentDashboard?.data?.dashboardData?.totalLesson > 1
                ? "Lessons"
                : "Lesson"}
            </span>
          </div>
          <div className="item">
            <MdMenuBook className="icon" />
            <span>
              {studentDashboard?.data?.dashboardData?.totalExercise}{" "}
              {studentDashboard?.data?.dashboardData?.totalExercise > 1
                ? "Exercises"
                : "Exercise"}
            </span>
          </div>
          <div className="item">
            <MdQuiz className="icon" />
            <span>
              {studentDashboard?.data?.dashboardData?.totalChallenge}{" "}
              {studentDashboard?.data?.dashboardData?.totalChallenge > 1
                ? "Challenges"
                : "Challenge"}{" "}
              completed.
            </span>
          </div>
          <div className="item timeline">
            {isEmpty(studentDashboard?.data?.dashboardData?.courses) ? (
              <p>No course for study level set yet!</p>
            ) : (
              studentDashboard?.data?.dashboardData?.courses.map(
                (item, idx) => {
                  return (
                    <div
                      className={
                        idx % 2 === 0
                          ? "timeline-container tc-left"
                          : "timeline-container tc-right"
                      }
                      key={idx}
                    >
                      <div className="icon-container">
                        <FaBookReader className="icon" />
                      </div>
                      <div className="text-box">
                        <h2 className="title t-2">{capitalize(item?.title)}</h2>
                        <p>{capitalize(item?.description)}</p>
                        <span
                          className={
                            idx % 2 === 0 ? "left-arrow" : "right-arrow"
                          }
                        ></span>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
