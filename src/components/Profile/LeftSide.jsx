import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../api";

const LeftSide = ({userData, handelUploadDP}) => {
  return (
    <div className="main-left-sidebar">
      <div className="user_profile">
        <div className="user-pro-img">
          <img src={userData.image?baseURL+"/file/"+ userData.image:"/images/luser.jpg"} alt="" />
          <div className="add-dp" id="OpenImgUpload">
            <input type="file" id="file" onChange={(e) => handelUploadDP(e)}/>
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
        </div>
        <div className="suggestions-list">
          {userData.viewers.length>0? userData.viewers && userData.viewers.map((user,i)=>{
            return(<div className="suggestion-usd">
            <img src={user.image?baseURL+"/file/"+ user.image :"/images/luser.jpg"} alt="" />
            <Link to={`/user-profile/${user.username}`} target="_blank">
            <div className="sgt-text">
              <h4>{user.name}</h4>
              <span>{user.username}</span>
            </div>
            </Link>
          </div>)
          }):<div style={{textAlign:"center"}}>No one has viewed </div>}
          {/* {userData?.viewers.length>0 &&
          <div className="view-more">
            <a href="/" title="">
              View More
            </a>
          </div>} */}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
