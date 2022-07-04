import React from "react";
import Slider from "react-slick";

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
var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  adaptiveHeight:true,
  variableWidth:true,
  arrows:true
};

const TopProfiles = () => {
  return (
    <div className="top-profiles">
      {/* <div className="pf-hd">
        <h3>Top Profiles</h3>
        <i className="la la-ellipsis-v"></i>
      </div> */}
      <div className="profiles-slider">
      <Slider {...settings}>
        {topUsers.map((user,i)=>{
          return(
            <div key={i} className="user-profy">
              <img src={user.dp} alt="" />
              {/* <h3>{user.name}</h3>
              <span>{user.about}</span> */}
            </div>
        )})}
        </Slider>
      </div>
    </div>
  );
};

export default TopProfiles;
