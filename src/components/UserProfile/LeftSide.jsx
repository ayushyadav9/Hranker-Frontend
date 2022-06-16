import React from "react";
import { baseURL } from "../../api";

const LeftSide = ({ userData }) => {
  return (
    <div className="main-left-sidebar">
      <div className="user_profile">
        <div className="user-pro-img">
          <img
            src={
              userData.image
                ? baseURL + "/file/" + userData.image
                : "/images/luser.jpg"
            }
            alt=""
          />
        </div>
        <div className="user_pro_status">
          <div>{userData.points} Points</div>
          <ul className="flw-hr">
            <li>
              <a href="/" title="" className="flww">
                <i className="la la-plus"></i> Follow
              </a>
            </li>
            <li>
              <a href="/" title="" className="hre">
                Message
              </a>
            </li>
          </ul>
          <ul className="flw-status">
            <li>
              <span>Following</span>
              <b>{userData.following ? userData.following.length : 0}</b>
            </li>
            <li>
              <span>Followers</span>
              <b>{userData.followers ? userData.followers.length : 0}</b>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="suggestions full-width">
        <div className="sd-title">
          <h3>People Viewed Profile</h3>
          <i className="la la-ellipsis-v"></i>
        </div>
        <div className="suggestions-list">
          <div className="suggestion-usd">
            <img src="/images/resources/s1.png" alt="" />
            <div className="sgt-text">
              <h4>Jessica William</h4>
              <span>Graphic Designer</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>
          <div className="suggestion-usd">
            <img src="/images/resources/s2.png" alt="" />
            <div className="sgt-text">
              <h4>John Doe</h4>
              <span>PHP Developer</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>
          <div className="suggestion-usd">
            <img src="/images/resources/s3.png" alt="" />
            <div className="sgt-text">
              <h4>Poonam</h4>
              <span>Wordpress Developer</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>
          <div className="suggestion-usd">
            <img src="/images/resources/s4.png" alt="" />
            <div className="sgt-text">
              <h4>Bill Gates</h4>
              <span>C &amp; C++ Developer</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>
          <div className="suggestion-usd">
            <img src="/images/resources/s5.png" alt="" />
            <div className="sgt-text">
              <h4>Jessica William</h4>
              <span>Graphic Designer</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>
          <div className="suggestion-usd">
            <img src="/images/resources/s6.png" alt="" />
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
      </div> */}
    </div>
  );
};

export default LeftSide;
