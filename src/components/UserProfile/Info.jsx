import React from 'react'

const Info = ({info,activeTab}) => {
  return (
    <div
      className={`product-feed-tab ${activeTab === 1 && "current"}`}
      id="info-dd"
    >
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="overview-open">
            Overview
          </div>
        </h3>
        <p>{info.overview}</p>
      </div>
      <div className="user-profile-ov st2">
        <h3>
          <div href="/" title="" className="exp-bx-open">
            Experience{" "}
          </div>
        </h3>
        {info.experience.map((inf, i) => {
          return (
            <div key={i}>
              <h4>
                {inf.title}
                <div href="/" title="">
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
          </div>
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
          </div>
        </h3>
        <h4>{info.location.country}</h4>
        <p>{info.location.city}</p>
      </div>
      <div className="user-profile-ov">
        <h3>
          <div href="/" title="" className="skills-open">
            Skills
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
  )
}

export default Info