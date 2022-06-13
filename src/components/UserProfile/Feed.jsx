import React from 'react'
import UserPost from '../Profile/UserPost';

const Feed = ({ userData, activeTab }) => {
  return (
    <div
      className={`product-feed-tab ${activeTab === 0 && "current"}`}
      id="feed-dd"
    >
      <div className="posts-section">
        {userData.posts.blogPosts.length > 0 ? (
          userData.posts.blogPosts.map((post, i) => {
            return <UserPost key={i} post={post} userData={userData} />;
          })
        ) : (
          <div className="noPost">No post yet</div>
        )}
      </div>
    </div>
  )
}

export default Feed