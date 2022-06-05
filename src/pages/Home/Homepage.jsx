import React, { useEffect, useState } from "react";
import { baseURL } from "../../api";
import LeftSidebar from "../../components/Home/LeftSidebar";
import MainNewsFeed from "../../components/Home/MainNewsFeed";
// import Navbar from "../../components/Home/Navbar";
import BlogPost from "../../components/Home/Popups/BlogPost";
import QuesPost from "../../components/Home/Popups/QuesPost";
import RightSidebar from "../../components/Home/RightSidebar";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [isActive, setisActive] = useState(0);
  const [resetPost, setresetPost] = useState(0);
  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      fetch(`${baseURL}/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setUserData(result.user);
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  return (
    <>
      {userData && (
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
      )}
    </>
  );
};

export default Homepage;
