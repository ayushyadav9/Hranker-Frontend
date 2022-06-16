import React from "react";

const Info = ({ info, activeTab, handelActivePopup }) => {
  return (
    <div
      className={`product-feed-tab ${activeTab === 1 ? "current":""}`}
      id="info-dd"
    >
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="overview-open">
            Overview
          </div>{" "}
          <div
            onClick={() => handelActivePopup(1)}
            title=""
            className="overview-open"
          >
            <i className="fa fa-pencil"></i>
          </div>
        </h3>
        <p>{info.overview}</p>
      </div>
      <div className="user-profile-ov st2">
        <h3>
          <div href="/" title="" className="exp-bx-open">
            Experience{" "}
          </div>
          <div
            onClick={() => handelActivePopup(2)}
            title=""
            className="exp-bx-open"
          >
            <i className="fa fa-plus-square"></i>
          </div>
        </h3>
        {info.experience.map((inf, i) => {
          return (
            <div key={i}>
              <h4>
                {inf.title}
                <div href="/" title="">
                  {/* <i className="fa fa-pencil"></i> */}
                </div>
              </h4>
              <p>{inf.description}</p>
            </div>
          );
        })}
      </div>
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="ed-box-open">
            Education
          </div>{" "}
          <div
            onClick={() => handelActivePopup(3)}
            title=""
            className="ed-box-open"
          >
            <i className="fa fa-plus-square"></i>
          </div>{" "}
        </h3>
        {info.education.map((inf, i) => {
          return (
            <div key={i}>
              <h4>{inf.degree}</h4>
              <span>
                {inf.from} - {inf.to}
              </span>
              <p>{inf.description}</p>
            </div>
          );
        })}
      </div>
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="lct-box-open">
            Location
          </div>{" "}
          <div
            onClick={() => handelActivePopup(4)}
            title=""
            className="lct-box-open"
          >
            <i className="fa fa-pencil"></i>
          </div>{" "}
          <div href="/" title="">
            <i className="fa fa-plus-square"></i>
          </div>
        </h3>
        <h4>{info.location.country}</h4>
        <p>{info.location.city}</p>
      </div>
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="skills-open">
            Skills
          </div>{" "}
          <div
            onClick={() => handelActivePopup(5)}
            title=""
            className="skills-open"
          >
            <i className="fa fa-pencil"></i>
          </div>
        </h3>
        <ul>
          {info.skills.map((skill, i) => {
            return (
              <li key={i}>
                <div href="/" title="">
                  {skill}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Info;
