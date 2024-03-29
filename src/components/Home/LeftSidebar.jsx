import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../api";
import { useSelector } from "react-redux";
import { userRank } from "../../utils/timeCalculator";

const LeftSidebar = () => {
  let { userData, points } = useSelector((state) => state.user);
  let { topUsers } = useSelector((state) => state.leaderBoard);

  return (
    <div className="col-lg-3 col-md-4 pd-left-none no-pd">
      <div className="main-left-sidebar no-margin">
        <div className="user-data full-width">
          <div className="user-profile">
            <div className="username-dt">
              <div className="usr-pic">
                <img
                  src={
                    userData.image
                      ? baseURL + "/file/" + userData.image
                      : "/images/luser.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="user-specs">
              <h3>{userData.name}</h3>
              <span>({userData.username})</span>
              <h2>{points} Points</h2>
            </div>
          </div>
          <ul className="user-fw-status">
            <div>
              <li>
                <h4>Following</h4>
                <span>
                  {userData.following ? userData.following.length : 0}
                </span>
              </li>
              <li>
                <h4>Followers</h4>
                <span>
                  {userData.followers ? userData.followers.length : 0}
                </span>
              </li>
            </div>
            <li>
              <Link to="/profile" title="">
                View Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="suggestions full-width">
          <div className="sd-title">
            <h3>Top Users</h3>
            {/* <i className="la la-ellipsis-v"></i> */}
          </div>
          <div className="suggestions-list">
            {topUsers &&
              topUsers.slice(0, Math.min(3, topUsers.length)).map((item, i) => {
                return (
                  <div key={i} className="suggestion-usd">
                    <img
                      style={{height:"30px"}}
                      src={`${
                        item.image
                          ? baseURL + "/file/" + item.image
                          : "/images/luser.jpg"
                      }`}
                      alt=""
                    />
                    <div className="sgt-text">
                      <>
                      <Link  to={`/user-profile/${item.username}`} target="_blank">
                        <h4>{item.name.split(" ")[0]}</h4>
                      </Link>
                      </>
                      <span>({item.username})</span>
                    </div>
                    <span>
                      {userRank(i + 1)}
                      {/* <img src="/images/first.png" alt="/" /> */}
                      {item.heighestPoints}
                    </span>
                  </div>
                );
              })}

            <div className="view-more">
              <Link to="/leaderboard" title="">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

        <div className="tags-sec full-width">
          <ul>
            <li>
              <a href="/" title="">
                Help Center
              </a>
            </li>
            <li>
              <a href="/" title="">
                About
              </a>
            </li>
            <li>
              <a href="/" title="">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" title="">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="/" title="">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="/" title="">
                Career
              </a>
            </li>
            <li>
              <a href="/" title="">
                Language
              </a>
            </li>
            <li>
              <a href="/" title="">
                Copyright Policy
              </a>
            </li>
          </ul>
          <div className="cp-sec">
            <img src="images/logo.png" alt="" />
            <p>
              <img src="images/cp.png" alt="" />
              Copyright 2019
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
