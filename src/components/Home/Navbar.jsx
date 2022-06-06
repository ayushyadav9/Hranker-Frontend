import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../api";
import Notifications from "./Popups/Notifications";

const Navbar = ({ userData, setresetPost }) => {
  const navigate = useNavigate();
  
  const [SideNav, setSideNav] = useState(false)
  const [isNotiOpen, setisNotiOpen] = useState(false);
  const [isUserOpen, setisUserOpen] = useState(false);
  const [notis, setnotis] = useState(null);
  useEffect(() => {
    if (userData) {
      setnotis(userData.notifications);
    }
  }, [userData]);

  const handelLogout = () => {
    setisNotiOpen(false);
    setisUserOpen(false);
    localStorage.removeItem("userJWT");
    navigate("/sign-in");
  };
  const handelRedirect = (url)=>{
    setisUserOpen(false)
    navigate(url)
  }

  return (
    <>
      {userData !== null ? (
        <header>
          <div className="container">
            <div className="header-data">
              <div className="logo">
                <a href="index.html" title="">
                  <img src="images/logonav.png" alt="" />
                </a>
              </div>
              <div className="search-bar">
                <form>
                  <input type="text" name="search" placeholder="Search..." />
                  <button type="submit">
                    <i className="la la-search"></i>
                  </button>
                </form>
              </div>
              <nav className={SideNav?"active":""}>
                <ul>
                  <li>
                    <Link to="/">
                      <div title="">
                        <span>
                          <img src="images/icon1.png" alt="" />
                        </span>
                        Home
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div title="">
                      <span>
                        <img src="images/icon2.png" alt="" />
                      </span>
                      Companies
                    </div>
                    <ul>
                      <li>
                        <a href="companies.html" title="">
                          Companies
                        </a>
                      </li>
                      <li>
                        <a href="company-profile.html" title="">
                          Company Profile
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div title="">
                      <span>
                        <img src="images/icon3.png" alt="" />
                      </span>
                      Projects
                    </div>
                  </li>
                  <li>
                    <div title="">
                      <span>
                        <img src="images/icon4.png" alt="" />
                      </span>
                      Profiles
                    </div>
                    <ul>
                      <li>
                        <a href="user-profile.html" title="">
                          User Profile
                        </a>
                      </li>
                      <li>
                        <a href="my-profile-feed.html" title="">
                          my-profile-feed
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div title="">
                      <span>
                        <img src="images/icon5.png" alt="" />
                      </span>
                      Jobs
                    </div>
                  </li>
                  <li>
                    <div title="" className="not-box-openm">
                      <span>
                        <img src="images/icon6.png" alt="" />
                      </span>
                      Messages
                    </div>
                    <div className="notification-box msg" id="message">
                      <div className="nt-title">
                        <h4>Setting</h4>
                        <a href="/" title="">
                          Clear all
                        </a>
                      </div>
                      <div className="nott-list">
                        <div className="notfication-details">
                          <div className="noty-user-img">
                            <img src="images/resources/ny-img1.png" alt="" />
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
                            <img src="images/resources/ny-img2.png" alt="" />
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
                            <img src="images/resources/ny-img3.png" alt="" />
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
                        setisUserOpen(false);
                        setisNotiOpen((pre) => !pre);
                      }}
                      title=""
                      className="not-box-open"
                    >
                      <span>
                        <img src="images/icon7.png" alt="" />
                      </span>
                      Notification
                    </div>
                    <Notifications
                      setresetPost={setresetPost}
                      notis={notis}
                      setnotis={setnotis}
                      setisNotiOpen={setisNotiOpen}
                      isNotiOpen={isNotiOpen}
                    />
                  </li>
                </ul>
              </nav>
              <div className="menu-btn">
                <div title="" onClick={()=>setSideNav(pre=>!pre)}>
                  <i className="fa fa-bars"></i>
                </div>
              </div>
              <div className="user-account">
                <div
                  onClick={() => {
                    setisNotiOpen(false);
                    setisUserOpen((pre) => !pre);
                  }}
                  className="user-info"
                >
                  {userData.image ? (
                    <img src={baseURL+"/file/"+ userData.image} alt="" />
                  ) : (
                    <div className="dummy-img">{userData.name.charAt(0)}</div>
                  )}

                  <div className="username" href="/" title="">
                    {userData.name.split(" ")[0]}
                  </div>
                  <i
                    className="la la-sort-down"
                    style={{ marginTop: "-2px" }}
                  ></i>
                </div>
                <div
                  className={`user-account-settingss ${isUserOpen && "active"}`}
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
                  <h3>Custom Status</h3>
                  <div className="search_form">
                    <form>
                      <input type="text" name="search" />
                      <button type="submit">Ok</button>
                    </form>
                  </div>
                  <h3>Setting</h3>
                  <ul className="us-links">
                    <li>
                      <div onClick={()=>handelRedirect("/profile")} title="">
                        Show Profile
                      </div>
                    </li>
                    <li>
                      <div onClick={()=>handelRedirect("/")} title="">
                        Privacy
                      </div>
                    </li>
                    <li>
                      <div onClick={()=>handelRedirect("/")} title="">
                        Faqs
                      </div>
                    </li>
                    <li>
                      <div onClick={()=>handelRedirect("/")} title="">
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
                  <img src="images/logonav.png" alt="" />
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
