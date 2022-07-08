import React from "react";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className="right-sidebar">
      <div className="message-btn">
        <Link to="/chat" title="">
          {/* <i className="fas fa-cog"></i> */}
          Messages
        </Link>
      </div>
      <div className="widget widget-portfolio">
        <div className="wd-heady">
          <h3>Portfolio</h3>
          <img src="images/photo-icon.png" alt="" />
        </div>
        <div className="pf-gallery">
          <ul>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery1.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery2.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery3.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery4.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery5.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery6.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery7.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery8.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery9.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery10.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery11.png" alt="" />
              </a>
            </li>
            <li>
              <a href="/" title="">
                <img src="images/resources/pf-gallery12.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
