import React from "react";
import { baseURL } from "../../api";

const LeftSidebar = ({userData}) => {
  return (
    <div className="col-lg-3 col-md-4 pd-left-none no-pd">
      <div className="main-left-sidebar no-margin">
        {/* User details */}
        <div className="user-data full-width">
          <div className="user-profile">
            <div className="username-dt">
              <div className="usr-pic">
                <img src={userData.image?baseURL+"/file/"+ userData.image:"images/user.png"} alt="" />
                {/* <img src="images/resources/user-pic.png" alt="" /> */}
              </div>
            </div>
            <div className="user-specs">
              <h3>{userData.name}</h3>
              {/* <h3>sads</h3> */}
              <span>{userData.about? userData.about: "No bio yet"}</span>
            </div>
          </div>
          <ul className="user-fw-status">
            <li>
              <h4>Following</h4>
              <span>34</span>
            </li>
            <li>
              <h4>Followers</h4>
              <span>155</span>
            </li>
            <li>
              <a href="my-profile-feed.html" title="">
                View Profile
              </a>
            </li>
          </ul>
        </div>

        <div className="suggestions full-width">
          <div className="sd-title">
            <h3>Suggestions</h3>
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
                <span>C & C++ Developer</span>
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
