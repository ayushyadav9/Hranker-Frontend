import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { baseURL } from "../../api";
import Footer from "../../components/Home/Footer";
import RighSide from "../../components/Post/RighSide";
import { addToSave, toggleLike } from "../../redux/ApiCalls";
import Loader from "../../utils/Loader";
import { getDateAndTime } from "../../utils/timeCalculator";

const BlogPost = ({ setisPopupOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userData, userToken } = useSelector((state) => state.user);
  const [postData, setpostData] = useState(null);
  const [saveLoader, setsaveLoader] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`${baseURL}/post/getBlogPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify({ postId: id }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setpostData(result.data);
            } else {
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [id]);

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
    };
    dispatch(toggleLike(data));
  };

  const handelSavePost = async () => {
    let data = {
      token: localStorage.getItem("userJWT"),
      postId: postData._id,
    };
    setsaveLoader(true);
    await dispatch(addToSave(data));
    setsaveLoader(false);
  };

  return (
    <>
      {postData && userData ? (
        <div>
          <main>
            <div class="main-section">
              <div class="container">
                <div class="main-section-data">
                  <div class="row">
                    <div class="col-xl-9 col-lg-9 col-md-12">
                      <div class="main-ws-sec">
                        <div class="posts-section">
                          <div class="post-bar">
                            <div class="post_topbar">
                              <div class="usy-dt">
                                {postData.user.image ? (
                                  <img className="postUserDP" src={ baseURL + "/file/" + postData.user.image} alt=""/>
                                ) : (
                                  <img src="/images/user40.png" alt="" />
                                )}
                                <div class="usy-name">
                                  <h3>{postData.user.name}</h3>
                                  <span>
                                    <img src="/images/clock.svg" alt="" />
                                    {getDateAndTime(postData.createdAt)}
                                  </span>
                                </div>
                              </div>
                              <div class="ed-opts">
                                <div href="/" title="" class="ed-opts-open">
                                  <i class="la la-ellipsis-v"></i>
                                </div>
                                <ul class="ed-options">
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
                            <div class="epi-sec">
                              <ul class="descp">
                                <li>
                                  <img src="/images/icon8.png" alt="" />
                                  <span>SSC Student</span>
                                </li>
                                <li>
                                  <img src="/images/location.svg" alt="" />
                                  <span>India</span>
                                </li>
                              </ul>
                              <ul class="bk-links">
                                <li>
                                  <div onClick={handelSavePost} title="">
                                    <div className="save">
                                      {saveLoader ? (
                                        <Loader isSmall={true} />
                                      ) : (
                                        <i
                                          className={`${
                                            userData.saved.blogPosts.filter(
                                              (i) => i === postData._id
                                            ).length > 0
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
                            <div class="job_descp accountnone">
                              <h3>{postData.title}</h3>
                              <ul class="job-dt">
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
                                  <img src={postData.image} alt=""></img>
                                )}
                              </ul>
                              <p>{postData.description}</p>
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
                            <div class="job-status-bar btm-line">
                              <ul class="like-com">
                                <li>
                                  <div
                                    className={
                                      postData.likers.filter(
                                        (i) => i === userData._id
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
                                  <div href="/" class="com">
                                    <i class="fas fa-comment-alt"></i> Comments{" "}
                                    {postData.comments.length}
                                  </div>
                                </li>
                              </ul>
                              <div href="/">
                                <i class="fas fa-eye"></i>Views 50
                              </div>
                            </div>

                            <div className="comment-section-post">
                              <div className="post-comment-blog">
                                <div className="cm_img-blog">
                                  {userData.image ? (
                                    <img
                                      src={baseURL + "/file/" + userData.image}
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
                                    <input
                                      type="text"
                                      placeholder="Post a comment"
                                    />
                                    <button type="submit">Send</button>
                                  </form>
                                </div>
                              </div>
                            </div>
                            {postData.comments.map((com, i) => {
                              return (
                                <div className="comment-sec-blog">
                                  <div class="post_topbar">
                                    <div class="usy-dt">
                                      <img src="/images/user40.png" alt="" />
                                      <div class="usy-name">
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
                                  <div class="reply-area">
                                    <p>{com.comment}</p>
                                    {/* <span>
                                        <i class="la la-mail-reply"></i>Reply
                                      </span> */}
                                    {com.replies.map((rep, i) => {
                                      return (
                                        <div class="comment-area reply-rply1">
                                          <div class="post_topbar">
                                            <div class="usy-dt">
                                              <img
                                                src={
                                                  rep.user.image
                                                    ? rep.user.image
                                                    : "images/user40.png"
                                                }
                                                alt=""
                                              />
                                              <div class="usy-name">
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
                                          <div class="reply-area">
                                            <p>{rep.reply}</p>
                                            <span>
                                              <i class="la la-mail-reply"></i>
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
