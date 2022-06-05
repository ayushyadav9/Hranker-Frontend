import React, { useState } from "react";
import LeftSidebar from "../../components/Home/LeftSidebar";
import MainNewsFeed from "../../components/Home/MainNewsFeed";
import BlogPost from "../../components/Home/Popups/BlogPost";
import QuesPost from "../../components/Home/Popups/QuesPost";
import RightSidebar from "../../components/Home/RightSidebar";
import Loader from "../../utils/Loader";

const Homepage = ({userData}) => {
  const [isActive, setisActive] = useState(0);
  const [resetPost, setresetPost] = useState(0);
  
  return (
    <>
      {userData? (
        <div className={`wrapper ${isActive !== 0 ? "overlay" : ""}`}>
          <main>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="row">
                    <LeftSidebar userData={userData} />
                    <MainNewsFeed
                      userData={userData}
                      setisActive={setisActive}
                      resetPost={resetPost}
                      setresetPost={setresetPost}
                    />
                    <RightSidebar
                      userData={userData}
                      setisActive={setisActive}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <BlogPost
            isActive={isActive}
            setisActive={setisActive}
            userData={userData}
            setresetPost={setresetPost}
          />
          <QuesPost
            isActive={isActive}
            setisActive={setisActive}
            userData={userData}
          />
        </div>
      ):<Loader isSmall={false}/>}
    </>
  );
};

export default Homepage;
