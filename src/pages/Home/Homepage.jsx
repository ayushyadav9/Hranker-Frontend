import React from "react";
// import { useParams } from "react-router-dom";
import LeftSidebar from "../../components/Home/LeftSidebar";
import MainNewsFeed from "../../components/Home/MainNewsFeed";
import BlogPost from "../../components/Home/Popups/BlogPost";
import QuesPost from "../../components/Home/Popups/QuesPost";
import RightSidebar from "../../components/Home/RightSidebar";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";
// import Congratulation from "../../utils/Congratulation";

const Homepage = () => {
  let  { userData} = useSelector((state)=>state.user);
  const { loadings } = useSelector((state)=>state.post)

  return (
    <>
    {/* <Congratulation/> */}
    {loadings.voteLoading && <Loader/>}
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
