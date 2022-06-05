import React from "react";
import UserPost from "../UserPost";

const Feed = ({ userData, activeTab }) => {
  return (
    <div
      className={`product-feed-tab ${activeTab === 0 && "current"}`}
      id="feed-dd"
    >
      <div className="posts-section">
        {userData.posts.length > 0 ? (
          userData.posts.map((post, i) => {
            return <UserPost key={i} post={post} userData={userData} />;
          })
        ) : (
          <div className="noPost">No post yet</div>
        )}
        {/* <div className="process-comm">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Feed;
