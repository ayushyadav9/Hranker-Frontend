import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/ApiCalls";
import { getDateAndTime } from "../../utils/timeCalculator";
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
      <div class="points-heading">Your Point Activity</div>
      <div class="total-points">{points} Points</div>
      <hr class="hr dotted" />
      <div class="points-container">
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
                          {item.pointsAdded}
                        </div>
                        <div className="points-desc">{item.desc}</div>
                      </div>
                      <div class="date">{getDateAndTime(item.createdAt)}</div>
                    </li>
                  </span>
                );
              })}
        </ul>
      </div>
      <footer>
            <div className="footy-sec mn no-margin">
              <div className="container">
                <ul>
                  <li>
                    <a href="/" title="">
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
                    <a href="/" title="">
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
                <img className="fl-rgt" src="images/logo.png" alt="" />
              </div>
            </div>
          </footer>
    </>
  );
};

export default Points;
