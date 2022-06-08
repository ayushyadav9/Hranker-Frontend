import React, { useEffect } from "react";
import { baseURL } from "../../api";
import Loader from "../../utils/Loader";
import Post from "./Post";
import { useDispatch,useSelector } from "react-redux";
import { getNewsFeed } from "../../redux/ApiCalls";

const MainNewsFeed = ({ handelPopupOpen, resetPost, setresetPost }) => {
  const dispatch = useDispatch();
  
  let  { postsData,loadings } = useSelector((state)=>state.post);
  let  { userData } = useSelector((state)=>state.user);

  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      dispatch(getNewsFeed(token))
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-lg-6 col-md-8 no-pd">
      <div className="main-ws-sec">
        <div className="post-topbar">
          <div className="user-picy">
            {userData.image ? (
              <img src={baseURL + "/file/" + userData.image} alt="" />
            ) : (
              <div className="user-dummy">{userData.name.charAt(0)}</div>
            )}
          </div>
          <div className="post-st">
            <ul>
              <li>
                <div
                  className="post_project"
                  onClick={() => handelPopupOpen(1)}
                  title=""
                >
                  Post a Blog
                </div>
              </li>
              <li>
                <div
                  className="post-jb active"
                  onClick={() => handelPopupOpen(2)}
                  title=""
                >
                  Post a Question
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="posts-section">
          {loadings.newsFeedLoading ? (
            <Loader isSmall={true} />
          ) : (
            postsData &&
            postsData.map((post, i) => {
              return (
                <Post
                  key={i}
                  post={post}
                  userData={userData}
                  setresetPost={setresetPost}
                  resetPost={resetPost}
                />
              );
            })
          )}
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
