import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../api";
import Footer from "../../components/Home/Footer";
import RighSide from "../../components/Post/RighSide";
import { addComment, addToSave, toggleLike } from "../../redux/ApiCalls";
import Loader from "../../utils/Loader";
import { getDateAndTime } from "../../utils/timeCalculator";

const BlogPost = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { userData, userToken } = useSelector((state) => state.user);
  const [postData, setpostData] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [saveLoader, setsaveLoader] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`${baseURL}/post/getBlogPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify({ id:userData?._id, slug: slug }),
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
  }, [slug,userData]);

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
      postType: 1
    };
    dispatch(toggleLike(data));
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
      replies: []}
    );
    setpostData(t);
    setCommentValue("");
    let data = {
      token: userToken,
      postId: postData._id,
      commentValue: commentValue,
      postType: 1
    }
    dispatch(addComment(data))
  };

  const handelSavePost = async () => {
    let data = {
      token: localStorage.getItem("userJWT"),
      postId: postData._id,
      postType: 1
    };
    setsaveLoader(true);
    await dispatch(addToSave(data));
    setsaveLoader(false);
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
                                      {userData.saved.blogPosts.filter(
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
                                  <div style={{justifyContent: "center",display: "flex"}}>
                                  <img src={postData.image} alt=""></img>
                                  </div>
                                )}
                              </ul>
                              <p>{postData.description}</p>
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
                                      <i className="fas fa-heart"></i> Like{" "}
                                      {postData.likers
                                        ? postData.likers.length
                                        : 0}
                                    </>
                                  </div>
                                </li>
                                <li>
                                  <div href="/" className="com">
                                    <i className="fas fa-comment-alt"></i>{" "}
                                    Comments {postData.comments.length}
                                  </div>
                                </li>
                              </ul>
                              <div href="/">
                                <i className="fas fa-eye"></i>Views{" "}
                                {postData.viewers.length}
                              </div>
                            </div>

                            {userData &&<div className="comment-section-post">
                              <div className="post-comment-blog">
                                <div className="cm_img-blog">
                                  {userData?.image ? (
                                    <img
                                      src={baseURL + "/file/" + userData?.image}
                                      alt=""
                                    />
                                  ) : (
                                    <div className="cm_dummy-blog">
                                      {userData?.name.charAt(0)}
                                    </div>
                                  )}
                                </div>

                                <div className="comment_box-blog">
                                  <form>
                                    <input
                                      type="text"
                                      placeholder="Post a comment"
                                      value={commentValue}
                                      onChange={(e) =>
                                        setCommentValue(e.target.value)
                                      }
                                    />
                                    <button onClick={handelAddComment} type="submit">
                                        Send
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>}
                            {postData.comments
                              .slice()
                              .sort((a, b) => b.createdAt - a.createdAt)
                              .map((com, i) => {
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

export default BlogPost;
