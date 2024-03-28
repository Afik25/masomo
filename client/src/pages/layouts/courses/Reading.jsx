import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "../../../routes/NavLink";
import {
  FaArrowLeft,
  FaArrowRight,
  MdFavoriteBorder,
  BsPatchQuestion,
  FaSlackHash,
  GoCommentDiscussion,
  MdList,
} from "../../../middlewares/icons";
import PREMUIM from "../../../assets/svg/premium.png";
import { isEmpty, capitalize } from "../../../utils/utils";

const Reading = () => {
  const [isLesson, setIsLesson] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let { param1, param2 } = useParams();
  const [content, setContent] = useState({
    index: 0,
    type: null,
    details: null,
  });

  console.log({ "JSON.parse(param2) ": JSON.parse(param2) });

  return (
    <div className="course-reading">
      <div className="left" style={{ zIndex: `${isDrawerOpen ? 1 : 0}` }}>
        <div className="courses-nav">
          <Link to="" className="link">
            <FaArrowLeft className="icon" />
          </Link>
          <h3 className="title t-2">Course of {capitalize(param1)}</h3>
          <Link to="" className="link">
            <FaArrowRight className="icon" />
          </Link>
        </div>
        <div className="reading-nav">
          <div className="r-nav">
            <button
              className={isLesson ? "button btn-active" : "button"}
              onClick={() => setIsLesson(true)}
            >
              Lessons
            </button>
            <button
              className={!isLesson ? "button btn-active" : "button"}
              onClick={() => setIsLesson(false)}
            >
              Exercices
            </button>
          </div>
          <button
            className="button btn-close"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            &times;
          </button>
        </div>
        <div className="reading-content">
          {isLesson && (
            <>
              {isEmpty(JSON.parse(param2)) ? (
                <p
                  className="title t-2"
                  style={{ padding: "1em", textAlign: "center", color: "red" }}
                >
                  No lesson for {param1} course available yet!
                </p>
              ) : (
                JSON.parse(param2).map((itemLesson, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        content.index == i ? "button active-reading" : "button"
                      }
                      onClick={() =>
                        setContent({
                          index: i,
                          type: itemLesson?.lesson?.type,
                          details: itemLesson?.lesson_sections,
                        })
                      }
                    >
                      {itemLesson?.lesson?.title}
                    </button>
                  );
                })
              )}
            </>
          )}
          {!isLesson && (
            <>
              {isEmpty(JSON.parse(param2)) ? (
                <p
                  className="title t-2"
                  style={{ padding: "1em", textAlign: "center", color: "red" }}
                >
                  No exercise for {param1} course available yet!
                </p>
              ) : (
                JSON.parse(param2).map((itemLesson, _) => {
                  return (
                    <>
                      {!isEmpty(itemLesson?.lesson_exercises) &&
                        itemLesson?.lesson_exercises.map((exerciseItem, j) => {
                          return (
                            <NavLink
                              activeClassName="active-reading"
                              inactiveClassName="inactive-reading"
                              className="link"
                              to=""
                              key={j}
                            >
                              {exerciseItem?.exercise?.title}
                            </NavLink>
                          );
                        })}
                    </>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
      <div className="right" style={{ zIndex: `${isDrawerOpen ? 0 : 1}` }}>
        <div className="inner">
          <div className="reading-actions">
            <button
              className="button btn-open"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <MdList />
            </button>
            <div className="r-actions">
              <button className="button">
                <MdFavoriteBorder className="icon" />
                <span className="fade-in">Add to favorite</span>
              </button>
              <button className="button">
                <BsPatchQuestion className="icon" />
                <span className="fade-in">Questions</span>
              </button>
              <button className="button">
                <FaSlackHash className="icon" />
                <span className="fade-in">Comment</span>
              </button>
              <button className="button">
                <GoCommentDiscussion className="icon" />
                <span className="fade-in">Recommend</span>
              </button>
            </div>
          </div>
          <div className="reading-content">
            {/* {content.details.map((itemReading, k) => {
              const _thumbs = itemReading?.thumbnails
                ?.substring(1, itemReading?.thumbnails.length - 1)
                .split(",");
              return (
                <>
                  <div className="reading-content-text" key={k}>
                    {itemReading?.description}
                  </div>
                  <div className="reading-content-images">
                    {!isEmpty(_thumbs) &&
                      _thumbs.map((element, l) => {
                        return (
                          <img
                            src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${element}`}
                            alt={element}
                            key={l}
                          />
                        );
                      })
                    }
                  </div>
                </>
              );
            })} */}
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like). Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC.
          </div>
        </div>
        <div className="outer">
          <img src={PREMUIM} alt="premuim" />
          <h2 className="title t-2">This is the premium content.</h2>
          <p className="title t-3">
            The content required the subscription to date!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reading;
