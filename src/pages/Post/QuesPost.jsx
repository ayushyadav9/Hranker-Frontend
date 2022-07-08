import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../api";
import Footer from "../../components/Home/Footer";
import RighSide from "../../components/Post/RighSide";
import {
  addComment,
  addToSave,
  handelVote,
  toggleLike,
} from "../../redux/ApiCalls";
import Loader from "../../utils/Loader";
import { getDateAndTime } from "../../utils/timeCalculator";

const QuesPost = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { userData, userToken } = useSelector((state) => state.user);
  const [postData, setpostData] = useState(null);
  const [saveLoader, setsaveLoader] = useState(false);
  const [isAnswered, setisAnswered] = useState(false);
  const [optionAnswered, setoptionAnswered] = useState(null);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    if (slug) {
      fetch(`${baseURL}/post/getQuesPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify({ id: userData?._id, slug: slug }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setpostData(result.data);
            } else {
            }
            // console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [slug, userData]);

  useEffect(() => {
    if (postData && userData) {
      if (postData.options.length > 0) {
        let t = postData.answeredBy.filter((id) => id === userData._id);
        for (let i = 0; i < postData.options.length; i++) {
          let tmp = postData.options[i].votes.filter(
            (it) => it === userData._id
          );
          if (tmp.length > 0) {
            setoptionAnswered(postData.options[i]);
            break;
          }
        }
        if (t.length > 0) {
          setisAnswered(true);
        }
      }
    }
  }, [postData, userData]);

  const handelToggleLike = () => {
    let t = { ...postData };
    if (postData.likers.filter((i) => i === userData._id).length > 0) {
      const index = t.likers.indexOf(userData._id);
      t.likers.splice(index, 1);
    } else {
      t.likers.push(userData._id);
    }
    setpostData(t);
    let data = {
      token: userToken,
      postId: postData._id,
      postType: 2,
    };
    dispatch(toggleLike(data));
  };

  const handelSavePost = async () => {
    let data = {
      token: localStorage.getItem("userJWT"),
      postId: postData._id,
      postType: 2,
    };
    setsaveLoader(true);
    await dispatch(addToSave(data));
    setsaveLoader(false);
  };

  const calcPercentage = (id) => {
    if (postData) {
      if (postData.answeredBy.length > 0) {
        let votecnts = postData.options[id - 1].votes.length;
        let pcnt = (votecnts / postData.answeredBy.length) * 100.0;
        return parseFloat(pcnt.toFixed(2));
      } else {
        return 0;
      }
    }
  };

  const handelAddComment = (e) => {
    e.preventDefault();
    let t = { ...postData };
    t.comments.push({
      user: {
        _id: userData._id,
        name: userData.name,
        image: userData.image,
      },
      comment: commentValue,
      createdAt: new Date().getTime(),
      replies: [],
    });
    setpostData(t);
    setCommentValue("");
    let data = {
      token: userToken,
      postId: postData._id,
      commentValue: commentValue,
      postType: 2,
    };
    dispatch(addComment(data));
  };

  const handleVote = (id) => {
    let t = { ...postData };
    t.answeredBy.push(userData._id);
    t.options.map((n) => {
      if (n.id === id) {
        n.votes.push(userData._id);
      }
      return n;
    });
    setpostData(t);
    let data = {
      postId: postData._id,
      optionId: id,
      token: userToken,
    };
    dispatch(handelVote(data));
  };

  return (
    <>
      {postData ? (
        <div>
          <main>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="row">
                    <div className="col-xl-9 col-lg-9 col-md-12">
                      <div className="main-ws-sec">
                        <div className="posts-section">
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div
                                className="usy-dt"
                                style={{ marginBottom: "20px" }}
                              >
                                {postData.user.image ? (
                                  <img
                                    className="postUserDP"
                                    src={
                                      baseURL + "/file/" + postData.user.image
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <div className="user-dummy">
                                    {postData.user.name.charAt(0)}
                                  </div>
                                )}
                                <div className="usy-name">
                                  <Link
                                    to={`/user-profile/${postData.user.username}`}
                                    target="_blank"
                                  >
                                    <h3>{postData.user.name}</h3>
                                  </Link>
                                  <span>
                                    <img src="/images/clock.svg" alt="" />
                                    {getDateAndTime(postData.createdAt)}{" "}
                                    <span>•</span>
                                    {postData.subjectTags.map((sub, i) => {
                                      return (
                                        <span>
                                          {sub}{" "}
                                          {postData.subjectTags.length === i + 1
                                            ? ""
                                            : "|"}
                                        </span>
                                      );
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="ed-opts">
                                {userData && <ul className="bk-links">
                                  <li>
                                    <div onClick={handelSavePost} title="">
                                      {userData.saved.quesPosts.filter(
                                        (i) => i === postData._id
                                      ).length > 0 ? (
                                        <div className="save">
                                          {saveLoader ? (
                                            <Loader isSmall={true} />
                                          ) : (
                                            <i className="la la-check"></i>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="save2">
                                          {saveLoader ? (
                                            <Loader isSmall={true} />
                                          ) : (
                                            <i className="la la-bookmark"></i>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                </ul>}
                              </div>
                            </div>

                            <div className="job_descp accountnone">
                              <h3>{postData.title}</h3>
                              <ul className="job-dt">
                                {postData.examTags.map((tag, i) => {
                                  return (
                                    <li key={i}>
                                      <div href="/" title="">
                                        {tag}
                                      </div>
                                    </li>
                                  );
                                })}

                                {postData.image && (
                                  <div
                                    style={{
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <img src={postData.image} alt=""></img>
                                  </div>
                                )}
                              </ul>
                              <p>{postData.description}</p>
                            </div>
                            <div className="options-list">
                              <div className="answers">
                                {postData.options.length > 0 && isAnswered
                                  ? postData.options.map((opt, i) => {
                                      return (
                                        <div
                                          class={`answer ${
                                            opt.id === optionAnswered.id
                                              ? "selected"
                                              : ""
                                          }`}
                                        >
                                          <span class="option-value">
                                            {String.fromCharCode(opt.id + 96) +
                                              ") "}
                                            {opt.value}
                                          </span>
                                          <span
                                            class="percentage-bar"
                                            style={{
                                              width:
                                                calcPercentage(opt.id) + "%",
                                            }}
                                          ></span>
                                          <span class="percentage-value">
                                            {calcPercentage(opt.id) + "%"}
                                          </span>
                                        </div>
                                      );
                                    })
                                  : postData.options.map((opt, i) => {
                                      return (
                                        <div
                                          class={`answer`}
                                          onClick={() => handleVote(opt.id)}
                                        >
                                          <span class="option-value">
                                            {String.fromCharCode(opt.id + 96) +
                                              ") "}
                                            {opt.value}
                                          </span>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>

                            <div className="job-status-bar btm-line">
                              <ul className="like-com">
                                <li>
                                  <div
                                    className={
                                      postData.likers.filter(
                                        (i) => i === userData?._id
                                      ).length > 0
                                        ? "isLiked"
                                        : ""
                                    }
                                    onClick={handelToggleLike}
                                  >
                                    <>
                                      <i className="fas fa-heart"></i>{" "}
                                      {postData.likers
                                        ? postData.likers.length
                                        : 0}
                                    </>
                                  </div>
                                </li>
                                <li>
                                  <div href="/" className="com">
                                    <i className="fas fa-comment-alt"></i>{" "}
                                    {postData.comments.length}
                                  </div>
                                </li>
                              </ul>
                              <div href="/">
                                <i className="fas fa-eye"></i>Views{" "}
                                {postData.viewers.length}
                              </div>
                              {postData.options.length > 0 && (
                                <div>
                                  <i class="far fa-calendar-check"></i>Votes{" "}
                                  {postData.answeredBy
                                    ? postData.answeredBy.length
                                    : 0}
                                </div>
                              )}
                            </div>

                            {userData && (
                              <div className="comment-section-post">
                                <div className="post-comment-blog">
                                  <div className="cm_img-blog">
                                    {userData.image ? (
                                      <img
                                        src={
                                          baseURL + "/file/" + userData.image
                                        }
                                        alt=""
                                      />
                                    ) : (
                                      <div className="cm_dummy-blog">
                                        {userData.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>

                                  <div className="comment_box-blog">
                                    <form>
                                      <textarea
                                        type="text"
                                        placeholder="Post a comment"
                                        value={commentValue}
                                        onChange={(e) =>
                                          setCommentValue(e.target.value)
                                        }
                                      />
                                      <button
                                        onClick={handelAddComment}
                                        type="submit"
                                      >
                                        Send
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            )}
                            {postData.comments.map((com, i) => {
                              return (
                                <div key={i} className="comment-sec-blog">
                                  <div className="post_topbar">
                                    <div className="usy-dt">
                                      <img src="/images/user40.png" alt="" />
                                      <div className="usy-name">
                                        <h2>{com.user.name}</h2>
                                        <span>
                                          {" "}
                                          <img
                                            src="/images/clock.svg"
                                            alt=""
                                          />{" "}
                                          {getDateAndTime(com.createdAt)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="reply-area">
                                    <p>{com.comment}</p>
                                    {/* <span>
                                        <i className="la la-mail-reply"></i>Reply
                                      </span> */}
                                    {com.replies.map((rep, i) => {
                                      return (
                                        <div
                                          key={i}
                                          className="comment-area reply-rply1"
                                        >
                                          <div className="post_topbar">
                                            <div className="usy-dt">
                                              <img
                                                src={
                                                  rep.user.image
                                                    ? rep.user.image
                                                    : "images/user40.png"
                                                }
                                                alt=""
                                              />
                                              <div className="usy-name">
                                                <h3>{rep.user.name}</h3>
                                                <span>
                                                  <img
                                                    src="/images/clock.svg"
                                                    alt=""
                                                  />
                                                  {getDateAndTime(
                                                    rep.createdAt
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="reply-area">
                                            <p>{rep.reply}</p>
                                            <span>
                                              <i className="la la-mail-reply"></i>
                                              Reply
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <RighSide postData={postData} />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default QuesPost;
