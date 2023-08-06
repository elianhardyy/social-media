import React from "react";
import "./Outlet.scss";
import imagewong from "../../img/images.jpg";
const Stories = () => {
  return (
    <div className="stories">
      <div className="story">
        <img src={imagewong} alt="nice" />
        <span>John Doe</span>
        <button>+</button>
      </div>
      <div className="story">
        <img src={imagewong} alt="" />
        <span>John Doe</span>
      </div>
      <div className="story">
        <img src={imagewong} alt="" />
        <span>John Doe</span>
      </div>
      <div className="story">
        <img src={imagewong} alt="" />
        <span>John Doe</span>
      </div>
      <div className="story">
        <img src={imagewong} alt="" />
        <span>John Doe</span>
      </div>
    </div>
  );
};

export default Stories;
