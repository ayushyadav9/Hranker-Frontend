import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../api";
import { func } from "../../utils/timeCalculator";

const Notification = (props) => {
  let { id } = useParams();
  const [activeTab, setactiveTab] = useState(0);
  const [notiData, setnotiData] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      fetch(`${baseURL}/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setUserData(result.user);
              setnotiData(result.user.notifications);
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  const changeTab = (id) => {
    let data;
    if (id === 0) {
      data = userData ? userData.notifications : [];
    } else if (id === 1) {
      data = userData.notifications.filter((i) => !i.isRead);
    } else if (id === 2) {
      data = userData.notifications.filter((i) => i.isRead);
    }
    setnotiData(data);
    setactiveTab(id);
  };

  const markAsRead = (id) => {
    if (id && id.length === 24) {
      fetch(`${baseURL}/noti/markNotificationAsRead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify({ notiId: id }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              let d = notiData.map((n, i) => {
                if (n._id === id) {
                  n.isRead = true;
                }
                return n;
              });
              setnotiData(d);
            } else {
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <>
      {userData && (
        <>
          <section className="forum-sec">
            <div className="container">
              <div className="forum-links">
                <ul>
                  <li className={activeTab === 0 && "active"}>
                    <div onClick={() => changeTab(0)} title="">
                      All Notifications
                    </div>
                  </li>
                  <li className={activeTab === 1 && "active"}>
                    <div onClick={() => changeTab(1)} title="">
                      Unread
                    </div>
                  </li>
                  <li className={activeTab === 2 && "active"}>
                    <div onClick={() => changeTab(2)} title="">
                      Read
                    </div>
                  </li>
                </ul>
              </div>
              <div className="forum-links-btn">
                <a href="/" title="">
                  <i className="fa fa-bars"></i>
                </a>
              </div>
            </div>
          </section>
          <section className="forum-page">
            <div className="container">
              <div className="forum-questions-sec">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="forum-questions">
                      {notiData &&
                        notiData
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .map((noti, i) => {
                            return (
                              <div
                                key={i}
                                className={`usr-question ${
                                  noti.isRead && "isRead"
                                }`}
                              >
                                <div className="usr_img">
                                  <img
                                    src={
                                      noti.image
                                        ? noti.image
                                        : "images/user.png"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="usr_quest">
                                  <h3>{noti.content}</h3>
                                </div>
                                <div className="markAsRead">
                                  {!noti.isRead && (
                                    <div
                                      onClick={() => markAsRead(noti._id)}
                                      title=""
                                    >
                                      Mark as Read
                                    </div>
                                  )}
                                  <span className="quest-posted-time">
                                    <i className="fa fa-clock-o"></i>
                                    {func(noti.createdAt)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                    <nav
                      aria-label="Page navigation example"
                      className="full-pagi"
                    >
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link pvr" href="/">
                            Previous
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link active" href="/">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            5
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            6
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link pvr" href="/">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-lg-4">
                    <div className="widget widget-user">
                      <h3 className="title-wd">Top User of the Week</h3>
                      <ul>
                        <li>
                          <div className="usr-msg-details">
                            <div className="usr-ms-img">
                              <img src="images/resources/m-img1.png" alt="" />
                            </div>
                            <div className="usr-mg-info">
                              <h3>Jessica William</h3>
                              <p>Graphic Designer </p>
                            </div>
                          </div>
                          <span>
                            <img src="images/price1.png" alt="/" />
                            1185
                          </span>
                        </li>
                        <li>
                          <div className="usr-msg-details">
                            <div className="usr-ms-img">
                              <img src="images/resources/m-img2.png" alt="" />
                            </div>
                            <div className="usr-mg-info">
                              <h3>John Doe</h3>
                              <p>PHP Developer</p>
                            </div>
                          </div>
                          <span>
                            <img src="images/price2.png" alt="" />
                            1165
                          </span>
                        </li>
                        <li>
                          <div className="usr-msg-details">
                            <div className="usr-ms-img">
                              <img src="images/resources/m-img3.png" alt="" />
                            </div>
                            <div className="usr-mg-info">
                              <h3>Poonam</h3>
                              <p>Wordpress Developer </p>
                            </div>
                          </div>
                          <span>
                            <img src="images/price3.png" alt="" />
                            1120
                          </span>
                        </li>
                        <li>
                          <div className="usr-msg-details">
                            <div className="usr-ms-img">
                              <img src="images/resources/m-img4.png" alt="" />
                            </div>
                            <div className="usr-mg-info">
                              <h3>Bill Gates</h3>
                              <p>C & C++ Developer </p>
                            </div>
                          </div>
                          <span>
                            <img src="images/price4.png" alt="" />
                            1009
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="widget widget-adver">
                                <img src="images/resources/adver-img.png" alt=""/>
                            </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="footy-sec mn no-margin">
              <div className="container">
                <ul>
                  <li>
                    <a href="help-center.html" title="">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="about.html" title="">
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
                    <a href="forum.html" title="">
                      Forum
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
                <p>
                  <img src="images/copy-icon2.png" alt="" />
                  Copyright 2019
                </p>
                <img className="fl-rgt" src="images/logo2.png" alt="" />
              </div>
            </div>
          </footer>
          <div className="overview-box" id="question-box">
            <div className="overview-edit">
              <h3>Ask a Question</h3>
              <form>
                <input
                  type="text"
                  name="question"
                  placeholder="Type Question Here"
                />
                <input type="text" name="tags" placeholder="Tags" />
                <textarea placeholder="Description"></textarea>
                <button type="submit" className="save">
                  Submit
                </button>
                <button type="submit" className="cancel">
                  Cancel
                </button>
              </form>
              <a href="/" title="" className="close-box">
                <i className="la la-close"></i>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notification;
