import React from "react";

const topUsers = [
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user1.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user2.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user3.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user1.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user2.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user3.png"
  },
  {
    name: "John Doe",
    about:"Graphic Designer",
    dp:"images/resources/user1.png"
  },
]

const TopProfiles = () => {
  return (
    <div className="top-profiles">
      <div className="pf-hd">
        <h3>Top Profiles</h3>
        <i className="la la-ellipsis-v"></i>
      </div>
      <div className="profiles-slider">
        {topUsers.map((user,i)=>{
          return(
        <div key={i} className="user-profy">
          <img src={user.dp} alt="" />
          <h3>{user.name}</h3>
          <span>{user.about}</span>
          <ul>
            <li>
              <a href="/" title="" className="followw">
                Follow
              </a>
            </li>
            {/* <li>
              <a href="/" title="" className="envlp">
                <img src="images/envelop.png" alt="" />
              </a>
            </li> */}
            <li>
              <a href="/" title="" className="hire">
                hire
              </a>
            </li>
          </ul>
          <a href="/" title="">
            View Profile
          </a>
        </div>

          )
        })}
        
      </div>
    </div>
  );
};

export default TopProfiles;
