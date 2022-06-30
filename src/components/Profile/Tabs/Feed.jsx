import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserPost from "../UserPost";

const Feed = ({ userData, activeTab }) => {
  const [postData, setpostData] = useState(null)

  useEffect(() => {
    if(userData){
      let t = [...userData.posts.blogPosts, ...userData.posts.quesPosts]
      setpostData(t)
    }
  }, [userData])
  
  return (
    <div
      className={`product-feed-tab ${activeTab === 0 ? "current":""}`}
      id="feed-dd"
    >
      <div className="posts-section">
        {postData ? (
          postData.map((post, i) => {
            return <UserPost key={i} post={post} userData={userData} />;
          })
        ) : (
          <div className="noPost">No post yet</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
