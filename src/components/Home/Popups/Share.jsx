import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSharePopup } from "../../../redux/reducers/postReducers";
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

let st = {
  size: 50
};

const Share = () => {
  const { popups,shareLink } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const handelClose = (e) => {
    e.preventDefault();
    dispatch(toggleSharePopup());
  };
  return (
    <div
      className={`post-popup pst-pj ${
        popups.sharePopup === true ? "active" : ""
      }`}
    >
      <div className="post-project">
        <h3>Share Post</h3>
        <div className="post-project-fields">
          <form>
            <div className="row">
              <div style={{margin: "5px auto"}}>
                <ul >
                  <FacebookShareButton url={window.location.href+shareLink}>
                    <FacebookIcon
                      url="sdf"
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </FacebookShareButton>
                  <WhatsappShareButton url={window.location.href+shareLink}>
                    <WhatsappIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </WhatsappShareButton>
                  <TwitterShareButton url={window.location.href+shareLink}>
                    <TwitterIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </TwitterShareButton>
                  <EmailShareButton url={window.location.href+shareLink}>
                    <EmailIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </EmailShareButton>
                  <FacebookMessengerShareButton url={window.location.href+shareLink}>
                    <FacebookMessengerIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </FacebookMessengerShareButton>
                  <LinkedinShareButton url={window.location.href+shareLink}>
                    <LinkedinIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </LinkedinShareButton>
                  <TelegramShareButton url={window.location.href+shareLink}>
                    <TelegramIcon
                      style={{ margin: "1px 2px" }}
                      size={st.size}
                      round={true}
                    />
                  </TelegramShareButton>
                </ul>
              </div>
              <div className="col-lg-12">
                <ul style={{marginTop: "25px",width:"auto",float:"right"}}>
                  <li>
                    <button onClick={(e) => handelClose(e)} title="">
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <span className="close" onClick={handelClose} title="">
          <i className="la la-times-circle-o"></i>
        </span>
      </div>
    </div>
  );
};

export default Share;
