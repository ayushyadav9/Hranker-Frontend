import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api";
import Notifications from "./Popups/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/userReducers";
import { Link } from "react-router-dom";
import {
  closeAll,
  toggleMessage,
  toggleNoti,
  toggleUser,
} from "../../redux/reducers/navReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notiRef = useRef();
  const messageRef = useRef();
  const userRef = useRef();
  const userRef2 = useRef();
  let { userData, isLoggedIn } = useSelector((state) => state.user);
  let { userPopup, messagePopup } = useSelector((state) => state.nav);
  const [SideNav, setSideNav] = useState(false);
  const [userInput, setuserInput] = useState("");

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        !messageRef.current.contains(e.target) &&
        !notiRef.current.contains(e.target) &&
        !userRef.current.contains(e.target) &&
        !userRef2.current.contains(e.target)
      ) {
        dispatch(closeAll());
      }
    });
    // eslint-disable-next-line
  }, []);

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

  const handelSearchUser = (e) => {
    e.preventDefault();
    dispatch(closeAll());
    navigate(`user-profile/${userInput}`);
  };

  return (
    <>
      {isLoggedIn && userData ? (
        <header>
          <div className="container">
            <div className="header-data">
              <div onClick={() => handelRedirect("/")} className="logo">
                <img src="/images/navLogo.png" alt="" />
              </div>
              <div className="search-bar"></div>
              <div className="user-account">
                <div
                  ref={userRef}
                  onClick={() => {
                    dispatch(toggleUser());
                  }}
                  className="user-info"
                >
                  {userData.image ? (
                    <img src={baseURL + "/file/" + userData.image} alt="" />
                  ) : (
                    <img src="/images/user.svg" alt="" />
                  )}

                  <div className="username" href="/" title="">
                    {userData.name.split(" ")[0]}
                  </div>
                  <i className="la la-sort-down"></i>
                </div>
                <div
                  ref={userRef2}
                  className={`user-account-settingss ${userPopup && "active"}`}
                  id="users"
                >
                  <h3>Search User</h3>
                  <div className="search_form">
                    <form>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setuserInput(e.target.value)}
                        name="search"
                      />
                      <button type="submit" onClick={handelSearchUser}>
                        Search
                      </button>
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
              <nav className={SideNav ? "active" : ""}>
                <ul>
                  <li>
                    <div onClick={() => handelRedirect("/")} title="">
                      <span>
                        <img src="/images/house-solid.svg" alt="" />
                      </span>
                      <span>Home</span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => handelRedirect("/leaderboard")}
                      title=""
                    >
                      <span>
                        <img src="/images/leaderboard.svg" alt="" />
                      </span>
                      <span>Leaderboard</span>
                    </div>
                  </li>
                  <li>
                    <div onClick={() => handelRedirect("/points")} title="">
                      <span>
                        <img src="/images/coins.svg" alt="" />
                      </span>
                      <span>Points</span>
                    </div>
                  </li>
                  <li>
                    <div
                      ref={messageRef}
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
                      ref={notiRef}
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
                    <Notifications />
                  </li>
                </ul>
              </nav>
              <div className="menu-btn">
                <div title="" onClick={() => setSideNav((pre) => !pre)}>
                  <i className="fa fa-bars"></i>
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
                <Link to="/" title="">
                  <img src="/images/navLogo.png" alt="" />
                </Link>
              </div>
              {/* <div className="forum-bar">
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
              </div> */}
              <div className="login_register">
                <ul>
                  <li>
                    <a href="/sign-in" title="">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/sign-up" title="">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
              <div className="search-bar st2">
                {/* <form>
                  <input type="text" name="search" placeholder="Search..." />
                  <button type="submit">
                    <i className="la la-search"></i>
                  </button>
                </form> */}
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
