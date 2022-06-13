import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSavedPosts } from "../../../redux/ApiCalls";
import { baseURL } from "../../../api";
import { getDateAndTime } from "../../../utils/timeCalculator";

const Saved = ({ activeTab }) => {
  let { savedPosts, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeState, setactiveState] = useState(0);
  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      dispatch(getSavedPosts(token));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`product-feed-tab ${activeTab === 2 && "current"}`}
      id="saved-jobs"
    >
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <div
            className={`nav-link ${activeState === 0 ? "active" : ""}`}
            onClick={() => setactiveState(0)}
          >
            Blog Posts
          </div>
        </li>
        <li className="nav-item">
          <div
            className={`nav-link ${activeState === 1 ? "active" : ""}`}
            onClick={() => setactiveState(1)}
          >
            Question Posts
          </div>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade show ${activeState === 0 ? "active" : ""}`}
          id="mange"
          role="tabpanel"
          aria-labelledby="mange-tab"
        >
          {savedPosts &&
            savedPosts.blogPosts.map((blog, i) => {
              return (
                <div className="post-bar no-margin">
                  <div className="post_topbar">
                    <div className="usy-dt">
                      {blog.user.image ? (
                        <img
                          className="postUserDP"
                          src={baseURL + "/file/" + blog.user.image}
                          alt=""
                        />
                      ) : (
                        <div className="user-dummy">
                          {blog.user.name.charAt(0)}
                        </div>
                      )}
                      {/*  */}
                      <div className="usy-name">
                        <h3>{blog.user.name}</h3>
                        <span>
                          <img src="images/clock.svg" alt="" />
                          {getDateAndTime(blog.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="ed-opts">
                      <div
                        // onClick={() => setIsOptionsOpen((pre) => !pre)}
                        title=""
                        className="ed-opts-open"
                      >
                        <i className="la la-ellipsis-v"></i>
                      </div>
                      <ul className={`ed-options`}>
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
                        <img src="images/icon9.png" alt="" />
                        <span>India</span>
                      </li>
                    </ul>
                    <ul className="bk-links">
                      <li>
                        <a href="/" title="">
                          <i className="la la-check"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="job_descp">
                    <h3>{blog.title}</h3>
                    <ul className="job-dt">
                      {blog.examTags.map((tag, i) => {
                        return (
                          <li key={i}>
                            <a href="/" title="">
                              {tag}
                            </a>
                          </li>
                        );
                      })}
                      {blog.image && <img src={blog.image} alt=""></img>}
                    </ul>
                    <p>
                      {blog.description.length > 25 ? (
                        <>
                          {blog.description.split(" ").slice(0, 25).join(" ") +
                            "..."}
                          <a href="/" title="">
                            view more
                          </a>
                        </>
                      ) : (
                        blog.description
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
                            blog.likers.filter((i) => i === userData._id)
                              .length > 0
                              ? "isLiked"
                              : ""
                          }
                          // onClick={handelToggleLike}
                        >
                          {/* {isLoader?<Loader isSmall={true} />:<> */}
                          <i className="fas fa-heart"></i> Like{" "}
                          {blog.likers ? blog.likers.length : 0}
                        </div>
                      </li>
                      <li>
                        <div
                          className="com active"
                          // onClick={() => setShowCommentSection((prev) => !prev)}
                        >
                          <i className="fas fa-comment-alt "></i>
                          Comment {blog.comments.length}
                        </div>
                      </li>
                    </ul>
                    <div href="/">
                      <i className="fas fa-eye"></i>Views 50
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={`tab-pane fade show ${activeState === 1 ? "active" : ""}`}
          id="mange"
          role="tabpanel"
          aria-labelledby="mange-tab"
        >
          {/* {userData &&
            userData.saved.quesPosts.map((blog,i)=>{
              return <UserPost key={i} post={blog} userData={userData} />;
            })
          } */}
        </div>

        <div
          className="tab-pane fade show"
          id="mange"
          role="tabpanel"
          aria-labelledby="mange-tab"
        >
          <div className="posts-bar">
            <div className="post-bar bgclr">
              <div className="wordpressdevlp">
                <h2>Senior Wordpress Developer</h2>
                <p>
                  <i className="la la-clock-o"></i>Posted on 30 August 2018
                </p>
              </div>
              <br />
              <div className="row no-gutters">
                <div className="col-md-6 col-sm-12">
                  <div className="cadidatesbtn">
                    <button type="button" className="btn btn-primary">
                      <span className="badge badge-light">3</span>Candidates
                    </button>
                    <a href="/">
                      <i className="far fa-edit"></i>
                    </a>
                    <a href="/">
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="bk-links bklink">
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
              </div>
            </div>
          </div>
          <div className="posts-bar">
            <div className="post-bar bgclr">
              <div className="wordpressdevlp">
                <h2>Senior Php Developer</h2>
                <p>
                  <i className="la la-clock-o"></i> Posted on 29 August 2018
                </p>
              </div>
              <br />
              <div className="row no-gutters">
                <div className="col-md-6 col-sm-12">
                  <div className="cadidatesbtn">
                    <button type="button" className="btn btn-primary">
                      <span className="badge badge-light">3</span>Candidates
                    </button>
                    <a href="/">
                      <i className="far fa-edit"></i>
                    </a>
                    <a href="/">
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="bk-links bklink">
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
              </div>
            </div>
          </div>
          <div className="posts-bar">
            <div className="post-bar bgclr">
              <div className="wordpressdevlp">
                <h2>Senior UI UX Designer</h2>
                <div className="row no-gutters">
                  <div className="col-md-6 col-sm-12">
                    <p className="posttext">
                      <i className="la la-clock-o"></i>Posted on 5 June 2018
                    </p>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <p>
                      <i className="la la-clock-o"></i>Expiried on 5 October
                      2018
                    </p>
                  </div>
                </div>
              </div>
              <br />
              <div className="row no-gutters">
                <div className="col-md-6 col-sm-12">
                  <div className="cadidatesbtn">
                    <button type="button" className="btn btn-primary">
                      <span className="badge badge-light">3</span>Candidates
                    </button>
                    <a href="/">
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="bk-links bklink">
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
              </div>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="saved"
          role="tabpanel"
          aria-labelledby="saved-tab"
        >
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>Senior Wordpress Developer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Unsaved
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
              </div>
            </ul>
          </div>
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>Senior PHP Developer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Unsaved
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
              </div>
            </ul>
          </div>
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>UI UX Designer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Unsaved
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
              </div>
            </ul>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="applied"
          role="tabpanel"
          aria-labelledby="applied-tab"
        >
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>Senior Wordpress Developer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Applied
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
                <a href="/">
                  <i className="far fa-trash-alt"></i>
                </a>
              </div>
            </ul>
          </div>
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>Senior PHP Developer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Applied
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
                <a href="/">
                  <i className="far fa-trash-alt"></i>
                </a>
              </div>
            </ul>
          </div>
          <div className="post-bar">
            <div className="p-all saved-post">
              <div className="usy-dt">
                <div className="wordpressdevlp">
                  <h2>UI UX Designer</h2>
                  <p>
                    <i className="la la-clock-o"></i>Posted on 30 August 2018
                  </p>
                </div>
              </div>
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
            <ul className="savedjob-info saved-info">
              <li>
                <h3>Applicants</h3>
                <p>10</p>
              </li>
              <li>
                <h3>Job Type</h3>
                <p>Full Time</p>
              </li>
              <li>
                <h3>Salary</h3>
                <p>$600 - Mannual</p>
              </li>
              <li>
                <h3>Posted : 5 Days Ago</h3>
                <p>Open</p>
              </li>
              <div className="devepbtn saved-btn">
                <a className="clrbtn" href="/">
                  Applied
                </a>
                <a className="clrbtn" href="/">
                  Message
                </a>
                <a href="/">
                  <i className="far fa-trash-alt"></i>
                </a>
              </div>
            </ul>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="cadidates"
          role="tabpanel"
          aria-labelledby="cadidates-tab"
        >
          <div className="post-bar">
            <div className="post_topbar applied-post">
              <div className="usy-dt">
                <img src="images/resources/us-pic.png" alt="" />
                <div className="usy-name">
                  <h3>John Doe</h3>
                  <div className="epi-sec epi2">
                    <ul className="descp descptab bklink">
                      <li>
                        <img src="images/icon8.png" alt="" />
                        <span>Epic Coder</span>
                      </li>
                      <li>
                        <img src="images/icon9.png" alt="" />
                        <span>India</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                      Accept
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
              <div className="job_descp noborder">
                <div className="star-descp review profilecnd">
                  <ul className="bklik">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-half-o"></i>
                    </li>
                    <a href="/" title="">
                      5.0 of 5 Reviews
                    </a>
                  </ul>
                </div>
                <div className="devepbtn appliedinfo noreply">
                  <a className="clrbtn" href="/">
                    Accept
                  </a>
                  <a className="clrbtn" href="/">
                    View Profile
                  </a>
                  <a className="clrbtn" href="/">
                    Message
                  </a>
                  <a href="/">
                    <i className="far fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="post-bar">
            <div className="post_topbar  applied-post">
              <div className="usy-dt">
                <img src="images/resources/us-pic.png" alt="" />
                <div className="usy-name">
                  <h3>John Doe</h3>
                  <div className="epi-sec epi2">
                    <ul className="descp descptab bklink">
                      <li>
                        <img src="images/icon8.png" alt="" />
                        <span>Epic Coder</span>
                      </li>
                      <li>
                        <img src="images/icon9.png" alt="" />
                        <span>India</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                      Accept
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
              <div className="job_descp noborder">
                <div className="star-descp review profilecnd">
                  <ul className="bklik">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-half-o"></i>
                    </li>
                    <a href="/" title="">
                      5.0 of 5 Reviews
                    </a>
                  </ul>
                </div>
                <div className="devepbtn appliedinfo noreply">
                  <a className="clrbtn" href="/">
                    Accept
                  </a>
                  <a className="clrbtn" href="/">
                    View Profile
                  </a>
                  <a className="clrbtn" href="/">
                    Message
                  </a>
                  <a href="/">
                    <i className="far fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="post-bar">
            <div className="post_topbar applied-post">
              <div className="usy-dt">
                <img src="images/resources/us-pic.png" alt="" />
                <div className="usy-name">
                  <h3>John Doe</h3>
                  <div className="epi-sec epi2">
                    <ul className="descp descptab bklink">
                      <li>
                        <img src="images/icon8.png" alt="" />
                        <span>Epic Coder</span>
                      </li>
                      <li>
                        <img src="images/icon9.png" alt="" />
                        <span>India</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                      Accept
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
              <div className="job_descp noborder">
                <div className="star-descp review profilecnd">
                  <ul className="bklik">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-half-o"></i>
                    </li>
                    <a href="/" title="">
                      5.0 of 5 Reviews
                    </a>
                  </ul>
                </div>
                <div className="devepbtn appliedinfo noreply">
                  <a className="clrbtn" href="/">
                    Accept
                  </a>
                  <a className="clrbtn" href="/">
                    View Profile
                  </a>
                  <a className="clrbtn" href="/">
                    Message
                  </a>
                  <a href="/">
                    <i className="far fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
