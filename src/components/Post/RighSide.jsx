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
    <div class="col-xl-3 col-lg-3 col-md-12">
      <div class="right-sidebar">
      <div class="widget widget-feat">
          <ul>
            <li>
              <i class="fa fa-heart"></i>
              <span>{postData.likers.length}</span>
            </li>
            <li>
              <i class="fa fa-comment"></i>
              <span>{postData.comments.length}</span>
            </li>
            <li>
              <i class="fa fa-share-alt"></i>
              <span>0</span>
            </li>
            <li>
              <i class="fa fa-eye"></i>
              <span>50</span>
            </li>
          </ul>
        </div>
        <div class="widget widget-jobs">
          <div class="sd-title">
            <h3>Share</h3>
          </div>
          
          <div class="sd-title copylink">
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
        </div>
        

        <div class="widget widget-projectid">
          <h3>ID : {postData._id}</h3>
          <p>Report Post</p>
        </div>

        <div class="widget widget-jobs">
          <div class="sd-title">
            <h3>About Post Creator</h3>
            <i class="la la-ellipsis-v"></i>
          </div>
          <div class="sd-title paymethd">
            <h4>{postData.user.name}</h4>
            <p>Verified</p>
            <ul class="star">
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star-half-o"></i>
              </li>
              <li>
                <a href="/">5.00 of 5 Reviews</a>
              </li>
            </ul>
          </div>
          <div class="sd-title">
            <h4>India</h4>
            <p>SKS Nagar, Ludhiana 1 AM</p>
          </div>
          <div class="sd-title">
            <h4>{postData.user.posts.blogPosts.length} Blog Posted</h4>
            {/* <p>85% Hire Rate, 15% Open Jobs</p> */}
          </div>
          <div class="sd-title">
            <h4>Member Since</h4>
            <p>{func(postData.user.createdAt)}</p>
          </div>
        </div>

        <div class="widget widget-jobs">
          <div class="sd-title">
            <h3>Post Link</h3>
            <i class="la la-ellipsis-v"></i>
          </div>
          <div class="sd-title copylink">
            <p>{window.location.href.slice(0, 27) + "..."}</p>
            <span>
              <div onClick={() => copy(window.location.href)}>{copyText}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RighSide;
