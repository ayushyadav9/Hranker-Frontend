import React from "react";
import { baseURL } from "../../api";

const LeftSide = ({userData}) => {
  return (
    <div className="main-left-sidebar">
      <div className="user_profile">
        <div className="user-pro-img">
          <img src={userData.image?baseURL+"/file/"+ userData.image:"https://assets.leetcode.com/users/avatars/avatar_1654408436.png"} alt="" />
          <div className="add-dp" id="OpenImgUpload">
            <input type="file" id="file" />
            <label for="file">
              <i className="fas fa-camera"></i>
            </label>
          </div>
        </div>
        <div className="user_pro_status">
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
        {/* <ul className="social_links">
          <li>
            <a href="/" title="">
              <i className="la la-globe"></i> www.example.com
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-facebook-square"></i>
              Http://www.facebook.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-twitter"></i>
              Http://www.Twitter.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-google-plus-square"></i>
              Http://www.googleplus.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-behance-square"></i>
              Http://www.behance.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-pinterest"></i>
              Http://www.pinterest.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-instagram"></i>
              Http://www.instagram.com/john...
            </a>
          </li>
          <li>
            <a href="/" title="">
              <i className="fa fa-youtube"></i>
              Http://www.youtube.com/john...
            </a>
          </li>
        </ul> */}
      </div>
      <div className="suggestions full-width">
        <div className="sd-title">
          <h3>People Viewed Profile</h3>
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
  );
};

export default LeftSide;
