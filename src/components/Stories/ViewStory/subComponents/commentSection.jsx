import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange } from '@mui/material/colors';
import { Button } from '@mui/material';
import { baseURL } from '../../../../api';
import './commentSection.css';
import { deepPurple } from '@mui/material/colors';
const timeshower =require('../../utilities/timeshower');
// import SingleComment from './SingleComment';

const CommentSection = ({ viewStoryData, setViewStoryData, setCommentSection,isPaused,setIsPaused }) => {

    const { userData } = useSelector((state) => state.user);


    const [comment, setComment] = useState("");
    useEffect(() => {
        document.getElementById('comment').value = "";
        setComment("");

    }, [viewStoryData])


    const textAreaHandler = async (e) => {

        await setComment(e.target.value);
    }

    const postCommentHandler = async () => {
        let updatedStoryData = await fetch(baseURL + "/stories/comment", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                story_id: viewStoryData._id,
                user_id: userData._id,
                comment: comment
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;

            })
        updatedStoryData = updatedStoryData.updatedStoryData;
        await setViewStoryData(updatedStoryData);
    }
    return (
        <div className='story-comment-container'>
            <div className="replies">
                <div className="repliesHeaderContainer">

                    <div className="repliesHeader">

                        <h2>Replies</h2>
                        <button onClick={async() => {await setCommentSection(false);await setIsPaused(false)}}>
                            <CloseIcon fontSize='medium' />
                        </button>
                    </div>
                    <Divider />
                </div>
                <h3>Add Your Reply</h3>
                <div>

                    <div className="addComment">
                        <Avatar
                            alt={userData.name}
                            src="/static/images/avatar/2.jpg"
                            sx={{ bgcolor: deepOrange[500] }}
                        />

                        <textarea id="comment" placeholder='Add Your Reply' onChange={(e) => textAreaHandler(e)}></textarea>
                        <Button disabled={!comment} style={{ padding: "0", minWidth: "0" }} onClick={() => postCommentHandler()}>
                            <SendIcon />

                        </Button>
                    </div>
                </div>
                <br />
                <Divider />

                {
                    viewStoryData.comments.slice(0).reverse().map((commentData,index) => {
                        return (
                                <div key={index}>

                                    <SingleComment commentData={commentData} />
                                    <Divider />
                                </div>
                            

                        )
                    })
                }


            </div>

        </div>
    )
}


const SingleComment =({commentData})=>{
    return(
        <div className='story-singlecomment'>
            {!commentData.image &&
                <Avatar 
                src={baseURL+"/file/"+commentData.image}
                sx={{ bgcolor: deepPurple[500] }}
                
                alt={commentData.username}/>
            }
            {
                commentData.image &&
                <img src={baseURL+"/file/"+commentData.image} style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}} alt=""/>
            }
            <div className='story-singleCommentContent'>

                <strong>{firstname(commentData.username)} </strong> &nbsp;<span style={{fontSize:"13px"}}>  {timeshower(Date.now()-commentData.commentedAt)}</span>
                <div style={{paddingTop:"3%"}}>
                    <p>{commentData.comment} </p>
                </div>
            </div>
        </div>
    )
}

const firstname=(username)=>{
    let result="";
    for(let index=0;index<username.length && username[index]!==' ';index++){
        result+=username[index];
    }
    return result;
}

export default CommentSection;