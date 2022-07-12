import React, { useEffect, useState } from "react";
import { func } from "../../utils/timeCalculator";
import Loader from "../../utils/Loader"
import { useSelector,useDispatch } from "react-redux";
import { getNotifications, markNotiAsRead } from "../../redux/ApiCalls";
import Footer from "../../components/Home/Footer";

const Notification = () => {
  let  { loadings,userToken,notifications,isLoggedIn } = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState(0);
  const [tmpNotifications, settmpNotifications] = useState([])
  
  useEffect(() => {
    if(isLoggedIn){
      dispatch(getNotifications(userToken))
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  useEffect(() => {
    if(notifications){
      settmpNotifications(notifications)
    }
  }, [notifications])
  

  const changeTab = (id) => {
    let data;
    if (id === 0) {
      data = notifications ? notifications : [];
    } else if (id === 1) {
      data = notifications.filter((i) => !i.isRead);
    } else if (id === 2) {
      data = notifications.filter((i) => i.isRead);
    }
    settmpNotifications(data)
    // setnotiData(data);
    // console.log(notiData)
    setactiveTab(id);
  };

  const markAsRead = (id) => {
    if (id && id.length === 24) {
      let data = {
        token: localStorage.getItem("userJWT"),
        id:id
      }
      dispatch(markNotiAsRead(data))
    }
  };

  return (
    <>
    {loadings.notiReadLoading&&<Loader/>}
      {!loadings.getNotiLoading ? (
        <>
        <div style={{minHeight: "91.25vh"}}>
          <section className="forum-sec">
            <div className="container">
              <div className="forum-links">
                <ul>
                  <li className={activeTab === 0 ? "active":""}>
                    <div onClick={() => changeTab(0)} title="">
                      All Notifications
                    </div>
                  </li>
                  <li className={activeTab === 1 ? "active":""}>
                    <div onClick={() => changeTab(1)} title="">
                      Unread
                    </div>
                  </li>
                  <li className={activeTab === 2 ? "active":""}>
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
                      {tmpNotifications &&
                        tmpNotifications.slice()
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .map((noti, i) => {
                            return (
                              <div
                                key={i}
                                className={`usr-question ${
                                  noti.isRead ? "isRead":""
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
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
          </div>
          <Footer/>
        </>
      ):<Loader/>}
    </>
  );
};

export default Notification;
