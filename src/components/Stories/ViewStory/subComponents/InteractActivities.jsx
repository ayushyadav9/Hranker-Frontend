import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';

import CommentSection from './commentSection';
import ShareModal from '../../Modals/shareModal';
import ViewersListShow from '../../Modals/viewersListShowModal';

import { baseURL } from '../../../../api';

import './InteractActivities.css';





const InteractActivities =(
    {
        viewStoryData,
        setViewStoryData,
        user_id,
        dataRecaller,
        setDataRecaller,
        commentsection,
        setCommentSection,
        isPaused,
        setIsPaused
    }

    )=>{
    const navigate = useNavigate();
    let likestate=viewStoryData.likers.includes(user_id);
    const[likeActiveStatus,setLikeActiveStatus]=useState(likestate);
    const[shareModal,setShareModal]=useState(false);
    const[openViewersList,setOpenViewersList]=useState(false);



    const commentHandler=async()=>{
        await setIsPaused(!isPaused);
        await setCommentSection((commentsection)=>!commentsection);
        console.log('isPausedState',isPaused)
    }





    const deletestory=async()=>{
        await fetch(baseURL+"/stories/deletestory",{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                story_id:viewStoryData._id
            })
        })
        .then((res)=>{
            return res.json();
        })
        await setDataRecaller(!dataRecaller);
        navigate('/stories');
        
    }


    const likehandler=async()=>{
            let updatedStorydata= await fetch(baseURL+"/stories/like",{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                story_id:viewStoryData._id,
                user_id:user_id
            })
            })
            .then((res)=>{
                return res.json();
            })

            await setViewStoryData(updatedStorydata.updateStorydata);

    }

    const unlikehandler=async()=>{
        let updatedStorydata= await fetch(baseURL+"/stories/unlike",{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                story_id:viewStoryData._id,
                user_id:user_id
            })
            })
            .then((res)=>{
                return res.json();
            })
            await setViewStoryData(updatedStorydata.updatedStorydata);
    }

    useEffect(()=>{
        setLikeActiveStatus(viewStoryData.likers.includes(user_id));
    },[viewStoryData,user_id])

    return(
        <div className="InteractBar">
            <div>

                {(user_id===viewStoryData.user._id)&&
                    <button onClick={()=>deletestory()}>
                        {/* <Link
                            to="/stories"
                        > */}
                            <DeleteIcon sx={{fontSize:"150%"}}/>
                        {/* </Link> */}
                    </button>}
            </div>
            
            <div>
                
                    <div className={user_id !==viewStoryData.user._id ? 'no-hover':''}>

                        <button 
                            disabled={user_id !== viewStoryData.user._id} 
                            
                            onClick={async()=> {await setOpenViewersList(true);await setIsPaused(true)}}
                        >
                        <VisibilityIcon sx={{fontSize:"150%"}}/> 
                        </button>
                        <div className='make-center'>
                            {viewStoryData.viewers.length}
                        </div>
                    </div>
                
            </div>
            
            <div>
                    <div className={likeActiveStatus? 'like-active':''} >

                        <button onClick={()=> (!likeActiveStatus ?likehandler:unlikehandler)()}>

                            <ThumbUpIcon sx={{fontSize:"150%"}}/>
                        </button>                
                        <div className='make-center'>
                            {viewStoryData.likers.length}
                        </div>
                    </div>
            </div>
            
            <div>
               

                    <button onClick={()=>commentHandler()}>

                        <CommentIcon sx={{fontSize:"150%"}}/>
                    </button>
                
                    <div className='make-center'>
                        {viewStoryData.comments.length}
                    </div>
            </div>
            <div>

                <button onClick={async()=> {await setShareModal(true);await setIsPaused((isPaused)=>!isPaused);}}>
                    <ShareIcon sx={{fontSize:"150%"}}/>

                </button>
            </div>
            {commentsection && <CommentSection  viewStoryData={viewStoryData} setViewStoryData={setViewStoryData} setCommentSection={setCommentSection} isPaused={isPaused} setIsPaused={setIsPaused}/>}
            {shareModal && <ShareModal shareModal={shareModal} setShareModal={setShareModal} isPaused={isPaused} setIsPaused={setIsPaused}/>}
            {openViewersList && <ViewersListShow Viewers={viewStoryData.viewers} openViewersList={openViewersList} setOpenViewersList={setOpenViewersList} isPaused={isPaused} setIsPaused={setIsPaused}/>}
        </div>
    )
}
export default InteractActivities;