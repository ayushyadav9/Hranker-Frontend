import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../api";
import LeftSide from "../../components/Profile/LeftSide";
import RightSide from "../../components/Profile/RightSide";
import Bids from "../../components/Profile/Tabs/Bids";
import Feed from "../../components/Profile/Tabs/Feed";
import Info from "../../components/Profile/Tabs/Info";
import Payments from "../../components/Profile/Tabs/Payments";
import Portfolio from "../../components/Profile/Tabs/Portfolio";
import Review from "../../components/Profile/Tabs/Review";
import Loader from "../../utils/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector,useDispatch } from "react-redux";
import Saved from "../../components/Profile/Tabs/Saved";
import {getUser} from "../../redux/ApiCalls"

const Profile = ({ setisPopupOpen }) => {
  let { userData, loadings, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState(0);
  const [activePopup, setactivePopup] = useState(0);
  const [isLoader, setisLoader] = useState(false);

  const handelActivePopup = (id) => {
    setactivePopup(id);
    setisPopupOpen(true);
  };
  
  const handelClosePopup = (e) => {
    e.preventDefault();
    setactivePopup(0);
    setisPopupOpen(false);
  };

  const handelUploadDP = (e) => {
    console.log(isLoader);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(formData)
    setisLoader(true);
    fetch(`${baseURL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setisLoader(false);
        toast.success("Profile photo updated successfuly");
        console.log("Success:", result);
      })
      .catch((error) => {
        toast.error("Some error occured, please try again");
        console.error("Error:", error);
      });
  };

  const handelEditInfo = (e, section) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let val = Object.fromEntries(formdata.entries());
    console.log(val);

    fetch(`${baseURL}/auth/editDetails/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
      body: JSON.stringify(val),
    })
      .then((response) => response.json())
      .then((result) => {
        setisLoader(false);
        if (result.success) {
          dispatch(getUser(userToken))
          toast.success(result.message);
          handelClosePopup(e);
        }
      })
      .catch((error) => {
        toast.error("Some error occured, please try again");
        console.error("Error:", error);
      });
  };
  return (
    <>
      {loadings.getUserLoading && <Loader />}
      {userData && (
        <div>
          <section className="cover-sec">
            <img
              src="/images/banner.jpg"
              alt=""
            />
            <div className="add-pic-box">
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-lg-12 col-sm-12">
                    <input
                      type="file"
                      onChange={(e) => handelUploadDP(e)}
                      id="file"
                    />
                    <label htmlFor="file">Change Image</label>
                  </div>
                </div>
              </div>
            </div>
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
                                className={activeTab === 0 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(0)}>
                                  <img src="images/ic1.png" alt="" />
                                  <span>Feed</span>
                                </div>
                              </li>
                              <li
                                data-tab="info-dd"
                                className={activeTab === 1 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(1)}>
                                  <img src="images/ic2.png" alt="" />
                                  <span>Info</span>
                                </div>
                              </li>
                              <li
                                data-tab="saved-jobs"
                                className={activeTab === 2 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(2)}>
                                  <img src="images/ic4.png" alt="" />
                                  <span>Saved</span>
                                </div>
                              </li>
                              {/* <li
                                data-tab="my-bids"
                                className={activeTab === 3 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(3)}>
                                  <img src="images/ic5.png" alt="" />
                                  <span>Bids</span>
                                </div>
                              </li>
                              <li
                                data-tab="portfolio-dd"
                                className={activeTab === 4 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(4)}>
                                  <img src="images/ic3.png" alt="" />
                                  <span>Portfolio</span>
                                </div>
                              </li>
                              <li
                                data-tab="rewivewdata"
                                className={activeTab === 5 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(5)}>
                                  <img src="images/review.png" alt="" />
                                  <span>Reviews</span>
                                </div>
                              </li>
                              <li
                                data-tab="payment-dd"
                                className={activeTab === 6 ? "active":""}
                              >
                                <div title="" onClick={() => setactiveTab(6)}>
                                  <img src="images/ic6.png" alt="" />
                                  <span>Payment</span>
                                </div>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                        <Saved activeTab={activeTab} />
                        <Feed userData={userData} activeTab={activeTab} />
                        <Bids activeTab={activeTab} />
                        <Info
                          info={userData.info}
                          activeTab={activeTab}
                          handelActivePopup={handelActivePopup}
                        />
                        <Review activeTab={activeTab} />
                        <Portfolio activeTab={activeTab} />
                        <Payments activeTab={activeTab} />
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
                  <img src="images/copyright.svg" alt="" />
                  Copyright 2019
                </p>
                <img className="fl-rgt" src="images/logo.png" alt="" />
              </div>
            </div>
          </footer>

          <div
            className={activePopup === 1 ? "overview-box open" : "overview-box"}
            id="overview-box"
          >
            <div className="overview-edit">
              <h3>Overview</h3>
              <span>5000 character left</span>
              <form onSubmit={(e) => handelEditInfo(e, "overview")}>
                <textarea type="text" name="overview"></textarea>
                <button type="submit" className="save">
                  Save
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
          <div
            className={activePopup === 2 ? "overview-box open" : "overview-box"}
            id="experience-box"
          >
            <div className="overview-edit">
              <h3>Experience</h3>
              <form onSubmit={(e) => handelEditInfo(e, "experience")}>
                <input type="text" name="title" placeholder="Subject" />
                <textarea
                  type="text"
                  name="description"
                  placeholder="Description"
                ></textarea>
                <button type="submit" className="save">
                  Save
                </button>
                <button type="submit" className="save-add">
                  Save &amp; Add More
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
          <div
            className={activePopup === 3 ? "overview-box open" : "overview-box"}
            id="education-box"
          >
            <div className="overview-edit">
              <h3>Education</h3>
              <form onSubmit={(e) => handelEditInfo(e, "education")}>
                <input
                  type="text"
                  name="institute"
                  placeholder="School / University"
                />
                <div className="datepicky">
                  <div className="row">
                    <div className="col-lg-6 no-left-pd">
                      <div className="datefm">
                        <DatePicker name="from" placeholder="From" />
                        <i className="fa fa-calendar"></i>
                      </div>
                    </div>
                    <div className="col-lg-6 no-righ-pd">
                      <div className="datefm">
                        <DatePicker name="from" placeholder="From" />
                        <i className="fa fa-calendar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="text" name="degree" placeholder="Degree" />
                <textarea
                  type="text"
                  name="description"
                  placeholder="Description"
                ></textarea>
                <button type="submit" className="save">
                  Save
                </button>
                <button type="submit" className="save-add">
                  Save &amp; Add More
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
          <div
            className={activePopup === 4 ? "overview-box open" : "overview-box"}
            id="location-box"
          >
            <div className="overview-edit">
              <h3>Location</h3>
              <form>
                <div className="datefm">
                  <select>
                    <option>Country</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="england">England</option>
                    <option value="india">India</option>
                    <option value="usa">United Sates</option>
                  </select>
                  <i className="fa fa-globe"></i>
                </div>
                <div className="datefm">
                  <select>
                    <option>City</option>
                    <option value="london">London</option>
                    <option value="new-york">New York</option>
                    <option value="sydney">Sydney</option>
                    <option value="chicago">Chicago</option>
                  </select>
                  <i className="fa fa-map-marker"></i>
                </div>
                <button type="submit" className="save">
                  Save
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
          <div
            className={activePopup === 5 ? "overview-box open" : "overview-box"}
            id="skills-box"
          >
            <div className="overview-edit">
              <h3>Skills</h3>
              <ul>
                <li>
                  <a href="/" title="" className="skl-name">
                    HTML
                  </a>
                  <a href="/" title="" className="close-skl">
                    <i className="la la-close"></i>
                  </a>
                </li>
                <li>
                  <a href="/" title="" className="skl-name">
                    php
                  </a>
                  <a href="/" title="" className="close-skl">
                    <i className="la la-close"></i>
                  </a>
                </li>
                <li>
                  <a href="/" title="" className="skl-name">
                    css
                  </a>
                  <a href="/" title="" className="close-skl">
                    <i className="la la-close"></i>
                  </a>
                </li>
              </ul>
              <form>
                <input type="text" name="skills" placeholder="Skills" />
                <button type="submit" className="save">
                  Save
                </button>
                <button type="submit" className="save-add">
                  Save &amp; Add More
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
          <div
            className={activePopup === 6 ? "overview-box open" : "overview-box"}
            id="create-portfolio"
          >
            <div className="overview-edit">
              <h3>Create Portfolio</h3>
              <form>
                <input
                  type="text"
                  name="pf-name"
                  placeholder="Portfolio Name"
                />
                <div className="file-submit">
                  <input type="file" id="file" />
                  <label htmlFor="file">Choose File</label>
                </div>
                <div className="pf-img">
                  <img src="images/resources/np.png" alt="" />
                </div>
                <input
                  type="text"
                  name="website-url"
                  placeholder="htp://www.example.com"
                />
                <button type="submit" className="save">
                  Save
                </button>
                <button
                  onClick={handelClosePopup}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </form>
              <div onClick={handelClosePopup} title="" className="close-box">
                <i className="la la-close"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
