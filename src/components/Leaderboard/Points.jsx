import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../../api";
import { getLeaderboard } from "../../redux/ApiCalls";
import { userRank } from "../../utils/timeCalculator";

const Points = () => {
  const { topUsers } = useSelector((state) => state.leaderBoard);
  const { userData, userToken } = useSelector((state) => state.user);
//   const [myRank, setmyRank] = useState(null);
  const [leaderData, setleaderData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && topUsers) {
      //   let copiedData = JSON.parse(JSON.stringify(topUsers));
      //   let meIdx = copiedData.findIndex((item) => item._id === userData._id);
      //   let me = copiedData[meIdx];
      //   me.rank = meIdx + 1;
      //   setmyRank(me);
      //   console.log(me)
      //   copiedData.splice(meIdx, 1);
      setleaderData(topUsers);
    } else {
      dispatch(getLeaderboard(userToken));
    }
    // eslint-disable-next-line
  }, [userData, topUsers]);

  return (
    <>
      <div className="row" style={{ paddingBottom: "8px" }}>
        <div className="col-md-4 col-sm-12">
          <h3 className="topTable1">Users</h3>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="repcent">
            {/* <h3 className="center topTable2">Lifetime Points</h3> */}
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="bidrit">
            <h3 className="topTable3">Lifetime Points</h3>
          </div>
        </div>
      </div>
      <hr/>
      {leaderData &&
        leaderData.map((user, i) => {
          return (
            <div key={i}>
              <div className={`row ${userData._id===user._id?"is-myRank":""}`} style={{ padding: "8px 0px"}}>
                <div className="col-md-4 col-sm-12" style={{margin:"auto"}}>
                  <div className="usy-dt-leader">
                    <div className="ranking-no">{userRank(i + 1)}</div>
                    <img
                      src={`${
                        user.image
                          ? baseURL + "/file/" + user.image
                          : "/images/luser.jpg"
                      }`}
                      alt=""
                    />
                    <div className="usy-name-leader">
                      <Link
                        to={`/user-profile/${user.username}`}
                        target="_blank"
                      >
                        <h3>{user.name}</h3>
                      </Link>
                      <span>({user.username})</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12" style={{margin:"auto"}}>
                  <div className="repcent-points">
                    {/* <p>
                      {user.heighestPoints} {" "}
                    </p> */}
                  </div>
                </div>
                <div className="col-md-4 col-sm-12" style={{margin:"auto"}}>
                  <div className="bidrit">
                    <h3 className="leader-points">{user.heighestPoints}</h3>
                    {/* <p>In 10 Days</p> */}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
    </>
  );
};

export default Points;
