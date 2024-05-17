import React from "react";
import useAuth from "../../../hooks/context/state/useAuth";
import { isEmpty } from "../../../utils/utils";

const PreviewContent = () => {
  const { keys } = useAuth();
  return (
    <div className="preview-component">
      <p className="title t-1">Country : {keys?.keyDetails?.country}</p>
      <p className="title t-2">
        Program : {keys?.keyDetails?.program} Program /{" "}
        {keys?.keyDetails?.language.toUpperCase()}
      </p>
      <p className="title t-2">
        Level of Study : {keys?.keyDetails?.level.toUpperCase()}
      </p>
      <p className="title t-2">
        Course : {keys?.keyDetails?.course.toUpperCase()}
      </p>
      <p className="title t-2">
        Lesson : {keys?.keyDetails?.lesson.toUpperCase()}
      </p>
      {keys?.keyDetails?.exercise && <p className="title t-2">
        Exercise : {keys?.keyDetails?.exercise.toUpperCase()}
      </p>}
      {keys?.keyDetails?.solution && <p className="title t-2">
        Solution : {keys?.keyDetails?.solution.toUpperCase()}
      </p>}
      <div className="pc-container">
        {keys?.keyDetails?.content.map((item, i) => {
          const _thumbs = item?.thumbnails
            ?.substring(1, item?.thumbnails.length - 1)
            .split(",");
          return (
            <div className="pc-item">
              <p className="title t-2">{item?.description}</p>
              <div className="pc-images">{!isEmpty(_thumbs) && _thumbs.map((element, k)=>{
                return <img src={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${element}`} alt={`thumb-${k}`}/>
              })}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewContent;
