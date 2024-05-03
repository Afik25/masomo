import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Pupils from "../assets/images/kids-classroom.png";
import Program from "../assets/images/program.png";
import Course from "../assets/images/course.png";
import Lesson from "../assets/images/lesson.png";
import Exercice from "../assets/images/exercice.png";
import DEVICES from "../assets/images/devices.png";
import ECOLIER from "../assets/images/ecolier.png";
import BANNER from "../assets/images/banner.jpg";
import { BiSearch } from "../middlewares/icons";

const Home = () => {
  const { t } = useTranslation();
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet>
        <title>MASOMO - L'école à votre portée.</title>
        <meta
          name="description"
          content="Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation"
        />
      </Helmet>
      <div className="home">
        <Header />
        <div className="banner">
          <div className="container margin-auto">
            <div className="left">
              <p className="title t-3">
                &#9997; &#129504; &#x2705; {t("home.text-1")}
              </p>
              <h2 className="title t-1">{t("home.text-2")}</h2>
              <p className="title t-2">{t("home.text-3")}</p>
              <div className="button">
                <Link to="/register" className="btn-join link">
                  {t("home.text-4")}
                </Link>
              </div>
            </div>
            <div className="right">
              <img src={Pupils} alt="pupils" />
            </div>
          </div>
        </div>
        <div className="section search">
          <div className="container margin-auto">
            <h2 className="title t-2">
              Research the content you want, anyway your study level!
            </h2>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                onChange={(e) => setSearchContent(e.target.value)}
              />
              <label htmlFor="password" className="label-form">
                Find course, lessons, exercices, solutions, and more...
              </label>
              <label htmlFor="password" className="label-icon">
                <BiSearch
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/search/${searchContent}`, {
                      state: { searchContent: searchContent },
                    })
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <div className="section illustration">
          <img src={BANNER} alt="illustr" />
        </div>
        <div className="section countable">
          <h2 className="title t-2">
            Contents available and explained for primary, secondary, high school
            and university!
          </h2>
          <div className="container margin-auto">
            <div className="item">
              <img src={Program} alt="program" className="icon" />
              <h2 className="title t-2">5+</h2>
              <p className="title t-3">Programs</p>
            </div>
            <div className="item">
              <img src={Course} alt="course" className="icon" />
              <h2 className="title t-2">25+</h2>
              <p className="title t-3">Courses</p>
            </div>
            <div className="item">
              <img src={Lesson} alt="lesson" className="icon" />
              <h2 className="title t-2">500+</h2>
              <p className="title t-3">Lessons</p>
            </div>
            <div className="item">
              <img src={Exercice} alt="exercise" className="icon" />
              <h2 className="title t-2">1500+</h2>
              <p className="title t-3">Exercices</p>
            </div>
          </div>
        </div>
        <div className="section accessibility">
          <div className="container margin-auto">
            <img src={DEVICES} alt="device" className="devices" />
            <div className="details">
              <h2 className="title t-2">
                Platform responsive and easily accessible, get access to the
                Learning content with any devices, anywhere, anytime.
              </h2>
              <p className="title t-3">Click below to Download!</p>
              <div className="downloads">
                <Link to="/#" className="item">
                  <img
                    src={process.env.PUBLIC_URL + "/app-ios.jpeg"}
                    alt="ios-app"
                  />
                </Link>
                <Link to="/#" className="item">
                  <img
                    src={process.env.PUBLIC_URL + "/app-android.jpeg"}
                    alt="android-app"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="section orientation">
          <div className="container margin-auto">
            <div className="inner">
              <div className="box">
                <h1 className="title t-2">Program's Orientation</h1>
                <p className="title t-3">
                  With MASOMO, take advantage of a 3-month orientation grant in
                  software engineering or artificial intelligence.
                </p>
                <div className="button">
                  <Link to="/register" className="btn-join link">
                    Get started and launch your journey.
                  </Link>
                </div>
              </div>
            </div>
            <img src={ECOLIER} alt="ecolier" className="outer" />
          </div>
        </div>
        <div className="partnership">
          <h1 className="title t-2">
            Based on a convincing vision, they decided to work with us.
          </h1>
          <div className="container">
            <img src={process.env.PUBLIC_URL + "/afik_foundation-logo.png"} alt="af-logo" />
            <img src={process.env.PUBLIC_URL + "/shop-logo.png"} alt="shop-logo"/>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
