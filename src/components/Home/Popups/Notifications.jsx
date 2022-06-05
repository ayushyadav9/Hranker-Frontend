import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../../api";
import { getDateAndTime } from "../../../utils/timeCalculator";

const Notifications = ({ notis, setnotis, isNotiOpen, setisNotiOpen }) => {
  const navigate = useNavigate()
  const handelAllRead = () => {
    fetch(`${baseURL}/noti/markAllNotificationsAsRead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            notis.map((i) => (i.isRead = true));
            setnotis([...notis]);
          } else {
          }
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handelRedirect = ()=>{
    setisNotiOpen(false)
    navigate("/notification")
  }
  return (
    <div
      className={`notification-box noti ${isNotiOpen && "active"}`}
      id="notification"
    >
      <div className="nt-title">
        <h4>Setting</h4>
        <div onClick={handelAllRead} title="">
          Mark all as read
        </div>
      </div>
      <div className="nott-list">
        {notis && notis
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, Math.min(6, notis.length))
          .map((n, i) => {
            return (
              // <Link key={i} to={`notification`}>
                <div onClick={handelRedirect} className={`notfication-details ${n.isRead && "isRead"}`}>
                  <div className="noty-user-img">
                    <img
                      src={n.image ? n.image : "images/user40.png"}
                      alt=""
                    />
                  </div>
                  <div className="notification-info">
                    <h3>
                      <div href="/" title="">
                        {n.content.split(" ")[0]}
                      </div>{" "}
                      {n.content
                        .split(" ")
                        .splice(1, n.content.split(" ").length)
                        .join(" ")}
                    </h3>
                    <span>{getDateAndTime(n.createdAt)}</span>
                  </div>
                </div>
              // </Link>
            );
          })}

        <div onClick={handelRedirect} className="view-all-nots">
          <Link to="/notification" title="">
            View All Notification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
