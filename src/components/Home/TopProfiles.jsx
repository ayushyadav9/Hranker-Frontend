import React from "react";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {baseURL} from '../../api' 
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Slider from "react-slick";
import { Link } from "react-router-dom";

import CreateStory from "../Stories/Modals/createStoryModal";



const checkUserNotSeen= (viewers,user_id)=>{
    // console.log(viewers,"viewers");
    // console.log(user_id);
    for(let index=0;index<viewers.length;index++){
        if(viewers[index].user_id===user_id){
          return false;
        }
    }
    return true;
}


var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  // adaptiveHeight:true,
  variableWidth:true,
  arrows:true
};

const TopProfiles = () => {

  const { userData } = useSelector((state) => state.user);
  const [stories, setStories] = useState(null);
  const [dataRecaller,setDataRecaller]=useState(false);
  const[modalState,setModalState]=useState(false);
  const user_id=userData?._id;
  const user_image=userData?.image;


///////// Utility Function
  let mapUser={};
  let userLatestStory=[];
  let otherUserEachLatestStory=[];

  const buildLatestStory=(storyObjectArray)=>{
    for(let index=0;index<storyObjectArray.length;index++){
      let revIndex=storyObjectArray.length-1-index;
      mapUser[storyObjectArray[revIndex].user._id]=storyObjectArray[revIndex];
    }
    
  }
  const makeArrayProper=()=>{
    
        for(let key in mapUser){
           if(key===user_id){
            userLatestStory.push(mapUser[key]);
           }
           else{
            otherUserEachLatestStory.push(mapUser[key]);
           }
        }
    
    otherUserEachLatestStory.sort((a,b)=>{
      let createdAta=a.createdAt;
      let createdAtb=b.createdAt;
      if(createdAta<createdAtb){
        return -1;
      }
      if(createdAta>createdAtb){
        return 1;
      }
      return 0;
    });
  }

  const makeWordShort=(word)=>{
    if(word.length<=6){
      return word;
    }
    let ans=word.slice(0,6);
    ans+='..';
    return ans;
  }
///////// endOf utility Function
  

  useEffect(() => {
    
    if(user_id){

      fetch(baseURL + "/stories", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          user_id: user_id
        })
      })
        .then((res) => {
  
          return res.json();
        })
        .then((data) => {
  
          setStories(data.data);
  
        })
    }
  }, [user_id,dataRecaller]);
  // console.log(stories);


  if(stories){
    buildLatestStory(stories[0]);
    buildLatestStory(stories[1]);
    makeArrayProper();

  }

  return (
    <>
      {
        stories && 
        
        <div className="top-profiles">
          
          <div className="profiles-slider">
          <Slider {...settings}>

    
            <div className="user-profy user-profy-create-story" onClick={async()=>await setModalState(true)} >
              {
                !user_image &&
                <img  src="/images/luser.jpg" alt="" />
              }
              {
                user_image &&
                <img  src={baseURL+"/file/"+user_image} alt="" />
              }
              <span style={{position:'absolute',top:'38px',left:'40px'}}><AddCircleIcon color="primary" fontSize="small"/></span>
            </div>            
              
            
            
            {userLatestStory.map((story,i)=>{
              return(
                <div key={i}>

                  <Link
                    to={"/stories/"+story._id}
                  >
                    <div key={i} className='user-profy'>
                      {
                        !story.user.image &&
                        
                        <img  src="/images/luser.jpg" alt="" />
                      }
                      {
                        story.user.image &&
                        <img  src={baseURL+"/file/"+story.user.image} alt="" />
                      }
                      <span> {makeWordShort(story.user.name)}</span>
                      
                    </div>
                  </Link>
                </div>

            )})}

            {otherUserEachLatestStory.map((story,i)=>{
              return(
                <div key={i}>

                  <Link
                    to={"/stories/"+story._id}
                  >
                    <div key={i} className={'user-profy ' + (checkUserNotSeen(story.viewers,user_id) ?'user-profy-unseen':'')}>
                      {
                        !story.user.image &&
                        <img src="/images/luser.jpg" alt="" />
                        
                      }
                      {
                        story.user.image &&
                        <img src={baseURL+"/file/"+story.user.image} alt="" />
                      }
                      <span> {makeWordShort(story.user.name)} </span>
                      
                    </div>
                  </Link>
                </div>

            )})}
            
            </Slider>
          </div>
          {modalState && <CreateStory modalState={modalState} setModalState={setModalState} user_id={user_id} dataRecaller={dataRecaller} setDataRecaller={setDataRecaller}/> }
        </div>
      }
    </>
  );
};

export default TopProfiles;
