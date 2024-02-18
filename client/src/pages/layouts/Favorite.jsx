import React from "react";
import { Link } from "react-router-dom";
import FREEMIUM from "../../assets/svg/fremium.png";
import PREMIUM from "../../assets/svg/premium.png";

const Favorite = () => {
  return (
    <div className="favorite">
      <div className="container">
        <Link to="" className="link">
          <div>
            <img src={FREEMIUM} className="icon" />
            <h3 className="title t-1">Content's title</h3>
            <h3 className="title t-2">
              Content's type (lesson/exercise/solutiom)
            </h3>
            <p className="title t-3">
              Saved date (Tuesday 9 Janaury 2024 at 5:34 PM)
            </p>
          </div>
        </Link>
        <Link to="" className="link">
          <div>
            <img src={PREMIUM} className="icon" />
            <h3 className="title t-1">Content's title</h3>
            <h3 className="title t-2">
              Content's type (lesson/exercise/solutiom)
            </h3>
            <p className="title t-3">
              Saved date (Tuesday 9 Janaury 2024 at 5:34 PM)
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Favorite;
