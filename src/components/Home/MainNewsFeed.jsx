import React, { useEffect, useState } from "react";
import { baseURL } from "../../api";
import Post from "./Post";
// import TopProfiles from "./TopProfiles";

const MainNewsFeed = ({ userData, setisActive, resetPost, setresetPost }) => {
  const [postsData, setpostsData] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      fetch(`${baseURL}/post/getNewsFeed`, {
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
              setpostsData(result.data);
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [resetPost]);

  return (
    <div className="col-lg-6 col-md-8 no-pd">
      <div className="main-ws-sec">
        <div className="post-topbar">
          <div className="user-picy">
            {userData.image ? (
              <img
                src={baseURL+"/file/"+ userData.image}
                alt=""
              />
            ) : (
              <div className="user-dummy">{userData.name.charAt(0)}</div>
            )}
          </div>
          <div className="post-st">
            <ul>
              <li>
                <div
                  className="post_project"
                  onClick={() => setisActive(1)}
                  title=""
                >
                  Post a Blog
                </div>
              </li>
              <li>
                <div
                  className="post-jb active"
                  onClick={() => setisActive(2)}
                  title=""
                >
                  Post a Question
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="posts-section">
          {postsData &&
            postsData.map((post, i) => {
              return <Post key={i} post={post} userData={userData} setresetPost={setresetPost} resetPost={resetPost}/>;
            })}
          {/* <TopProfiles/> */}

          {/* <div className="process-comm">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainNewsFeed;
