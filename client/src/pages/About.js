import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BOX1 from "../assets/images/enfant-africain.png";
import BOX2 from "../assets/images/garcon-souriant.jpg";
import BOX3 from "../assets/images/petite-ecoliere.png";
import BOX4 from "../assets/images/heureux-amis.png";
import GLOABL_NETWORK from "../assets/images/global-network.jpg";

const About = () => {
  return (
    <div className="about">
      <Header />
      <div className="section description">
        <div className="container margin-auto">
          <h2 className="title t-2">About</h2>
          <div className="content">
            <div className="details">
              <p className="title t-3">
                SCHOOLAP is an educational platform that offers a wide variety
                of structured pedagogical content for pre-primary, primary,
                secondary, and technical levels. The platform covers the entire
                education system and also offers professional courses taught by
                trainers through virtual classrooms. With over 21,000
                pedagogical contents available, a network of over 6,000 schools,
                1.9 million students, 105,000 teachers, 6 provinces in the DRC,
                7 products and services, SCHOOLAP is a tool of choice for
                international partners and national governments looking to
                improve the quality of education and implement educational
                reforms. SCHOOLAP is an all-in-one platform for distance
                learning and teaching, as well as an online gradebook for
                students. With on-demand repetition courses, students can
                request live training with teachers to improve their
                understanding of the subjects studied. With SCHOOLAP, students
                have access to a comprehensive educational tool to improve their
                academic performance. In summary, SCHOOLAP is an innovative
                educational tool that offers a wide variety of pedagogical
                content for pre-primary, primary, secondary, and technical
                levels. The platform is accessible to all students, regardless
                of their level, and also offers professional courses taught by
                experienced trainers. With a presence in six provinces in the
                DRC, SCHOOLAP is a preferred partner for governments and
                international partners seeking to improve the quality of
                education. Finally, with on-demand repetition courses and
                virtual classrooms, SCHOOLAP is the perfect tool for students
                seeking to improve their academic performance.
              </p>
            </div>
            <div className="images">
              <img src={BOX1} className="box-1" />
              <img src={BOX2} className="box-2" />
              <img src={BOX3} className="box-3" />
              <img src={BOX4} className="box-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="section connect">
        <div className="container margin-auto">
          <img src={GLOABL_NETWORK} />
          <div className="details">
            <h3 className="title t-2">
              <span>MASOMO</span> connects pupils, students and learners from
              around the world...
            </h3>
            <div className="button">
              <Link to="/register" className="btn-join link">
                Get started and discover a wonderful network!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section connect">
        <div className="container margin-auto">
          <div className="details">
            <h3 className="title t-2">Get in touch with Us by e-mail...</h3>
          </div>
          <form>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
              />
              <label htmlFor="password" className="label-form">
                Your names
              </label>
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
              />
              <label htmlFor="password" className="label-form">
                Your e-mail
              </label>
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
              />
              <label htmlFor="password" className="label-form">
                Your subject
              </label>
            </div>
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                rows={10}
              ></textarea>
              <label htmlFor="password" className="label-form">
                Your message
              </label>
            </div>
            <button type="submit" className="button validate">Send</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
