import React, { useEffect, useState } from "react";
import { baseURL } from "../../api";
import { Link } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import { getLeaderboard } from "../../redux/ApiCalls";
import { userRank } from "../../utils/timeCalculator";


const Leaderboard = () => {
  const { userData,userToken } = useSelector((state) => state.user);
  const { data,loading } = useSelector((state) => state.leaderBoard)
  const dispatch = useDispatch();
  const [leaderData, setleaderData] = useState(null);
  const [myRank, setmyRank] = useState(null);

  useEffect(() => {
    if (userData && data) {
      let copiedData = JSON.parse(JSON.stringify(data));
      let meIdx = copiedData.findIndex((item) => item._id === userData._id);
      let me = copiedData[meIdx];
      me.rank = meIdx + 1;
      setmyRank(me);
      copiedData.splice(meIdx, 1);
      setleaderData(copiedData);
    } else{
      dispatch(getLeaderboard(userToken))
    }
    // eslint-disable-next-line
  }, [userData,data]);

  return (
    <>
    {loading && <Loader/>}
      {userData && leaderData && myRank ? (
        <>
          <div style={{ minHeight: "91.1vh" }}>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="points-heading">Global Ranking</div>
                  <div className="col-12">
                    <div className="freelancerbiding">
                      <div className="row">
                        <div className="col-md-4 col-sm-12">
                          <h3 className="topTable1">Users</h3>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="repcent">
                            <h3 className="center topTable2">Posts</h3>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="bidrit">
                            <h3 className="topTable3">Points</h3>
                          </div>
                        </div>
                      </div>
                      {myRank && (
                        <div className="my-rank">
                          <div className="row">
                            <div className="col-md-4 col-sm-12">
                              <div className="usy-dt-leader">
                                <div className="ranking-no">
                                  {userRank(myRank.rank)}
                                </div>
                                <img
                                  src={`${
                                    myRank.image
                                      ? baseURL + "/file/" + myRank.image
                                      : "/images/luser.jpg"
                                  }`}
                                  alt=""
                                />
                                <div className="usy-name-leader">
                                  <Link
                                    to={`/user-profile/${myRank.username}`}
                                    target="_blank"
                                  >
                                    <h3>
                                      {myRank.name} <span>(You)</span>
                                    </h3>
                                  </Link>
                                  <span>({myRank.username})</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                              <div className="repcent">
                                <p>
                                  {myRank.posts.blogPosts
                                    ? myRank.posts.blogPosts.length
                                    : 0}{" "}
                                  Blogs
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                              <div className="bidrit">
                                <h3 className="leader-points">
                                  {myRank.points}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {leaderData &&
                        leaderData.map((user, i) => {
                          return (
                            <div key={i}>
                              <div  className="row">
                                <div className="col-md-4 col-sm-12">
                                  <div className="usy-dt-leader">
                                    <div className="ranking-no">
                                      {userRank(i + 1)}
                                    </div>
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
                                <div className="col-md-4 col-sm-12">
                                  <div className="repcent">
                                    <p>
                                      {user.posts.blogPosts
                                        ? user.posts.blogPosts.length
                                        : 0}{" "}
                                      Blogs
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                  <div className="bidrit">
                                    <h3 className="leader-points">
                                      {user.points}
                                    </h3>
                                    {/* <p>In 10 Days</p> */}
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>):<Loader />}

    </>
  );
};

export default Leaderboard;
