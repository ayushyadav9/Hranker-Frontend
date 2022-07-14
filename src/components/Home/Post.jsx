import React, { useState } from "react";
import { baseURL } from "../../api";
import { getDateAndTime } from "../../utils/timeCalculator";
import Loader from "../../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addToSave,
  getNotifications,
  toggleLike,
} from "../../redux/ApiCalls";
import { Link } from "react-router-dom";
import { toggleSharePopup } from "../../redux/reducers/postReducers";

const Post = ({ post, userData }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [likeLoading, setlikeLoading] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [isComLoader, setisComLoader] = useState(false);
  const [saveLoader, setsaveLoader] = useState(false);


  const handelAddComment = async (e) => {
    e.preventDefault();
    setisComLoader(true);
    let data = {
      token: userToken,
      postId: post._id,
      commentValue: commentValue,
      postType: 1,
    };
    await dispatch(addComment(data));
    setisComLoader(false);
    setCommentValue("");
  };

  const handelToggleLike = async (e) => {
    e.preventDefault();
    let data = {
      token: localStorage.getItem("userJWT"),
      postId: post._id,
      postType: 1,
    };
    setlikeLoading(true);
    await dispatch(toggleLike(data));
    dispatch(getNotifications(data.token));
    setlikeLoading(false);
  };

  const handelSavePost = async () => {
    let data = {
      token: localStorage.getItem("userJWT"),
      postId: post._id,
      postType: 1,
    };
    setsaveLoader(true);
    await dispatch(addToSave(data));
    setsaveLoader(false);
  };

  const handelShare = (link) =>{
    dispatch(toggleSharePopup(link))
  }

  return (
    <>
      <div className="posty">
        <div className="post-bar no-margin">
          <div className="post_topbar">
            <div className="usy-dt" style={{ marginBottom: "20px" }}>
              {post.user.image ? (
                <img
                  className="postUserDP"
                  src={baseURL + "/file/" + post.user.image}
                  alt=""
                />
              ) : (
                <div className="user-dummy">{post.user.name.charAt(0)}</div>
              )}
              <div className="usy-name">
                <Link
                  to={`/user-profile/${post.user.username}`}
                  target="_blank"
                >
                  <h3>{post.user.name}</h3>
                </Link>
                <span>
                  <img src="images/clock.svg" alt="" />
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
                <li>
                    <div onClick={()=>handelShare(`post/${post.slug}`)} className="open-newtab">
                      <img src="/images/share.png" alt=""></img>
                    </div>
                </li>
                <li>
                  <div onClick={handelSavePost} title="">
                    {userData.saved.blogPosts.filter((i) => i === post._id).length > 0?
                      <div className="save">
                        {saveLoader ? (
                          <Loader isSmall={true} />
                        ) : (
                          <i className="la la-check"></i>
                        )}
                      </div>:
                      <div className="save2">
                        {saveLoader ? (
                          <Loader isSmall={true} />
                        ) : (
                          <i className="la la-bookmark"></i>
                        )}
                      </div>
                    }
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="epi-sec"></div>
          <div className="job_descp">
            <ul className="job-dt">
              {post.examTags.map((tag, i) => {
                return (
                  <li key={i}>
                    <div title="">{tag}</div>
                  </li>
                );
              })}
            </ul>
            <h3>{post.title}</h3>
            {post.image && (
              <div style={{ justifyContent: "center", display: "flex" }}>
                <img src={post.image} alt=""></img>
              </div>
            )}
            {/* {post.image && <img src={post.image} alt=""></img>} */}
            <p>
              {post.description.split(" ").length > 26 ? (
                <>
                  {post.description.split(" ").slice(0, 26).join(" ") + " ...."}
                  <span>
                    {" "}
                    <Link to={`/post/${post.slug}`} target="_blank">
                      Read more
                    </Link>
                  </span>
                </>
              ) : (
                post.description
              )}
            </p>
          </div>

          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i === userData._id).length > 0
                      ? "isLiked"
                      : ""
                  }
                  onClick={handelToggleLike}
                >
                  {likeLoading ? (
                    <Loader isSmall={true} />
                  ) : (
                    <>
                      <i className="fas fa-heart"></i>{" "}
                      {post.likers ? post.likers.length : 0}
                    </>
                  )}
                </div>
              </li>
              <li>
                <div
                  className="com active"
                  onClick={() => setShowCommentSection((prev) => !prev)}
                >
                  <i className="fas fa-comment-alt "></i> {post.comments.length}
                </div>
              </li>
            </ul>
            <div>
              <i className="fas fa-eye"></i>Views{" "}
              {post.viewers ? post.viewers.length : 0}
            </div>
          </div>
        </div>

        <div className="comment-section">
          <div className="post-comment">
            <div className="cm_img">
              {userData.image ? (
                <img src={baseURL + "/file/" + userData.image} alt="" />
              ) : (
                <img src="/images/luser.jpg" alt=""></img>
              )}
            </div>

            <div className="comment_box">
              <form>
                <input
                  type="text"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Post a comment"
                />
                <button onClick={handelAddComment} type="submit">
                  {isComLoader ? <Loader isSmall={true} /> : "Send"}
                </button>
              </form>
            </div>
          </div>
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
    </>
  );
};

export default Post;
