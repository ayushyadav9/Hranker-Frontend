import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { baseURL } from "../../../api";
import { getDateAndTime } from "../../../utils/timeCalculator";
import { useSelector,useDispatch } from "react-redux";
import { toggleNoti } from "../../../redux/reducers/navReducer";
import { getNotifications, markNotiAsRead } from "../../../redux/ApiCalls";

const Notifications = () => {
  let { notiPopup } = useSelector((state) => state.nav);
  let { isLoggedIn,userToken,notifications } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getNotifications(userToken))
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);
  
  // const handelAllRead = () => {
  //   fetch(`${baseURL}/noti/markAllNotificationsAsRead`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.success) {
           
  //         } else {
  //         }
  //         console.log(result);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };
  const handelRedirect = (noti)=>{
    dispatch(toggleNoti());
    let data = {
      token: localStorage.getItem("userJWT"),
      id:noti._id
    }
    dispatch(markNotiAsRead(data))
    if(noti.post.type===1){
      navigate(`post/${noti.post.slug}`)
    }else{
      navigate(`quesPost/${noti.post.slug}`)
    }
  }
  return (
    <div
      className={`notification-box noti ${notiPopup && "active"}`}
      id="notification"
    >
      {/* <div className="nt-title">
        <h4>Setting</h4>
        <div onClick={handelAllRead} title="">
          Mark all as read
        </div>
      </div> */}
      <div className="nott-list">
        {notifications?.length > 0 ? (
          notifications
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, Math.min(6, notifications.length))
            .map((n, i) => {
              return (
                <div
                  key={i}
                  onClick={()=>handelRedirect(n)}
                  className={`notfication-details ${n.isRead && "isRead"}`}
                >
                  <div className="noty-user-img">
                    <img src={n.image ? n.image : "images/user40.png"} alt="" />
                  </div>
                  <div className="notification-info">
                    <h3>
                      <div title="">{n.content.split(" ")[0]}</div>{" "}
                      {n.content
                        .slice()
                        .split(" ")
                        .splice(1, n.content.split(" ").length)
                        .join(" ")}
                    </h3>
                    <span>{getDateAndTime(n.createdAt)}</span>
                  </div>
                </div>
              );
            })
        ) : (
          <div
            style={{ color: "black", margin: "15px 0px" }}
          >
            No new notifications
          </div>
        )}

        {notifications?.length > 0 && (
          <div onClick={handelRedirect} className="view-all-nots">
            <Link to="/notification" title="">
              View All Notification
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
