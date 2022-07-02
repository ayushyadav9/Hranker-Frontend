import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

import './commentSection.css';
import { baseURL } from '../../../../api';
const timeshower =require('../../utilities/timeshower');

const SingleComment =({commentData})=>{
    return(
        <div className='singlecomment'>
            <Avatar 
            src={baseURL+"/file/"+commentData.image}
            sx={{ bgcolor: deepPurple[500] }}
            alt={commentData.username}/>
            <div className='singleCommentContent'>

                <strong>{commentData.username},</strong><span style={{fontSize:"13px"}}>  {timeshower(Date.now()-commentData.commentedAt)}</span>
                <div style={{paddingTop:"3%"}}>
                    <p>{commentData.comment} </p>
                </div>
            </div>
        </div>
    )
}

export default SingleComment;