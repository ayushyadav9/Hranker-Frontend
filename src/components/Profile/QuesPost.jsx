import React,{useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import {deletePost} from "../../redux/ApiCalls"
import { getDateAndTime } from "../../utils/timeCalculator";
import { baseURL } from "../../api";

const QuesPost = ({ post,postUserData }) => {
  let { userData, userToken } = useSelector((state) => state.user);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [optionAnswered, setoptionAnswered] = useState(null);
  const [correctOption, setcorrectOption] = useState(null)
  const [isOpen, setisOpen] = useState(false)
  const dispatch = useDispatch();
  const handelDeletePost = ()=>{
    let isExecuted = window.confirm("Post will be deleted forever!!");
    if(isExecuted){
      let data = {
        postId: post._id,
        type: post.type,
        token: userToken
      }
      dispatch(deletePost(data))
    }
  }
  const calcPercentage = (id) => {
    if (post.answeredBy.length > 0) {
      let votecnts = post.options[id - 1].votes.length;
      let pcnt = (votecnts / post.answeredBy.length) * 100.0;
      return parseFloat(pcnt.toFixed(2));
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (post.options.length > 0) {
    //   let t = post.answeredBy.filter((id) => id === userData._id);
    //   console.log(t)
      
      let copt = post.options.filter((it) => it.isCorrect);
      setcorrectOption(copt)
      for (let i = 0; i < post.options.length; i++) {
        let tmp = post.options[i].votes.filter((it) => it === userData._id);
        if (tmp.length > 0) {
          setoptionAnswered(post.options[i]);
          break;
        }
      }
    }
   // eslint-disable-next-line
  }, [post.answeredBy]);

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
            {userData._id === post.user && <div className="ed-opts">
              <div onClick={()=>setisOpen(prev=>!prev)} className="ed-opts-open">
                <i className="la la-ellipsis-v"></i>
              </div>
              <ul className={`ed-options ${isOpen?"active":""}`}>
                <li>
                  <div onClick = {handelDeletePost}>
                    Delete Post
                  </div>
                </li>
              </ul>
            </div>}
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
          <div className="options-list">
            <div className="answers">
              {post.options.length > 0  
                && post.options.map((opt, i) => {
                    return (
                      <div
                        class={`answer ${
                          opt.id === optionAnswered?.id ? "selected" : ""
                        }`}
                      >
                        <span class="option-value">
                          {String.fromCharCode(opt.id + 96) + ") "}
                          {opt.value}
                        </span>
                        <span
                          class="percentage-bar"
                          style={{ width: calcPercentage(opt.id) + "%" }}
                        ></span>
                        <span class="percentage-value">
                          {calcPercentage(opt.id) + "%"}
                        </span>
                      </div>
                    );
                  })
                }
            </div>
          </div>
          { post.dontKnow === false && correctOption && (
            <div className="correct-ans">
              Correct Answer: <span style={{fontWeight:700}}>{correctOption.map((com, i) => String.fromCharCode(com.id + 96) + ") " + com.value)}</span>
            </div>
          )}
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i._id === postUserData._id).length > 0
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
            {post.options.length > 0 && (
              <div>
                <i class="far fa-calendar-check"></i>Votes{" "}
                {post.answeredBy ? post.answeredBy.length : 0}
              </div>
            )}
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

export default QuesPost;
