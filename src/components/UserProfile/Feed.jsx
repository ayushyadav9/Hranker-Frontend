import React, { useState } from 'react'
import { useEffect } from 'react';
import UserPost from '../Profile/UserPost';

const Feed = ({ userData, activeTab }) => {
  const [postData, setpostData] = useState(null)

  useEffect(() => {
    if(userData){
      let t = [...userData.posts.blogPosts, ...userData.posts.quesPosts]
      setpostData(t)
      console.log(t)
    }
  }, [userData])
  return (
    <div
    className={`product-feed-tab ${activeTab === 0 && "current"}`}
    id="feed-dd"
    >
    {postData && 
      <div className="posts-section">
        {postData && postData.length > 0 ? (
          postData.map((post, i) => {
            return <UserPost key={i} post={post} postUserData={userData} />;
          })
        ) : (
          <div className="noPost">No post yet</div>
        )}
      </div>}
    </div>
  )
}

export default Feed