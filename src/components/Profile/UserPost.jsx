import React from "react";

const UserPost = ({ post, userData }) => {
  return (
    <div className="post-bar">
      <div className="post_topbar">
        <div className="ed-opts">
          <a href="/" title="" className="ed-opts-open">
            <i className="la la-ellipsis-v"></i>
          </a>
          <ul className="ed-options">
            <li>
              <a href="/" title="">
                Edit Post
              </a>
            </li>
            <li>
              <a href="/" title="">
                Unsaved
              </a>
            </li>
            <li>
              <a href="/" title="">
                Unbid
              </a>
            </li>
            <li>
              <a href="/" title="">
                Close
              </a>
            </li>
            <li>
              <a href="/" title="">
                Hide
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="job_descp">
        <h3>{post.title}</h3>
        <ul className="job-dt">
          {post.examTags.map((tag, i) => {
            return (
              <li>
                <a href="/" title="">
                  {tag}
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          {post.description && post.description.length > 25 ? (
            <>
              {post.description.split(" ").slice(0, 25).join(" ") + "..."}
              <a href="/" title="">
                view more
              </a>
            </>
          ) : (
            post.description
          )}
        </p>
        <ul className="skill-tags">
          <li>
            <a href="/" title="">
              HTML
            </a>
          </li>
          <li>
            <a href="/" title="">
              PHP
            </a>
          </li>
          <li>
            <a href="/" title="">
              CSS
            </a>
          </li>
          <li>
            <a href="/" title="">
              Javascript
            </a>
          </li>
          <li>
            <a href="/" title="">
              Wordpress
            </a>
          </li>
        </ul>
      </div>
      <div className="job-status-bar">
        <ul className="like-com">
          <li>
            <div
              className={
                post.likers.filter((i) => i._id === userData._id).length > 0 &&
                "isLiked"
              }
            >
              <i className="fas fa-heart"></i> Like{" "}
              {post.likers ? post.likers.length : 0}
            </div>
          </li>
          <li>
            <div href="/" className="com">
              <i className="fas fa-comment-alt"></i>
              Comment {post.comments && post.comments.length}
            </div>
          </li>
        </ul>
        <div href="/">
          <i className="fas fa-eye"></i>Views 50
        </div>
      </div>
    </div>
  );
};

export default UserPost;
