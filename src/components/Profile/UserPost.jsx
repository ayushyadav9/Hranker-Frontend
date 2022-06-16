import React from "react";
import { useSelector } from "react-redux";

const UserPost = ({ post }) => {
  let { userData } = useSelector((state) => state.user);
  return (
    <div className="post-bar">
      <div className="post_topbar">
        <div className="ed-opts">
          <div href="/" title="" className="ed-opts-open">
            <i className="la la-ellipsis-v"></i>
          </div>
          <ul className="ed-options">
            <li>
              <div href="/" title="">
                Edit Post
              </div>
            </li>
            <li>
              <div href="/" title="">
                Unsaved
              </div>
            </li>
            <li>
              <div href="/" title="">
                Unbid
              </div>
            </li>
            <li>
              <div href="/" title="">
                Close
              </div>
            </li>
            <li>
              <div href="/" title="">
                Hide
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="job_descp">
        <h3>{post.title}</h3>
        <ul className="job-dt">
          {post.examTags.map((tag, i) => {
            return (
              <li key={i}>
                <div href="/" title="">
                  {tag}
                </div>
              </li>
            );
          })}
        </ul>
        {post.image && <img src={post.image} alt=""></img>}
        <p>
          {post.description && post.description.length > 25 ? (
            <>
              {post.description.split(" ").slice(0, 25).join(" ") + "..."}
              <span href="/" title="">
                view more
              </span>
            </>
          ) : (
            post.description
          )}
          
        </p>
        <ul className="skill-tags">
          <li>
            <div href="/" title="">
              HTML
            </div>
          </li>
          <li>
            <div href="/" title="">
              PHP
            </div>
          </li>
          <li>
            <div href="/" title="">
              CSS
            </div>
          </li>
          <li>
            <div href="/" title="">
              Javascript
            </div>
          </li>
          <li>
            <div href="/" title="">
              Wordpress
            </div>
          </li>
        </ul>
      </div>
      <div className="job-status-bar">
        <ul className="like-com">
          <li>
            <div
              className={
                post.likers.filter((i) => i._id === userData._id).length > 0 ?
                "isLiked":""
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
