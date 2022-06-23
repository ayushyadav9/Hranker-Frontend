import React, { useEffect } from "react";
import { baseURL } from "../../api";
import Loader from "../../utils/Loader";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getNewsFeed } from "../../redux/ApiCalls";
import {
  toggleBlogPopup,
  toggleQuesPopup,
} from "../../redux/reducers/postReducers";
import QuesPost from "./QuesPost";
import { useState } from "react";

const MainNewsFeed = () => {
  const dispatch = useDispatch();

  let { postsData, loadings } = useSelector((state) => state.post);
  let { userData } = useSelector((state) => state.user);
  const [temPostData, settemPostData] = useState(null);
  const [activeTab, setactiveTab] = useState(0);

  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      dispatch(getNewsFeed(token));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (postsData) {
      if (activeTab === 0) {
        settemPostData(postsData);
      } else if (activeTab === 1) {
        let t = postsData.filter((item) => item.type === 1);
        settemPostData(t);
      } else if (activeTab === 2) {
        let t = postsData.filter((item) => item.type === 2);
        settemPostData(t);
      }
    }
  }, [postsData, activeTab]);

  const handelChangeTab = (id) => {
    setactiveTab(id);
  };

  return (
    <>
      <div className="col-lg-6 col-md-8 no-pd">
        <div className="main-ws-sec">
          <div className="post-topbar">
            <div className="user-picy">
              {userData.image ? (
                <img src={baseURL + "/file/" + userData.image} alt="" />
              ) : (
                <img src="/images/luser.jpg" alt=""></img>
                // <div className="user-dummy">{userData.name.charAt(0)}</div>
              )}
            </div>
            <div className="post-st">
              <ul>
                <li>
                  <div
                    className="post_project"
                    onClick={() => dispatch(toggleBlogPopup())}
                    title=""
                  >
                    Post a Blog
                  </div>
                </li>
                <li>
                  <div
                    className="post-jb active"
                    onClick={() => dispatch(toggleQuesPopup())}
                    title=""
                  >
                    Post a Question
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="posts-section">
            <div className="post-nav">
              <ul className="nav nav-tabs">
                <li onClick={() => {handelChangeTab(0)}} className="nav-item">
                  <div className={`nav-link ${activeTab === 0 ? "active" : ""}`}>All Posts</div>
                </li>
                <li onClick={() => { handelChangeTab(1) }} className="nav-item">
                  <div className={`nav-link ${activeTab === 1 ? "active" : ""}`}>
                    Blog Posts
                  </div>
                </li>
                <li onClick={() => {handelChangeTab(2);}} className="nav-item" >
                  <div className={`nav-link ${activeTab === 2 ? "active" : ""}`}>
                    Question Posts
                  </div>
                </li>
              </ul>
            </div>
            {loadings.newsFeedLoading ? (
              <Loader isSmall={true} />
            ) : (
              temPostData &&
              temPostData.map((post, i) => {
                return post.type === 1 ? (
                  <Post key={i} post={post} userData={userData} />
                ) : (
                  <QuesPost
                    key={i}
                    post={post}
                    userData={userData}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNewsFeed;
