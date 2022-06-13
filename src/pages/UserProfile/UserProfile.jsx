import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../api";
import Feed from "../../components/UserProfile/Feed";
import Info from "../../components/UserProfile/Info";
import LeftSide from "../../components/UserProfile/LeftSide";
import RightSide from "../../components/UserProfile/RightSide";
import Loader from "../../utils/Loader";

const UserProfile = () => {
  const [activeTab, setactiveTab] = useState(0);
  const [userData, setuserData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { username } = useParams();
  useEffect(() => {
    if (username) {
      setisLoading(true);
      fetch(`${baseURL}/auth/getOtherUser/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setisLoading(false);
            console.log(result);
            if (result.success) {
              setuserData(result.user);
            } else {
            }
          },
          (error) => {
            setisLoading(false);
            console.log(error);
          }
        );
    }
  }, [username]);

  return (
    <>
      {isLoading && <Loader />}
      {userData ? (
        <div>
          <section className="cover-sec">
            <img
              src="https://atiinc.org/wp-content/themes/ati-2016/images/homepage-banner-bg.jpg"
              alt=""
            />
          </section>
          <main>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="row">
                    <div className="col-lg-3">
                      <LeftSide userData={userData} />
                    </div>
                    <div className="col-lg-6">
                      <div className="main-ws-sec">
                        <div className="user-tab-sec rewivew">
                          <h3>{userData.name}</h3>
                          <h2>({userData.username})</h2>
                          <div className="star-descp">
                            <span>
                              {userData.about ? userData.about : "No bio yet"}
                            </span>
                          </div>
                          <div className="tab-feed st2 settingjb">
                            <ul>
                              <li
                                data-tab="feed-dd"
                                className={activeTab === 0 && "active"}
                              >
                                <div title="" onClick={() => setactiveTab(0)}>
                                  <img src="/images/ic1.png" alt="" />
                                  <span>Feed</span>
                                </div>
                              </li>
                              <li
                                data-tab="info-dd"
                                className={activeTab === 1 && "active"}
                              >
                                <div title="" onClick={() => setactiveTab(1)}>
                                  <img src="/images/ic2.png" alt="" />
                                  <span>Info</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <Feed userData={userData} activeTab={activeTab} />
                        <Info
                          info={userData.info}
                          activeTab={activeTab}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <RightSide />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

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
                  <img src="/images/copy-icon2.png" alt="" />
                  Copyright 2019
                </p>
                <img className="fl-rgt" src="/images/logo.png" alt="" />
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;