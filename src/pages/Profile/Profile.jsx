import React, { useEffect,useState } from "react";
import { baseURL } from "../../api";
import Navbar from '../../components/Home/Navbar'
import LeftSide from "../../components/Profile/LeftSide";
import RightSide from "../../components/Profile/RightSide";
import Bids from "../../components/Profile/Tabs/Bids";
import Feed from "../../components/Profile/Tabs/Feed";
import Info from "../../components/Profile/Tabs/Info";
import Jobs from "../../components/Profile/Tabs/Jobs";
import Payments from "../../components/Profile/Tabs/Payments";
import Portfolio from "../../components/Profile/Tabs/Portfolio";
import Review from "../../components/Profile/Tabs/Review";

const Profile = () => {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        let token = localStorage.getItem("userJWT")
        if(token){
           fetch(`${baseURL}/auth/getUser`, {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
               },
             })
               .then((res) => res.json())
               .then(
                 (result) => {
                   if (result.success) {
                       setUserData(result.user)
                   }
                   console.log(result);
                 },
                 (error) => {
                   console.log(error);
                 }
               );
        }
       }, [])
  return (
      <>
    {userData && <div className="wrapper">
        <Navbar userData={userData}/>
        <section className="cover-sec">
            <img src="images/resources/cover-img.jpg" alt=""/>
            <div className="add-pic-box">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-12 col-sm-12">
                            <input type="file" id="file"/>
                            <label for="file">Change Image</label>
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
                                <LeftSide/>
                            </div>
                            <div className="col-lg-6">
                                <div className="main-ws-sec">
                                    <div className="user-tab-sec rewivew">
                                        <h3>John Doe</h3>
                                        <div className="star-descp">
                                            <span>Graphic Designer at Self Employed</span>
                                            <ul>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star-half-o"></i></li>
                                            </ul>
                                            <a href="/" title="">Status</a>
                                        </div>
                                        <div className="tab-feed st2 settingjb">
                                            <ul>
                                                <li data-tab="feed-dd" className="active">
                                                    <a href="/" title="">
                                                        <img src="images/ic1.png" alt=""/>
                                                        <span>Feed</span>
                                                    </a>
                                                </li>
                                                <li data-tab="info-dd">
                                                    <a href="/" title="">
                                                        <img src="images/ic2.png" alt=""/>
                                                        <span>Info</span>
                                                    </a>
                                                </li>
                                                <li data-tab="saved-jobs">
                                                    <a href="/" title="">
                                                        <img src="images/ic4.png" alt=""/>
                                                        <span>Jobs</span>
                                                    </a>
                                                </li>
                                                <li data-tab="my-bids">
                                                    <a href="/" title="">
                                                        <img src="images/ic5.png" alt=""/>
                                                        <span>Bids</span>
                                                    </a>
                                                </li>
                                                <li data-tab="portfolio-dd">
                                                    <a href="/" title="">
                                                        <img src="images/ic3.png" alt=""/>
                                                        <span>Portfolio</span>
                                                    </a>
                                                </li>
                                                <li data-tab="rewivewdata">
                                                    <a href="/" title="">
                                                        <img src="images/review.png" alt=""/>
                                                        <span>Reviews</span>
                                                    </a>
                                                </li>
                                                <li data-tab="payment-dd">
                                                    <a href="/" title="">
                                                        <img src="images/ic6.png" alt=""/>
                                                        <span>Payment</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <Jobs/>
                                    <Feed/>
                                    <Bids/>
                                    <Info/>
                                    <Review/>
                                    <div className="product-feed-tab" id="my-bids">
                                        <div className="posts-section">
                                            <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img src="images/resources/us-pic.png" alt=""/>
                                                        <div className="usy-name">
                                                            <h3>John Doe</h3>
                                                            <span><img src="images/clock.png" alt=""/>3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="ed-opts">
                                                        <a href="/" title="" className="ed-opts-open"><i
                                                                className="la la-ellipsis-v"></i></a>
                                                        <ul className="ed-options">
                                                            <li><a href="/" title="">Edit Post</a></li>
                                                            <li><a href="/" title="">Unsaved</a></li>
                                                            <li><a href="/" title="">Unbid</a></li>
                                                            <li><a href="/" title="">Close</a></li>
                                                            <li><a href="/" title="">Hide</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="epi-sec">
                                                    <ul className="descp">
                                                        <li><img src="images/icon8.png" alt=""/><span>Frontend
                                                                Developer</span></li>
                                                        <li><img src="images/icon9.png" alt=""/><span>India</span></li>
                                                    </ul>
                                                    <ul className="bk-links">
                                                        <li><a href="/" title=""><i className="la la-bookmark"></i></a></li>
                                                        <li><a href="/" title=""><i className="la la-envelope"></i></a></li>
                                                        <li><a href="/" title="" className="bid_now">Bid Now</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job_descp">
                                                    <h3>Simple Classified Site</h3>
                                                    <ul className="job-dt">
                                                        <li><span>$300 - $350</span></li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                                        luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                                                        magna sit amet... <a href="/" title="">view more</a></p>
                                                    <ul className="skill-tags">
                                                        <li><a href="/" title="">HTML</a></li>
                                                        <li><a href="/" title="">PHP</a></li>
                                                        <li><a href="/" title="">CSS</a></li>
                                                        <li><a href="/" title="">Javascript</a></li>
                                                        <li><a href="/" title="">Wordpress</a></li>
                                                        <li><a href="/" title="">Photoshop</a></li>
                                                        <li><a href="/" title="">Illustrator</a></li>
                                                        <li><a href="/" title="">Corel Draw</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job-status-bar">
                                                    <ul className="like-com">
                                                        <li>
                                                            <a href="/"><i className="la la-heart"></i> Like</a>
                                                            <img src="images/liked-img.png" alt=""/>
                                                            <span>25</span>
                                                        </li>
                                                        <li><a href="/" title="" className="com"><img src="images/com.png"
                                                                    alt=""/> Comment 15</a></li>
                                                    </ul>
                                                    <a href="/"><i className="la la-eye"></i>Views 50</a>
                                                </div>
                                            </div>
                                            <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img src="images/resources/us-pic.png" alt=""/>
                                                        <div className="usy-name">
                                                            <h3>John Doe</h3>
                                                            <span><img src="images/clock.png" alt=""/>3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="ed-opts">
                                                        <a href="/" title="" className="ed-opts-open"><i
                                                                className="la la-ellipsis-v"></i></a>
                                                        <ul className="ed-options">
                                                            <li><a href="/" title="">Edit Post</a></li>
                                                            <li><a href="/" title="">Unsaved</a></li>
                                                            <li><a href="/" title="">Unbid</a></li>
                                                            <li><a href="/" title="">Close</a></li>
                                                            <li><a href="/" title="">Hide</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="epi-sec">
                                                    <ul className="descp">
                                                        <li><img src="images/icon8.png" alt=""/><span>Frontend
                                                                Developer</span></li>
                                                        <li><img src="images/icon9.png" alt=""/><span>India</span></li>
                                                    </ul>
                                                    <ul className="bk-links">
                                                        <li><a href="/" title=""><i className="la la-bookmark"></i></a></li>
                                                        <li><a href="/" title=""><i className="la la-envelope"></i></a></li>
                                                        <li><a href="/" title="" className="bid_now">Bid Now</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job_descp">
                                                    <h3>Ios Shopping mobile app</h3>
                                                    <ul className="job-dt">
                                                        <li><span>$300 - $350</span></li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                                        luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                                                        magna sit amet... <a href="/" title="">view more</a></p>
                                                    <ul className="skill-tags">
                                                        <li><a href="/" title="">HTML</a></li>
                                                        <li><a href="/" title="">PHP</a></li>
                                                        <li><a href="/" title="">CSS</a></li>
                                                        <li><a href="/" title="">Javascript</a></li>
                                                        <li><a href="/" title="">Wordpress</a></li>
                                                        <li><a href="/" title="">Photoshop</a></li>
                                                        <li><a href="/" title="">Illustrator</a></li>
                                                        <li><a href="/" title="">Corel Draw</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job-status-bar">
                                                    <ul className="like-com">
                                                        <li>
                                                            <a href="/"><i className="la la-heart"></i> Like</a>
                                                            <img src="images/liked-img.png" alt=""/>
                                                            <span>25</span>
                                                        </li>
                                                        <li><a href="/" title="" className="com"><img src="images/com.png"
                                                                    alt=""/> Comment 15</a></li>
                                                    </ul>
                                                    <a href="/"><i className="la la-eye"></i>Views 50</a>
                                                </div>
                                            </div>
                                            <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img src="images/resources/us-pic.png" alt=""/>
                                                        <div className="usy-name">
                                                            <h3>John Doe</h3>
                                                            <span><img src="images/clock.png" alt=""/>3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="ed-opts">
                                                        <a href="/" title="" className="ed-opts-open"><i
                                                                className="la la-ellipsis-v"></i></a>
                                                        <ul className="ed-options">
                                                            <li><a href="/" title="">Edit Post</a></li>
                                                            <li><a href="/" title="">Unsaved</a></li>
                                                            <li><a href="/" title="">Unbid</a></li>
                                                            <li><a href="/" title="">Close</a></li>
                                                            <li><a href="/" title="">Hide</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="epi-sec">
                                                    <ul className="descp">
                                                        <li><img src="images/icon8.png" alt=""/><span>Frontend
                                                                Developer</span></li>
                                                        <li><img src="images/icon9.png" alt=""/><span>India</span></li>
                                                    </ul>
                                                    <ul className="bk-links">
                                                        <li><a href="/" title=""><i className="la la-bookmark"></i></a></li>
                                                        <li><a href="/" title=""><i className="la la-envelope"></i></a></li>
                                                        <li><a href="/" title="" className="bid_now">Bid Now</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job_descp">
                                                    <h3>Simple Classified Site</h3>
                                                    <ul className="job-dt">
                                                        <li><span>$300 - $350</span></li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                                        luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                                                        magna sit amet... <a href="/" title="">view more</a></p>
                                                    <ul className="skill-tags">
                                                        <li><a href="/" title="">HTML</a></li>
                                                        <li><a href="/" title="">PHP</a></li>
                                                        <li><a href="/" title="">CSS</a></li>
                                                        <li><a href="/" title="">Javascript</a></li>
                                                        <li><a href="/" title="">Wordpress</a></li>
                                                        <li><a href="/" title="">Photoshop</a></li>
                                                        <li><a href="/" title="">Illustrator</a></li>
                                                        <li><a href="/" title="">Corel Draw</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job-status-bar">
                                                    <ul className="like-com">
                                                        <li>
                                                            <a href="/"><i className="la la-heart"></i> Like</a>
                                                            <img src="images/liked-img.png" alt=""/>
                                                            <span>25</span>
                                                        </li>
                                                        <li><a href="/" title="" className="com"><img src="images/com.png"
                                                                    alt=""/> Comment 15</a></li>
                                                    </ul>
                                                    <a href="/"><i className="la la-eye"></i>Views 50</a>
                                                </div>
                                            </div>
                                            <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img src="images/resources/us-pic.png" alt=""/>
                                                        <div className="usy-name">
                                                            <h3>John Doe</h3>
                                                            <span><img src="images/clock.png" alt=""/>3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="ed-opts">
                                                        <a href="/" title="" className="ed-opts-open"><i
                                                                className="la la-ellipsis-v"></i></a>
                                                        <ul className="ed-options">
                                                            <li><a href="/" title="">Edit Post</a></li>
                                                            <li><a href="/" title="">Unsaved</a></li>
                                                            <li><a href="/" title="">Unbid</a></li>
                                                            <li><a href="/" title="">Close</a></li>
                                                            <li><a href="/" title="">Hide</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="epi-sec">
                                                    <ul className="descp">
                                                        <li><img src="images/icon8.png" alt=""/><span>Frontend
                                                                Developer</span></li>
                                                        <li><img src="images/icon9.png" alt=""/><span>India</span></li>
                                                    </ul>
                                                    <ul className="bk-links">
                                                        <li><a href="/" title=""><i className="la la-bookmark"></i></a></li>
                                                        <li><a href="/" title=""><i className="la la-envelope"></i></a></li>
                                                        <li><a href="/" title="" className="bid_now">Bid Now</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job_descp">
                                                    <h3>Ios Shopping mobile app</h3>
                                                    <ul className="job-dt">
                                                        <li><span>$300 - $350</span></li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                                        luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                                                        magna sit amet... <a href="/" title="">view more</a></p>
                                                    <ul className="skill-tags">
                                                        <li><a href="/" title="">HTML</a></li>
                                                        <li><a href="/" title="">PHP</a></li>
                                                        <li><a href="/" title="">CSS</a></li>
                                                        <li><a href="/" title="">Javascript</a></li>
                                                        <li><a href="/" title="">Wordpress</a></li>
                                                        <li><a href="/" title="">Photoshop</a></li>
                                                        <li><a href="/" title="">Illustrator</a></li>
                                                        <li><a href="/" title="">Corel Draw</a></li>
                                                    </ul>
                                                </div>
                                                <div className="job-status-bar">
                                                    <ul className="like-com">
                                                        <li>
                                                            <a href="/"><i className="la la-heart"></i> Like</a>
                                                            <img src="images/liked-img.png" alt=""/>
                                                            <span>25</span>
                                                        </li>
                                                        <li><a href="/" title="" className="com"><img src="images/com.png"
                                                                    alt=""/> Comment 15</a></li>
                                                    </ul>
                                                    <a href="/"><i className="la la-eye"></i>Views 50</a>
                                                </div>
                                            </div>
                                            <div className="process-comm">
                                                <a href="/" title=""><img src="images/process-icon.png" alt=""/></a>
                                            </div>
                                        </div>
                                    </div>
                                    <Portfolio/>
                                    <Payments/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <RightSide/>
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
                        <li><a href="help-center.html" title="">Help Center</a></li>
                        <li><a href="about.html" title="">About</a></li>
                        <li><a href="/" title="">Privacy Policy</a></li>
                        <li><a href="/" title="">Community Guidelines</a></li>
                        <li><a href="/" title="">Cookies Policy</a></li>
                        <li><a href="/" title="">Career</a></li>
                        <li><a href="forum.html" title="">Forum</a></li>
                        <li><a href="/" title="">Language</a></li>
                        <li><a href="/" title="">Copyright Policy</a></li>
                    </ul>
                    <p><img src="images/copy-icon2.png" alt=""/>Copyright 2019</p>
                    <img className="fl-rgt" src="images/logo2.png" alt=""/>
                </div>
            </div>
        </footer>
        <div className="overview-box" id="overview-box">
            <div className="overview-edit">
                <h3>Overview</h3>
                <span>5000 character left</span>
                <form>
                    <textarea></textarea>
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
        <div className="overview-box" id="experience-box">
            <div className="overview-edit">
                <h3>Experience</h3>
                <form>
                    <input type="text" name="subject" placeholder="Subject"/>
                    <textarea></textarea>
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="save-add">Save &amp; Add More</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
        <div className="overview-box" id="education-box">
            <div className="overview-edit">
                <h3>Education</h3>
                <form>
                    <input type="text" name="school" placeholder="School / University"/>
                    <div className="datepicky">
                        <div className="row">
                            <div className="col-lg-6 no-left-pd">
                                <div className="datefm">
                                    <input type="text" name="from" placeholder="From" className="datepicker flatpickr-input"
                                        readonly="readonly"/>
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>
                            <div className="col-lg-6 no-righ-pd">
                                <div className="datefm">
                                    <input type="text" name="to" placeholder="To" className="datepicker flatpickr-input"
                                        readonly="readonly"/>
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="text" name="degree" placeholder="Degree"/>
                    <textarea placeholder="Description"></textarea>
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="save-add">Save &amp; Add More</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
        <div className="overview-box" id="location-box">
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
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
        <div className="overview-box" id="skills-box">
            <div className="overview-edit">
                <h3>Skills</h3>
                <ul>
                    <li><a href="/" title="" className="skl-name">HTML</a><a href="/" title="" className="close-skl"><i
                                className="la la-close"></i></a></li>
                    <li><a href="/" title="" className="skl-name">php</a><a href="/" title="" className="close-skl"><i
                                className="la la-close"></i></a></li>
                    <li><a href="/" title="" className="skl-name">css</a><a href="/" title="" className="close-skl"><i
                                className="la la-close"></i></a></li>
                </ul>
                <form>
                    <input type="text" name="skills" placeholder="Skills"/>
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="save-add">Save &amp; Add More</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
        <div className="overview-box" id="create-portfolio">
            <div className="overview-edit">
                <h3>Create Portfolio</h3>
                <form>
                    <input type="text" name="pf-name" placeholder="Portfolio Name"/>
                    <div className="file-submit">
                        <input type="file" id="file"/>
                        <label for="file">Choose File</label>
                    </div>
                    <div className="pf-img">
                        <img src="images/resources/np.png" alt=""/>
                    </div>
                    <input type="text" name="website-url" placeholder="htp://www.example.com"/>
                    <button type="submit" className="save">Save</button>
                    <button type="submit" className="cancel">Cancel</button>
                </form>
                <a href="/" title="" className="close-box"><i className="la la-close"></i></a>
            </div>
        </div>
    </div>}
    </>
  )
}

export default Profile