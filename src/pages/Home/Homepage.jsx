import React, { useState } from "react";
import LeftSidebar from "../../components/Home/LeftSidebar";
import MainNewsFeed from "../../components/Home/MainNewsFeed";
import BlogPost from "../../components/Home/Popups/BlogPost";
import QuesPost from "../../components/Home/Popups/QuesPost";
import RightSidebar from "../../components/Home/RightSidebar";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";

const Homepage = ({ setisPopupOpen}) => {
  let  { userData} = useSelector((state)=>state.user);
  const [isActive, setisActive] = useState(0);
  const [resetPost, setresetPost] = useState(0);
  
  const handelPopupOpen = (id)=>{
    setisActive(id);
    setisPopupOpen(true)
  }
  const handelPopupClose = ()=>{
    setisActive(0);
    setisPopupOpen(false)
  }
  
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
                  <MainNewsFeed
                    handelPopupOpen={handelPopupOpen}
                    resetPost={resetPost}
                    setresetPost={setresetPost}
                  />
                  <RightSidebar/>
                </div>
              </div>
            </div>
          </div>
        </main>
        <BlogPost
          isActive={isActive}
          handelPopupClose={handelPopupClose}
          setresetPost={setresetPost}
        />
        <QuesPost
          isActive={isActive}
          handelPopupClose={handelPopupClose}
        />
      </div>
      ):<Loader isSmall={false}/>}
    </>
  );
};

export default Homepage;
