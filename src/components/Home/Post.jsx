import React, { useState } from "react";
import { baseURL } from "../../api";
import { toast } from "react-toastify";
import { getDateAndTime } from "../../utils/timeCalculator";
import Loader from "../../utils/Loader";
import { useDispatch,useSelector } from "react-redux";
import { getNewsFeed, getNotifications, toggleLike } from "../../redux/ApiCalls";

const Post = ({ post, userData }) => {
  const dispatch = useDispatch()
  const {userToken} = useSelector(state=>state.user)
  const {loadings} = useSelector(state=>state.post)
  const [commentValue, setCommentValue] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isComLoader, setisComLoader] = useState(false);

  const handelAddComment = (e) => {
    e.preventDefault();
    setisComLoader(true);
    fetch(`${baseURL}/post/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
      body: JSON.stringify({ postId: post._id, comment: commentValue }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setisComLoader(false);
          setCommentValue("");
          if (result.success) {
            setShowCommentSection(true);
            toast.success("Comment added successfully");
          } else {
            toast.info(result.message);
          }
          dispatch(getNewsFeed(userToken))
          console.log(result);
        },
        (error) => {
          toast.info(error.message);
          console.log(error);
        }
      );
    console.log(post._id);
  };
  const handelToggleLike = async (e) => {
    e.preventDefault();
    let data = {
      token:localStorage.getItem("userJWT"),
      postId: post._id
    }
    await dispatch(toggleLike(data))
    dispatch(getNotifications(data.token))
  };

  return (
    <>
      <div className="posty">
        <div className="post-bar no-margin">
          <div className="post_topbar">
            <div className="usy-dt">
              {post.user.image ? (
                <img className="postUserDP" src={baseURL + "/file/" + post.user.image} alt="" />
              ) : (
                <div className="user-dummy">{post.user.name.charAt(0)}</div>
              )}
              {/*  */}
              <div className="usy-name">
                <h3>{post.user.name}</h3>
                <span>
                  <img src="images/clock.svg" alt="" />
                  {getDateAndTime(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="ed-opts">
              <div
                onClick={() => setIsOptionsOpen((pre) => !pre)}
                title=""
                className="ed-opts-open"
              >
                <i className="la la-ellipsis-v"></i>
              </div>
              <ul className={`ed-options ${isOptionsOpen && "active"}`}>
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
          <div className="epi-sec">
            <ul className="descp">
              <li>
                <img src="images/icon8.png" alt="" />
                <span>SSC Student</span>
              </li>
              <li>
                <img src="images/location.svg" alt="" />
                <span>India</span>
              </li>
            </ul>
            <ul className="bk-links">
              <li>
                <a href="/" title="">
                  <i className="la la-bookmark"></i>
                </a>
              </li>
              <li>
                <a href="/" title="">
                  <i className="la la-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="job_descp">
            <h3>{post.title}</h3>
            <ul className="job-dt">
              {post.examTags.map((tag, i) => {
                return (
                  <li key={i}>
                    <a href="/" title="">
                      {tag}
                    </a>
                  </li>
                );
              })}
              {post.image && <img src={post.image} alt=""></img>}
            </ul>
            <p>
              {post.description.length > 25 ? (
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
                  bank-po
                </a>
              </li>
              <li>
                <a href="/" title="">
                  clerk
                </a>
              </li>
              <li>
                <a href="/" title="">
                  bank-clerk
                </a>
              </li>
              <li>
                <a href="/" title="">
                  rrb-po
                </a>
              </li>
              <li>
                <a href="/" title="">
                  rrb-clerk
                </a>
              </li>
            </ul>
          </div>
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i === userData._id).length >0 ? "isLiked":""
                  }
                  onClick={handelToggleLike}
                >
                  {loadings.toggleLikeLoading?<Loader isSmall={true} />:<>
                  <i className="fas fa-heart"></i> Like{" "}
                  {post.likers ? post.likers.length : 0}</>}
                </div>
              </li>
              <li>
                <div
                  className="com active"
                  onClick={() => setShowCommentSection((prev) => !prev)}
                >
                  <i className="fas fa-comment-alt "></i>
                  Comment {post.comments.length}
                </div>
              </li>
            </ul>
            <div href="/">
              <i className="fas fa-eye"></i>Views 50
            </div>
          </div>
        </div>
        
        <div className="comment-section">
          <div className="post-comment">
            <div className="cm_img">
              {userData.image ? (
                <img src={baseURL + "/file/" + userData.image} alt="" />
              ) : (
                <div className="cm_dummy">{userData.name.charAt(0)}</div>
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
                  {isComLoader?<Loader isSmall={true}/>:"Send"}
                </button>
              </form>
            </div>
          </div>
          {showCommentSection && (
            <>
              <div className="comment-sec">
                <ul>
                  {post.comments.map((com, i) => {
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
                                    ? baseURL+"/file/"+ com.user.image
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
                            <a href="/" title="">
                              <i className="fa fa-reply-all"></i>Reply
                            </a>
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
                                    <a href="/" title="">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
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
