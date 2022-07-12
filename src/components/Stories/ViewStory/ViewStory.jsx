import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Button } from "@mui/material";
import Loader from "../../../utils/Loader";

import InteractActivities from "./subComponents/InteractActivities";
import { Textdisplay1,Textdisplay2 } from "./subComponents/textdisplay";
import { baseURL } from "../../../api";

import "./viewstory.css";
import "../utilities/singleStory.css";

const timeshower = require("../utilities/timeshower");



const ViewStory = ({ user_id, dataRecaller, setDataRecaller }) => {
  let { id } = useParams();
  const [commentsection, setCommentSection] = useState(false);
  const [viewStoryData, setViewStoryData] = useState(null);
  const [storyIdArray, setstoryIdArray] = useState(null);
  const [loaderState,setLoaderState]=useState(true);
  
  useEffect(() => {

    const getsingleStoryViewData = async (id) => {
        await setLoaderState(true);
        await fetch(baseURL + "/stories/getstorydata", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          story_id: id,
          user_id: user_id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          await setViewStoryData(data.data);
          await setstoryIdArray(data.storyIdArray);
          await setLoaderState(false);
          return data.data;
        });

    };
    getsingleStoryViewData(id);
  }, [id,user_id]);

  

  return (
    <div className={"view-story " + (commentsection ? "shrink" : "")}>
      {!viewStoryData && !loaderState && <NotFoundPage />}
      {loaderState && <Loader isSmall={true}/>}
      {viewStoryData && !loaderState && (
        <ViewExistingStory
          viewStoryData={viewStoryData}
          setViewStoryData={setViewStoryData}
          user_id={user_id}
          dataRecaller={dataRecaller}
          setDataRecaller={setDataRecaller}
          storyIdArray={storyIdArray}
          commentsection={commentsection}
          setCommentSection={setCommentSection}
        />
      )}
    </div>
  );
};
export default ViewStory;








const ViewExistingStory = ({
  viewStoryData,
  setViewStoryData,
  user_id,
  dataRecaller,
  setDataRecaller,
  storyIdArray,
  commentsection,
  setCommentSection,
}) => {
  const curr_index = storyIdArray.indexOf(viewStoryData._id);
  const [width,setWidth]=useState(0);
  let navigate= useNavigate();
  const[isPaused,setIsPaused]=useState(false);
  
  let prev_id = null;
  let next_id = null;
  if (curr_index > 0) {
    prev_id = storyIdArray[curr_index - 1];
  }
  if (curr_index + 1 < storyIdArray.length) {
    next_id = storyIdArray[curr_index + 1];
  }


  
  useEffect(()=>{
    let checkwidth=width;
    const updater=()=>{
      if(checkwidth>=100){
        if(!next_id){
          navigate('/stories/');
        }
        else{
          navigate('/stories/'+next_id)
        }

        return () => clearInterval(interval);
      }
      else{
        if(!isPaused){
          checkwidth+=0.05;
          setWidth(width=>width+0.05);
        }
      }
    }
    let interval=setInterval(updater,10)
    return ()=>clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPaused])

  const [imgsrc, setImgsrc] = useState("");
  const [loaderState,setLoaderState]=useState(viewStoryData.type===1);

  useEffect(() => {
    setImgsrc("");
    if (viewStoryData.type === 1) {
      let img_id = viewStoryData.image;
      fetch(baseURL + "/stories/getimage", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          img_id: img_id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          await setImgsrc(data.imageencoded);
          await setLoaderState(false);
        });
    }
  }, [viewStoryData._id,viewStoryData.image,viewStoryData.type]);



  return (
    <>
      <div className="progress-bar">
        <div className="progress-maker" style={{"width":`${width}%`}}>

        </div>
      </div>
      <div className="view-story-image-div" onClick={async()=>setIsPaused(!isPaused)}>
        
        {loaderState && <Loader isSmall={true}/>}
        {viewStoryData.type === 1 && !loaderState && <img src={imgsrc} alt="" style={{}} />}
        {viewStoryData.type === 1 && !loaderState && <Textdisplay1 text={viewStoryData.text} />}
        {viewStoryData.type === 2 && <Textdisplay2 text={viewStoryData.text} />}
      </div>

      <InteractActivities
        viewStoryData={viewStoryData}
        setViewStoryData={setViewStoryData}
        user_id={user_id}
        dataRecaller={dataRecaller}
        setDataRecaller={setDataRecaller}
        commentsection={commentsection}
        setCommentSection={setCommentSection}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        />

      <div className="view-story-top-content">
        <div className="single-story no-hover">
          <div className="story-dp">
            {viewStoryData.user.image ? (
              <img
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
                src={baseURL + "/file/" + viewStoryData.user.image}
                alt=""
              />
            ) : (
              <img
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
                src="/images/user40.png"
                alt=""
              />
            )}
          </div>
          <div className="story-author">
            <p className="name" style={{ color: "#fff" }}>
              {viewStoryData.user.name}
            </p>
            <p className="time" style={{ color: "#fff" }}>
              {timeshower(Date.now() - viewStoryData.createdAt)}
            </p>
          </div>
        </div>

        <div className="cross-btn">
          <button onClick={async()=>await setIsPaused(!isPaused)}>
                {isPaused ?(<PlayArrowIcon/>):(<PauseIcon/>)}
          </button>
          <button>
            <Link to="/stories">
              <ClearIcon />
            </Link>
          </button>
        </div>
      </div>
      <div className="Navigator">
        {prev_id && (
          <div className="backwardArrow">
            <Link to={"/stories/" + prev_id}>
              <Button style={{ padding: "0", margin: "0" }}>
                <ArrowBackIosNewIcon
                  style={{
                    color: "#fff",
                    fontSize: "32px",
                    padding: "0",
                    margin: "0",
                  }}
                />
              </Button>
            </Link>
          </div>
        )}
        {next_id && (
          <div className="forwardArrow">
            <Link to={"/stories/" + next_id}>
              <Button style={{ padding: "0", margin: "0" }}>
                <ArrowForwardIosIcon
                  style={{
                    color: "#fff",
                    fontSize: "32px",
                    padding: "0",
                    margin: "0",
                  }}
                />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};



const NotFoundPage = () => {
  return (
    <>
      <div className="not-found-wrapper">
        <h1>Page Not Found</h1>
        <p class="message">Page you are looking is either Deleted or Expired</p>
        <Link to="/stories">
          <Button type="Contained">See Other Stories</Button>
        </Link>
      </div>
    </>
  );
};



