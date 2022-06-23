import React, { useEffect, useRef, useState } from "react";
import { baseURL } from "../../api";
import { getDateAndTime } from "../../utils/timeCalculator";
import Loader from "../../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSave,
  getNotifications,
  handelVote,
  toggleLike,
} from "../../redux/ApiCalls";
import { Link } from "react-router-dom";

const QuesPost = ({ post, userData }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.user);
  
  const optionRef = useRef();
  const [likeLoading, setlikeLoading] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [saveLoader, setsaveLoader] = useState(false);
  const [isAnswered, setisAnswered] = useState(false);
  const [optionAnswered, setoptionAnswered] = useState(null);
  const [correctOption, setcorrectOption] = useState(null)

  useEffect(() => {
    if (post && post.options.length > 0) {
      let t = post.answeredBy.filter((id) => id === userData._id);
      let copt = post.options.filter((it) => it.isCorrect);
      setcorrectOption(copt)
      for (let i = 0; i < post.options.length; i++) {
        let tmp = post.options[i].votes.filter((it) => it === userData._id);
        if (tmp.length > 0) {
          setoptionAnswered(post.options[i]);
          break;
        }
      }
      if (t.length > 0) {
        setisAnswered(true);
      }
    }
    // setpollOptions(post.options);
  }, [post, userData]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!optionRef.current.contains(e.target)) {
        setIsOptionsOpen(false);
      }
    });
  }, []);

  const calcPercentage = (id) => {
    if (post.answeredBy.length > 0) {
      let votecnts = post.options[id - 1].votes.length;
      let pcnt = (votecnts / post.answeredBy.length) * 100.0;
      return parseFloat(pcnt.toFixed(2));
    } else {
      return 0;
    }
  };

  const handleVote = (id) => {
    let data = {
      postId: post._id,
      optionId: id,
      token: userToken,
    }
    dispatch(handelVote(data));
  };

  const handelToggleLike = async (e) => {
    e.preventDefault();
    let data = {
      token: userToken,
      postId: post._id,
      postType: 2,
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
      type: 2,
    };
    setsaveLoader(true);
    await dispatch(addToSave(data));
    setsaveLoader(false);
  };

  return (
    <>
      <div
        className="posty"
        style={{
          borderRadius: "7px",
          border: `1px solid ${isAnswered===true ? "#00e400" : "black"}`,
        }}
      >
        <div className="post-bar no-margin">
          <div className="post_topbar">
            <div className="usy-dt">
              {post.user.image ? (
                <img
                  className="postUserDP"
                  src={baseURL + "/file/" + post.user.image}
                  alt=""
                />
              ) : (
                <div className="user-dummy">{post.user.name.charAt(0)}</div>
              )}
              {/*  */}
              <div className="usy-name">
                <Link
                  to={`/user-profile/${post.user.username}`}
                  target="_blank"
                >
                  <h3>{post.user.name}</h3>
                </Link>
                <span>
                  <img src="images/clock.svg" alt="" />
                  {getDateAndTime(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="ed-opts">
              <div
                ref={optionRef}
                onClick={() => setIsOptionsOpen((pre) => !pre)}
                title=""
                className="ed-opts-open"
              >
                <i className="la la-ellipsis-v"></i>
              </div>
              <ul className={`ed-options ${isOptionsOpen ? "active" : ""}`}>
                <li>
                  <div title="">Edit Post</div>
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
                <Link to={`/quesPost/${post._id}`} target="_blank">
                  <div className="open-newtab">
                    <img src="/images/open.svg" alt=""></img>
                  </div>
                </Link>
              </li>
              <li>
                <div onClick={handelSavePost} title="">
                  <div className="save">
                    {saveLoader ? (
                      <Loader isSmall={true} />
                    ) : (
                      <i
                        className={`${
                          userData.saved.quesPosts.filter((i) => i === post._id)
                            .length > 0
                            ? "la la-check"
                            : "la la-bookmark"
                        }`}
                      ></i>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="job_descp">
            <h3>{post.title}</h3>
            <ul className="job-dt">
              {post.examTags.map((tag, i) => {
                return (
                  <li key={i}>
                    <div title="">{tag}</div>
                  </li>
                );
              })}
              {post.image && <img src={post.image} alt=""></img>}
            </ul>
            <p>
              {post.description.length > 25 ? (
                <>
                  {post.description.split(" ").slice(0, 25).join(" ") + "..."}
                  <span>Read more</span>
                </>
              ) : (
                post.description
              )}
            </p>
          </div>

          <div className="options-list">
            <div className="answers">
              {post.options.length > 0 && isAnswered && optionAnswered
                ? post.options.map((opt, i) => {
                    return (
                      <div
                        class={`answer ${
                          opt.id === optionAnswered.id ? "selected" : ""
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
                : post.options.map((opt, i) => {
                    return (
                      <div class={`answer`} onClick={() => handleVote(opt.id)}>
                        <span class="option-value">
                          {String.fromCharCode(opt.id + 96) + ") "}
                          {opt.value}
                        </span>
                      </div>
                    );
                  })}
            </div>
          </div>
          {isAnswered===true && post.dontKnow === false && correctOption && (
            <div className="correct-ans">
              Correct Answer: <span style={{fontWeight:700}}>{correctOption.map((com, i) => String.fromCharCode(com.id + 96) + ") " + com.value)}</span>
            </div>
          )}
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
                <div className="com active">
                  <i className="fas fa-comment-alt "></i> {post.comments.length}
                </div>
              </li>
            </ul>
            <div>
              <i className="fas fa-eye"></i>Views{" "}
              {post.viewers ? post.viewers.length : 0} {"   "}
            </div>

            {post.options.length > 0 && (
              <div>
                <i class="far fa-calendar-check"></i>Votes{" "}
                {post.answeredBy ? post.answeredBy.length : 0}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuesPost;
