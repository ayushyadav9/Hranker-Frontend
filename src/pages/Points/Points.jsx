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
        <div class="points-heading">Your Point Activity</div>
        <div class="total-points">{points} Points</div>
        <hr class="hr dotted" />
        <div class="points-container">
          {userData ? (
            <ul class="points-list">
              {userData &&
                userData.pointsHistory
                  .slice()
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((item, i) => {
                    return (
                      <span>
                        <li class="points-list-item">
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
                          <div class="date">
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
