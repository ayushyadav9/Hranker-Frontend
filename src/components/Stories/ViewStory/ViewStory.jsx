import {  useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';

import InteractActivities from './subComponents/InteractActivities';
import Textdisplay1 from './subComponents/textdisplay1';
import Textdisplay2 from './subComponents/textdisplay2';
import { baseURL } from '../../../api';

import './viewstory.css';


const timeshower=require('../utilities/timeshower');




const ViewStory =(
    {   user_id,
        dataRecaller,
        setDataRecaller
    })=>{


    let {id}=useParams();
    console.log(id);
    
    const[commentsection,setCommentSection]=useState(false);
    const[viewStoryData,setViewStoryData]=useState(null);
    const[storyIdArray,setstoryIdArray]=useState(null);
    console.log("viewstory window opened");
    
    

    useEffect(()=>{
        // console.log("useeffect in viewStory");
        const getsingleStoryViewData= async(id)=>{
            let singleStoryData=await fetch(baseURL+"/stories/getstorydata",{
                method:"POST",
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                },
                body:JSON.stringify({
                    story_id:id,
                    user_id:user_id,
                    
                })
            })
            .then((res)=>{
                // console.log(res);
                return res.json();
            })
            .then(async(data)=>{
                // console.log(data.data);
                await setViewStoryData(data.data);
                await setstoryIdArray(data.storyIdArray);
                return data.data;
    
            })
            console.log(singleStoryData);
        }
        getsingleStoryViewData(id);

    },[id]);

    console.log(viewStoryData,"outside useefferct")

    // console.log("bottom")

    return(
        <div className={"view-story "+ (commentsection ? 'shrink':'')}>

            {
                !viewStoryData &&
                <NotFoundPage/>
            }
            {viewStoryData &&
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
            }
            
            
        </div>
    )
}
export default ViewStory;


const ViewExistingStory=(
    {   viewStoryData,
        setViewStoryData,
        user_id,
        dataRecaller,
        setDataRecaller,
        storyIdArray,
        commentsection,
        setCommentSection
    })=>{


    

    const curr_index=storyIdArray.indexOf(viewStoryData._id);
    let prev_id=null;
    let next_id=null;
    if(curr_index>0){
        prev_id=storyIdArray[curr_index-1];
    }
    if(curr_index+1<storyIdArray.length){
        next_id=storyIdArray[curr_index+1];
    }
    const[imgsrc,setImgsrc]=useState("");

    useEffect(()=>{
        console.log("use effect in existing")
        setImgsrc("");
        if(viewStoryData.type===1 ){
            console.log("it ran in viewStory type1")
            let img_id=viewStoryData.image;
            fetch(baseURL+"stories/getimage",{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
               img_id:img_id
            })
            })
            .then((res)=>{
                
                return res.json();
            })
            .then(async(data)=>{
                
                
                await setImgsrc(data.imageencoded);

            })

        }
    },[viewStoryData._id])

    console.log("in viewExisting story",imgsrc)

    return(
        <>
            <div className="view-story-image-div" >

                {((viewStoryData.type)===1)&& <img src={imgsrc} alt="" style={{}} />}
                {((viewStoryData.type)===1)&& <Textdisplay1 text={viewStoryData.text}/>}
                {((viewStoryData.type)===2)&& <Textdisplay2 text={viewStoryData.text}/>}
            </div>

            <InteractActivities 
                viewStoryData={viewStoryData} 
                setViewStoryData={setViewStoryData} 
                user_id={user_id} 
                dataRecaller={dataRecaller} 
                setDataRecaller={setDataRecaller} 
                commentsection={commentsection} 
                setCommentSection={setCommentSection}
            />


            <div className="view-story-top-content">

                <div className="single-story no-hover">
                    <div className="story-dp">
                        <img src={baseURL+"/file/"+viewStoryData.user.image} alt=""  />
                    </div>
                    <div className="story-author">
                        <p className="name">{viewStoryData.user.name}</p>
                        <p className="time">{timeshower(Date.now()-viewStoryData.createdAt)}</p>
                    </div>                        
                </div>

                <div className="cross-btn">
                    <button >
                        <Link
                            to="/"
                        >

                            <ClearIcon/>  
                        </Link>
                    </button>
                </div>

            </div>
            <div className="Navigator">
                {
                    prev_id &&

                        <div className='backwardArrow'>
                            <Link
                                to={prev_id}
                            >
                            <Button style={{padding:"0",margin:"0"}}>

                                <ArrowBackIosNewIcon style={{color:"#fff",fontSize:"32px",padding:"0",margin:"0"}}/>
                            </Button>
                            </Link>
                        </div>
                }
                {
                    next_id &&

                        <div className="forwardArrow">
                            <Link
                                to={next_id}
                            >
                            <Button style={{padding:"0",margin:"0"}}>

                                <ArrowForwardIosIcon style={{color:"#fff",fontSize:"32px",padding:"0",margin:"0"}}/>
                            </Button>
                            </Link>
                        </div>
                }
            </div>
        </>
    )

}


const NotFoundPage=()=>{
    
    return(
        <>
           
            <div className="not-found-wrapper">
                <h1>Page Not Found</h1>
                <p class="message">Page you are looking is either Deleted or Expired</p>
                <Link
                    to="/"
                >
                    <Button
                        type='Contained'
                    >
                    See Other Stories
                        </Button> 
                </Link>
            
            </div>
        </>
    )
}