import React from "react";
import LeftSidebar from "../../components/Home/LeftSidebar";
import MainNewsFeed from "../../components/Home/MainNewsFeed";
import BlogPost from "../../components/Home/Popups/BlogPost";
import QuesPost from "../../components/Home/Popups/QuesPost";
import RightSidebar from "../../components/Home/RightSidebar";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";

const Homepage = () => {
  let  { userData} = useSelector((state)=>state.user);
  return (
    <>
      {userData? (
        <div>
        <main>
          <div className="main-section">
            <div className="container">
              <div className="main-section-data">
                <div className="row">
                  <LeftSidebar/>
                  <MainNewsFeed/>
                  <RightSidebar/>
                </div>
              </div>
            </div>
          </div>
        </main>
        <BlogPost/>
        <QuesPost/>
      </div>
      ):<Loader isSmall={false}/>}
    </>
  );
};

export default Homepage;
