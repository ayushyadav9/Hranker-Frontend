import React, { useState } from "react";
import { baseURL } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/ApiCalls";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";


const LeftSide = ({ searchedUserData }) => {
  let { userToken,userData } = useSelector((state)=>state.user)

  let dispatch = useDispatch()
  const [isFollowed, setisFollowed] = useState(false)
  const navigate= useNavigate()
  const [isMesLoading, setisMesLoading] = useState(false)

  const handelStartConvo = () =>{
    setisMesLoading(true)
    fetch(`${baseURL}/chat/addConversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ senderId: userData?._id, receiverId: searchedUserData?._id})
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setisMesLoading(false)
          if (result.success) {
            navigate("/chat")
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    if(userData){
      if(userData.following.filter((item)=>item===searchedUserData._id).length>0){
        setisFollowed(true)
      }else{
        setisFollowed(false)
      }
    }
  }, [searchedUserData,userData])
  

  const handelFollow = ()=>{
    let data = {
      token: userToken,
      username: searchedUserData.username
    }
    if(isFollowed){
      dispatch(unfollowUser(data))
    }else{
      dispatch(followUser(data))
    }
  }

  return (
    <div className="main-left-sidebar">
      <div className="user_profile">
        <div className="user-pro-img">
          <img
            src={
              searchedUserData.image
                ? baseURL + "/file/" + searchedUserData.image
                : "/images/luser.jpg"
            }
            alt=""
          />
        </div>
        <div className="user_pro_status">
          <div>{searchedUserData.heighestPoints} Points</div>
          <ul className="flw-hr">
            <li>
              <div onClick = {handelFollow}  title="" className="flww">
                <i className={`la la-${isFollowed?"check":"plus"}`}></i> {isFollowed?"UnFollow":"Follow"}
              </div>
            </li>
            <li>
              <div onClick={handelStartConvo} title="" className="hre">
                {isMesLoading?"Loading...": "Message"}
              </div>
            </li>
          </ul>
          <ul className="flw-status">
            <li>
              <span>Following</span>
              <b>{searchedUserData.following ? searchedUserData.following.length : 0}</b>
            </li>
            <li>
              <span>Followers</span>
              <b>{searchedUserData.followers ? searchedUserData.followers.length : 0}</b>
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
