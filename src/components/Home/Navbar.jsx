import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api";
import Notifications from "./Popups/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/userReducers";
import {
  closeAll,
  toggleMessage,
  toggleNoti,
  toggleUser,
} from "../../redux/reducers/navReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { userData,isLoggedIn } = useSelector((state) => state.user);
  let { userPopup, messagePopup } = useSelector((state) => state.nav );
  const [SideNav, setSideNav] = useState(false);
  const [userInput, setuserInput] = useState("")

  const handelLogout = () => {
    dispatch(closeAll());
    localStorage.removeItem("userJWT");
    dispatch(logOut());
    navigate("/sign-in");
  };
  const handelRedirect = (url) => {
    dispatch(closeAll());
    navigate(url);
  };

  const handelSearchUser = (e) =>{
    e.preventDefault();
    dispatch(closeAll());
    navigate(`user-profile/${userInput}`)
  }

  return (
    <>
      {isLoggedIn ? (
        <header>
          <div className="container">
            <div className="header-data">
              <div onClick={()=>handelRedirect("/")} className="logo">
                  <img src="/images/navLogo.png" alt="" />
              </div>
              <div className="search-bar">
                {/* <form>
                  <input type="text" name="search" placeholder="Search..." />
                  <button type="submit">
                    <i className="la la-search"></i>
                  </button>
                </form> */}
              </div>
              <nav className={SideNav ? "active" : ""}>
                <ul>
                  <li>
                      <div onClick={()=>handelRedirect("/")} title="">
                        <span>
                          <img src="/images/house-solid.svg" alt="" />
                        </span>
                        <span>Home</span>
                      </div>
                  </li>
                  <li>
                    <div title="">
                      <span>
                        <img src="/images/leaderboard.svg" alt="" />
                      </span>
                      <span>Leaderboard</span>
                    </div>
                  </li>
                  <li>
                    <div onClick={()=>handelRedirect("/points")} title="">
                      <span>
                        <img src="/images/coins.svg" alt="" />
                      </span>
                      <span>Points</span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        dispatch(toggleMessage());
                      }}
                      title=""
                      className="not-box-openm"
                    >
                      <span>
                        <img src="/images/message.svg" alt="" />
                      </span>
                      <span>Messages</span>
                    </div>
                    <div
                      className={`notification-box msg ${
                        messagePopup ? "active" : ""
                      }`}
                      id="message"
                    >
                      <div className="nt-title">
                        <h4>Setting</h4>
                        <a href="/" title="">
                          Clear all
                        </a>
                      </div>
                      <div className="nott-list">
                        <div className="notfication-details">
                          <div className="noty-user-img">
                            <img src="/images/resources/ny-img1.png" alt="" />
                          </div>
                          <div className="notification-info">
                            <h3>
                              <a href="messages.html" title="">
                                Jassica William
                              </a>{" "}
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do.
                            </p>
                            <span>2 min ago</span>
                          </div>
                        </div>
                        <div className="notfication-details">
                          <div className="noty-user-img">
                            <img src="/images/resources/ny-img2.png" alt="" />
                          </div>
                          <div className="notification-info">
                            <h3>
                              <a href="messages.html" title="">
                                Jassica William
                              </a>
                            </h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <span>2 min ago</span>
                          </div>
                        </div>
                        <div className="notfication-details">
                          <div className="noty-user-img">
                            <img src="/images/resources/ny-img3.png" alt="" />
                          </div>
                          <div className="notification-info">
                            <h3>
                              <a href="messages.html" title="">
                                Jassica William
                              </a>
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempo incididunt
                              ut labore et dolore magna aliqua.
                            </p>
                            <span>2 min ago</span>
                          </div>
                        </div>
                        <div className="view-all-nots">
                          <a href="messages.html" title="">
                            View All Messsages
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        dispatch(toggleNoti());
                      }}
                      title=""
                      className="not-box-open"
                    >
                      <span>
                        <img src="/images/noti.svg" alt="" />
                      </span>
                      <span>Notification</span>
                    </div>
                    <Notifications/>
                  </li>
                </ul>
              </nav>
              <div className="menu-btn">
                <div title="" onClick={() => setSideNav((pre) => !pre)}>
                  <i className="fa fa-bars"></i>
                </div>
              </div>
              <div className="user-account">
                <div
                  onClick={() => {
                    dispatch(toggleUser());
                  }}
                  className="user-info"
                >
                  {userData.image ? (
                    <img src={baseURL + "/file/" + userData.image} alt="" />
                    ) : (
                      <img src="/images/user.svg" alt="" />
                      // <div className="dummy-img">{userData.name.charAt(0)}</div>
                  )}

                  <div className="username" href="/" title="">
                    {userData.name.split(" ")[0]}
                  </div>
                  <i
                    className="la la-sort-down"
                  ></i>
                </div>
                <div
                  className={`user-account-settingss ${userPopup && "active"}`}
                  id="users"
                >
                  {/*<h3>Online Status</h3>
                   <ul className="on-off-status">
                    <li>
                      <div className="fgt-sec">
                        <input type="radio" name="cc" id="c5" />
                        <label htmlFor="c5">
                          <span></span>
                        </label>
                        <small>Online</small>
                      </div>
                    </li>
                    <li>
                      <div className="fgt-sec">
                        <input type="radio" name="cc" id="c6" />
                        <label htmlFor="c6">
                          <span></span>
                        </label>
                        <small>Offline</small>
                      </div>
                    </li>
                  </ul> */}
                  <h3>Search User</h3>
                  <div className="search_form">
                    <form>
                      <input type="text" value={userInput} onChange={(e)=>setuserInput(e.target.value)} name="search" />
                      <button type="submit" onClick={handelSearchUser}>Search</button>
                    </form>
                  </div>
                  <h3>Setting</h3>
                  <ul className="us-links">
                    <li>
                      <div onClick={() => handelRedirect("/profile")} title="">
                        Show Profile
                      </div>
                    </li>
                    <li>
                      <div onClick={() => handelRedirect("/")} title="">
                        Privacy
                      </div>
                    </li>
                    <li>
                      <div onClick={() => handelRedirect("/")} title="">
                        Faqs
                      </div>
                    </li>
                    <li>
                      <div onClick={() => handelRedirect("/")} title="">
                        Terms & Conditions
                      </div>
                    </li>
                  </ul>
                  <h3 className="tc">
                    <div onClick={handelLogout} title="">
                      Logout
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header>
          <div className="container">
            <div className="header-data">
              <div className="logo pd-btm">
                <a href="index.html" title="">
                  <img src="/images/logonav.png" alt="" />
                </a>
              </div>
              <div className="forum-bar">
                <h2>Forum</h2>
                <ul>
                  <li>
                    <a href="/" title="">
                      Tags
                    </a>
                  </li>
                  <li>
                    <a href="/" title="">
                      Users
                    </a>
                  </li>
                  <li>
                    <a href="/" title="" className="ask-question">
                      Ask a question
                    </a>
                  </li>
                </ul>
              </div>
              <div className="login_register">
                <ul>
                  <li>
                    <a href="sign-in.html" title="">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="sign-in.html" title="">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
              <div className="search-bar st2">
                <form>
                  <input type="text" name="search" placeholder="Search..." />
                  <button type="submit">
                    <i className="la la-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
