import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromExam, removeFromSubject } from "../../redux/reducers/navReducer";

const RightSidebar = () => {
  const dispatch = useDispatch()
  let  { topPosts } = useSelector((state)=>state.leaderBoard);
  let  { selectedExams, selectedSubjects } = useSelector((state)=>state.nav);

  return (
    <div className="col-lg-3 pd-right-none no-pd">
      <div className="right-sidebar">
        {(selectedExams.length>0 || selectedSubjects.length>0) && <div className="widget widget-filter">
          <div className="sd-title">
            <h3>Filters</h3>
          </div>
          <ul className="filters">
            {selectedExams.map((item, i) => {
              return (
                <li key={i}>
                  <div>
                    {item}
                    <i onClick={()=>dispatch(removeFromExam(item))} className="la la-close"></i>
                  </div>
                </li>
              );
            })}
            {selectedSubjects.map((item, i) => {
              return (
                <li key={i}>
                  <div>
                    {item}
                    <i onClick={()=>dispatch(removeFromSubject(item))} className="la la-close"></i>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>}
        <div className="widget widget-about">
          <img src="images/logonav.png" alt="" />
          <h3>When community comes unity</h3>
          <span>Be a part of High Ranker Community</span>
          <div className="sign_link">
            <h3>
              <a href="/sign-up" title="">
                Sign up
              </a>
            </h3>
            <Link to="/" title="">
              Learn More
            </Link>
          </div>
        </div>
        <div className="widget widget-jobs">
          <div className="sd-title">
            <h3>Top Posts</h3>
            <i className="la la-ellipsis-v"></i>
          </div>
          <div className="jobs-list">
            {topPosts &&
              topPosts.slice(0, Math.min(6, topPosts.length)).map((post, i) => {
                return (
                  <div className="job-info">
                    <div className="job-details">
                      <Link
                        to={`/${post.type === 1 ? "post" : "quesPost"}/${
                          post.slug
                        }`}
                        target="_blank"
                      >
                        <h3>{post.title}</h3>
                      </Link>
                      <p>
                        <span style={{ fontWeight: 300 }}>by</span>
                        <Link
                          to={`/user-profile/${post?.user?.username}`}
                          target="_blank"
                        >
                          {" "}
                          {post.user.username}
                        </Link>
                      </p>
                    </div>
                    <div className="post-rate">
                      <span>
                        <ul>
                          <li >
                            <i style={{color:"#53D690"}} className="fa fa-heart"></i>
                            <span>{post.likers.length}</span>
                          </li>
                          <li >
                            <i style={{color:"#E44D3A"}} className="fa fa-comment"></i>
                            <span>{post.comments.length}</span>
                          </li>
                          <li >
                            <i style={{color:"#00B540"}} className="fa fa-eye"></i>
                            <span>
                              {post.viewers ? post.viewers.length : 0}
                            </span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                );
              })}
            {/* <div className="view-more">
              <Link to="/" title="">
                View More
              </Link>
            </div> */}
          </div>
        </div>
        <div className="widget filter-secs">
          <div className="filter-heading">
            <h3>Filters</h3>
            <a href="/" title="">
              Clear all filters
            </a>
          </div>
          <div className="paddy">
            <div className="filter-dd">
              <div className="filter-ttl">
                <h3>Skills</h3>
                <a href="/" title="">
                  Clear
                </a>
              </div>
              <form>
                <input
                  type="text"
                  name="search-skills"
                  placeholder="Search skills"
                />
              </form>
            </div>
            <div className="filter-dd">
              <div className="filter-ttl">
                <h3>Post Type</h3>
                <a href="/" title="">
                  Clear
                </a>
              </div>
              <ul className="avail-checks">
                <li>
                  <input type="radio" name="cc" id="c1" />
                  <label htmlFor="c1">
                    <span></span>
                  </label>
                  <small>Blog</small>
                </li>
                <li>
                  <input type="radio" name="cc" id="c2" />
                  <label htmlFor="c2">
                    <span></span>
                  </label>
                  <small>Questions</small>
                </li>
              </ul>
            </div>
            <div className="filter-dd">
              <div className="filter-ttl">
                <h3>Field</h3>
                <a href="/" title="">
                  Clear
                </a>
              </div>
              <form className="job-tp">
                <select>
                  <option>SSC</option>
                  <option>Railways</option>
                  <option>Dehli Police</option>
                </select>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </form>
            </div>
            <div className="filter-dd">
              <div className="filter-ttl">
                <h3>Experience Level</h3>
                <a href="/" title="">
                  Clear
                </a>
              </div>
              <form className="job-tp">
                <select>
                  <option>Select a experience level</option>
                  <option>All</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </form>
            </div>
            <div className="filter-dd">
              <div className="filter-ttl">
                <h3>Countries</h3>
                <a href="/" title="">
                  Clear
                </a>
              </div>
              <form className="job-tp">
                <select>
                  <option>Select a country</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Russia</option>
                </select>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </form>
            </div>
          </div>
        </div>
        <div className="widget suggestions full-width">
          <div className="sd-title">
            <h3>Most Viewed People</h3>
            <i className="la la-ellipsis-v"></i>
          </div>
          <div className="suggestions-list">
            <div className="suggestion-usd">
              <img src="images/resources/s1.png" alt="" />
              <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="suggestion-usd">
              <img src="images/resources/s2.png" alt="" />
              <div className="sgt-text">
                <h4>John Doe</h4>
                <span>PHP Developer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="suggestion-usd">
              <img src="images/resources/s3.png" alt="" />
              <div className="sgt-text">
                <h4>Poonam</h4>
                <span>Wordpress Developer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="suggestion-usd">
              <img src="images/resources/s4.png" alt="" />
              <div className="sgt-text">
                <h4>Bill Gates</h4>
                <span>C &amp; C++ Developer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="suggestion-usd">
              <img src="images/resources/s5.png" alt="" />
              <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="suggestion-usd">
              <img src="images/resources/s6.png" alt="" />
              <div className="sgt-text">
                <h4>John Doe</h4>
                <span>PHP Developer</span>
              </div>
              <span>
                <i className="la la-plus"></i>
              </span>
            </div>
            <div className="view-more">
              <a href="/" title="">
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
