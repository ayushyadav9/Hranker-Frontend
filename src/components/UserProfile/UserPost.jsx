import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import { getDateAndTime } from "../../utils/timeCalculator";
import { baseURL } from "../../api";

const UserPost = ({ post,postUserData }) => {
  let { userData } = useSelector((state) => state.user);
  const [showCommentSection, setShowCommentSection] = useState(false);
 
  return (
    <>
      {postUserData && userData && post ? (
        <div className="post-bar">
          <div className="post_topbar">
          <div className="usy-dt" style={{ marginBottom: "20px" }}>
              {postUserData.image ? (
                <img
                  className="postUserDP"
                  src={baseURL + "/file/" + postUserData.image}
                  alt=""
                />
              ) : (
                <div className="user-dummy">{postUserData.name.charAt(0)}</div>
              )}
              <div className="usy-name">
                <Link
                  to={`/user-profile/${postUserData.username}`}
                  target="_blank"
                >
                  <h3>{postUserData.name}</h3>
                </Link>
                <span>
                  <img src="/images/clock.svg" alt="" />
                  {getDateAndTime(post.createdAt)} <span>•</span>
                  {post.subjectTags.map((sub, i) => {
                    return (
                      <span>
                        {sub} {post.subjectTags.length === i + 1 ? "" : "|"}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
                            
            <div className="ed-opts">
              <ul className="bk-links">
                <li>
                  <Link to={`/post/${post.slug}`} target="_blank">
                    <div className="open-newtab">
                      <img src="/images/open.svg" alt=""></img>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="job_descp">
            <h3>{post.title}</h3>
            <ul className="job-dt">
              {post.examTags?.map((tag, i) => {
                return (
                  <li key={i}>
                    <div href="/" title="">
                      {tag}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div style={{justifyContent: "center",display: "flex",flexDirection:"column",width:"100%"}}>
               {post.image && <img src={post.image} alt=""></img>}
            <p>
              {post.description && post.description.split(" ").length > 25 ? (
                <>
                  {post.description.split(" ").slice(0, 25).join(" ") + "..."}
                    <span style={{color:"#e44d3a", fontWeight: "600", display: "block"}} title="">
                  <Link to={`/post/${post.slug}`} target="_blank">
                      View more
                  </Link>
                    </span>
                </>
              ) : (
                post.description
              )}
            </p>
            </div>
            <ul className="skill-tags">
              {post.subjectTags?.map((item,i)=>{
                return (<li key={i}>
                  <div href="/" title="">
                    {item}
                  </div>
                </li>)
              })}
            </ul>
          </div>
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i._id === userData?._id).length > 0
                      ? "isLiked"
                      : ""
                  }
                >
                  <i className="fas fa-heart"></i> {" "}
                  {post.likers ? post.likers.length : 0}
                </div>
              </li>
              <li>
                <div onClick={() => setShowCommentSection((prev) => !prev)} className="com">
                  <i className="fas fa-comment-alt"></i>{" "}
                   {post.comments && post.comments.length}
                </div>
              </li>
            </ul>
            <div href="/">
              <i className="fas fa-eye"></i>Views {post.viewers && post.viewers.length}
            </div>
          </div>

          <div className="comment-section">
            {showCommentSection && (
              <>
                <div className="comment-sec">
                  <ul>
                    {post.comments
                      .slice()
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((com, i) => {
                        return (
                          <li className="main-comment" key={i}>
                            <div className="comment-list ">
                              <div className="bg-img"></div>
                              <div className="comment">
                                <div style={{ display: "flex" }}>
                                  <img
                                    className="userProf"
                                    src={
                                      com.user.image
                                        ? baseURL + "/file/" + com.user.image
                                        : "images/user40.png"
                                    }
                                    alt=""
                                  />
                                  <h3>{com.user.name}</h3>
                                  <span>
                                    <img src="images/clock.svg" alt="" />{" "}
                                    {getDateAndTime(com.createdAt)}
                                  </span>
                                </div>
                                <p>{com.comment}</p>
                                {/* <a href="/" title="">
                                <i className="fa fa-reply-all"></i>Reply
                              </a> */}
                              </div>
                            </div>
                            <ul>
                              {com.replies.map((rep, i) => {
                                return (
                                  <li key={i}>
                                    <div className="comment-list ">
                                      <div className="bg-img"></div>
                                      <div className="comment">
                                        <div style={{ display: "flex" }}>
                                          <img
                                            className="reply"
                                            src={
                                              rep.user.image
                                                ? rep.user.image
                                                : "images/user40.png"
                                            }
                                            alt=""
                                          />
                                          <h3>{rep.user.name}</h3>
                                          <span>
                                            <img src="images/clock.svg" alt="" />{" "}
                                            {getDateAndTime(rep.createdAt)}
                                          </span>
                                        </div>
                                        <p>{rep.reply}</p>
                                        {/* <a href="/" title="">
                                        <i className="fa fa-reply-all"></i>Reply
                                      </a> */}
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            )}
        </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPost;
