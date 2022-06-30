import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api";
import Notifications from "./Popups/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/userReducers";
import { Link } from "react-router-dom";
import {
  addToExam,
  addToSubject,
  closeAll,
  // toggleMessage,
  toggleNoti,
  toggleSearch,
  toggleUser,
} from "../../redux/reducers/navReducer";
import { defaultTags, subjects } from "../../utils/defaultTags";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notiRef = useRef();
  // const messageRef = useRef();
  const userRef = useRef();
  const userRef2 = useRef();
  const searchRef = useRef();
  let { userData, isLoggedIn } = useSelector((state) => state.user);
  let { userPopup, messagePopup,searchPopup, selectedExams,selectedSubjects } = useSelector((state) => state.nav);
  const [SideNav, setSideNav] = useState(false);
  const [userInput, setuserInput] = useState("");
  // const [selectedExams, setselectedExams] = useState([])
  // const [selectedSubjects, setselectedSubjects] = useState([])
  const [searchPostText, setsearchPostText] = useState("");
  const [filteredExam, setfilteredExam] = useState(defaultTags);
  const [filteredSubjects, setfilteredSubjects] = useState(subjects);
  // const [searchPopup, setsearchPopup] = useState(false)

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        // !messageRef.current.contains(e.target) &&
        !notiRef.current.contains(e.target) &&
        !userRef.current.contains(e.target) &&
        !userRef2.current.contains(e.target) &&
        !searchRef.current.contains(e.target)
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
  const handelSearchPopup = ()=>{
    dispatch(toggleSearch())
  }

  const handelSearchFilter = (e)=>{
    let text = e.target.value
    setsearchPostText(text);
    const newSubs = subjects.filter((value) => {
      return value.name.toLowerCase().includes(text.toLowerCase());
    });
    const newExams = defaultTags.filter((value) => {
      return value.name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setfilteredSubjects(subjects)
      setfilteredExam(defaultTags)
    } else {
      setfilteredSubjects(newSubs);
      setfilteredExam(newExams)
    }

  }

  const handelExam = (tExam)=>{
    // let t = [...new Set([...selectedExams, tExam])];
    dispatch(addToExam(tExam))
    // t = t.join(" ")
    // let prevSubs = selectedSubjects.join(" ")
    // setSearchParams({"exam": t,"subject":prevSubs}) 
    dispatch(toggleSearch())     
  }

  const handelSubject = (tSubject)=>{
    // let t = [...new Set([...selectedSubjects, tSubject])];
    dispatch(addToSubject(tSubject))
    // t = t.join(" ")
    // let prevExams = selectedExams.join(" ")
    // setSearchParams({"exam": prevExams,"subject":t}) 
    dispatch(toggleSearch())     
  }

  return (
    <>
      {isLoggedIn && userData ? (
        <header>
          <div className="container">
            <div className="header-data">
              <div onClick={() => handelRedirect("/")} className="logo">
                <img src="/images/navLogo.png" alt="" />
              </div>
              <div ref={searchRef} class="search-bar">
                <form>
                  <input
                    type="text"
                    value={searchPostText}
                    onChange={handelSearchFilter}
                    placeholder="Search for Exams or Subjects..."
                    onClick={handelSearchPopup}
                  />
                  {/* <button type="submit">
                    <img src="/images/search.svg" alt=""></img>
                  </button> */}
                </form>
                <div
                  className={`search-bar-popup ${searchPopup ? "active" : ""}`}
                >
                  {filteredExam && filteredExam.length > 0 && (
                    <>
                      <h3>Exams </h3>
                      <ul className="tags">
                        {filteredExam.map((tag, i) => {
                          return (
                            <li className={`${selectedExams.includes(tag.name)?"active-tag":""}`} key={i} onClick={()=>handelExam(tag.name)}>
                              <div title="">{tag.name}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {filteredSubjects && filteredSubjects.length > 0 && (
                    <>
                      <h3>Subjects</h3>
                      <ul className="tags">
                        {filteredSubjects.map((sub, i) => {
                          return (
                            <li className={`${selectedSubjects.includes(sub.name)?"active-tag":""}`} key={i} onClick={()=>handelSubject(sub.name)}>
                              <div title="">{sub.name}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
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
                      // ref={messageRef}
                      // onClick={() => {
                      //   dispatch(toggleMessage());
                      // }}
                      title=""
                      className="not-box-openm"
                      onClick={() => navigate("/chat")}
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
