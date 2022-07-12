import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QuesPost from "../QuesPost";
import UserPost from "../UserPost";

const Feed = ({ userData, activeTab }) => {
  const [postData, setpostData] = useState(null);

  useEffect(() => {
    if (userData) {
      let t = [...userData.posts.blogPosts, ...userData.posts.quesPosts];
      setpostData(t);
      console.log(t);
    }
  }, [userData]);

  return (
    <div
      className={`product-feed-tab ${activeTab === 0 ? "current" : ""}`}
      id="feed-dd"
    >
      <div className="posts-section">
        {postData && postData.length > 0 ? (
          postData
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((post, i) => {
              return post.type === 1 ? (
                <UserPost key={i} post={post} postUserData={userData} />
              ) : (
                <QuesPost key={i} post={post} postUserData={userData} />
              );
            })
        ) : (
          <div className="noPost">No post yet</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
