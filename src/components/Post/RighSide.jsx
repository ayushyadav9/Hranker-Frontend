import React, { useState } from "react";
import { func } from "../../utils/timeCalculator";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";

const RighSide = ({ postData }) => {
  const [copyText, setcopyText] = useState("Copy Link");
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setcopyText("Copied!");
  };
  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="right-sidebar">
      <div className="widget widget-feat">
          <ul>
            <li>
              <i className="fa fa-heart"></i>
              <span>{postData.likers.length}</span>
            </li>
            <li>
              <i className="fa fa-comment"></i>
              <span>{postData.comments.length}</span>
            </li>
            <li>
              <i className="fa fa-share-alt"></i>
              <span>0</span>
            </li>
            <li>
              <i className="fa fa-eye"></i>
              <span>{postData.viewers?postData.viewers.length:0}</span>
            </li>
          </ul>
          <p>Report Post</p>
        </div>
        <div className="widget widget-jobs">
          <div className="sd-title">
            <h3>Share</h3>
          </div>
          
          <div className="sd-title copylink">
            <ul>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon
                  url="sdf"
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </FacebookShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </WhatsappShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </TwitterShareButton>
              <EmailShareButton url={window.location.href}>
                <EmailIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </EmailShareButton>
              <FacebookMessengerShareButton url={window.location.href}>
                <FacebookMessengerIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </FacebookMessengerShareButton>
              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </LinkedinShareButton>
              <TelegramShareButton url={window.location.href}>
                <TelegramIcon
                  style={{ margin: "1px 2px" }}
                  size={25}
                  round={true}
                />
              </TelegramShareButton>
            </ul>
          </div>
          <div className="sd-title copylink">
            <p>{window.location.href.slice(0, 27) + "..."}</p>
            <span>
              <div onClick={() => copy(window.location.href)}>{copyText}</div>
            </span>
          </div>
        </div>
        <div className="widget widget-jobs">
          <div className="sd-title">
            <h3>About Post Creator</h3>
            <i className="la la-ellipsis-v"></i>
          </div>
          <div className="sd-title paymethd">
            <h4>{postData.user.name}</h4>
            {/* <p>Verified</p> */}
          </div>
          {/* <div className="sd-title">
            <h4>India</h4>
            <p>SKS Nagar, Ludhiana 1 AM</p>
          </div> */}
          <div className="sd-title">
            <h4>{postData.user.posts.blogPosts.length} Blog Posted</h4>
            <h4>{postData.user.posts.quesPosts.length} Questions Posted</h4>
            {/* <p>85% Hire Rate, 15% Open Jobs</p> */}
          </div>
          <div className="sd-title">
            <h4>Member Since</h4>
            <p>{func(postData.user.createdAt)}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RighSide;
