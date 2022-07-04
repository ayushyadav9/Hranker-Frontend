import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

import './commentSection.css';
import { baseURL } from '../../../../api';
const timeshower =require('../../utilities/timeshower');

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

                <strong>{commentData.username},</strong><span style={{fontSize:"13px"}}>  {timeshower(Date.now()-commentData.commentedAt)}</span>
                <div style={{paddingTop:"3%"}}>
                    <p>{commentData.comment} </p>
                </div>
            </div>
        </div>
    )
}

export default SingleComment;