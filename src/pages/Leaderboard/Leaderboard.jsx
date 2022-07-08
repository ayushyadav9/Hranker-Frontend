import React, { useState,useEffect } from "react";
import Footer from "../../components/Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import Active from "../../components/Leaderboard/Active";
import Points from "../../components/Leaderboard/Points";
import { getLeaderboard } from "../../redux/ApiCalls";

const Leaderboard = () => {
  const { userData,userToken } = useSelector((state) => state.user);
  const { topUsers, activeUsers, loading } = useSelector(
    (state) => state.leaderBoard
  );
  const dispatch = useDispatch()
  const [activeState, setactiveState] = useState(0);

  useEffect(() => {
    dispatch(getLeaderboard(userToken))
  }, [dispatch,userToken])
  
  const handelChangeState = (id) => {
    setactiveState(id);
  };

  return (
    <>
      {loading && <Loader />}
      {userData && topUsers && activeUsers? (
        <>
          <div style={{ minHeight: "91.1vh" }}>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="lead-heading">
                    <div
                      onClick={() => handelChangeState(0)}
                      className={`lead-name ${
                        activeState === 0 ? "active" : ""
                      }`}
                    >
                      Global Ranking
                    </div>
                    <div
                      onClick={() => handelChangeState(1)}
                      className={`lead-name ${
                        activeState === 1 ? "active" : ""
                      }`}
                    >
                      Activity Ranking
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="freelancerbiding">
                      {activeState === 0 ? <Points /> : <Active />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Leaderboard;
