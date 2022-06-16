import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Home/Footer";
import { getUser } from "../../redux/ApiCalls";
import { getDateAndTime } from "../../utils/timeCalculator";
import Loader from "../../utils/Loader";
const Points = () => {
  const { points, userData, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ minHeight: "78vh" }}>
        <div className="points-heading">Your Point Activity</div>
        <div className="total-points">{points} Points</div>
        <hr className="hr dotted" />
        <div className="points-container">
          {userData ? (
            <ul className="points-list">
              {userData &&
                userData.pointsHistory
                  .slice()
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((item, i) => {
                    return (
                      <span key={i}>
                        <li className="points-list-item">
                          <div className="points-details">
                            <div
                              className={`${
                                item.pointsAdded < 0
                                  ? "points-changed-dec"
                                  : "points-changed-inc"
                              }`}
                            >
                              {item.pointsAdded>0?"+" + item.pointsAdded:item.pointsAdded}
                            </div>
                            <div className="points-desc">{item.desc}</div>
                          </div>
                          <div className="date">
                            {getDateAndTime(item.createdAt)}
                          </div>
                        </li>
                      </span>
                    );
                  })}
            </ul>
          ) : (
            <Loader isSmall={true} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Points;
