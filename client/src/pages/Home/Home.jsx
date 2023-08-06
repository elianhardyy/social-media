import React from "react";
import Posts from "../../components/Posts/Posts";
import Share from "../../components/Share/Share";
import Stories from "../../components/Stories/Stories";

import "./Home.scss";

const Home = ({ user }) => {
  return (
    <div className="home">
      <Stories />
      <Share user={user} />
      <Posts user={user} />
    </div>
  );
};

export default Home;
