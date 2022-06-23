import React from "react";
import { baseURL } from "../../api";

const LeftSide = ({userData}) => {
  return (
    <div className="main-left-sidebar">
      <div className="user_profile">
        <div className="user-pro-img">
          <img src={userData.image?baseURL+"/file/"+ userData.image:"/images/luser.jpg"} alt="" />
          <div className="add-dp" id="OpenImgUpload">
            <input type="file" id="file" />
            <label htmlFor="file">
              <i className="fas fa-camera"></i>
            </label>
          </div>
        </div>
        <div className="user_pro_status">
          <div>
            {userData.points} Points
          </div>
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
      <div className="suggestions full-width">
        <div className="sd-title">
          <h3>People Viewed Profile</h3>
          <i className="la la-ellipsis-v"></i>
        </div>
        <div className="suggestions-list">
          {userData.viewers && userData.viewers.map((user,i)=>{
            return(<div className="suggestion-usd">
            <img src={user.image?baseURL+"/file/"+ user.image :"/images/luser.jpg"} alt="" />
            <div className="sgt-text">
              <h4>{user.name}</h4>
              <span>{user.username}</span>
            </div>
            <span>
              <i className="la la-plus"></i>
            </span>
          </div>)
          })}
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
