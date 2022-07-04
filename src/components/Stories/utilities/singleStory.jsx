import './singleStory.css';
//  css done

import { baseURL } from '../../../api';
const timeshower =require('./timeshower');


const SingleStory =({profilePicSrc,username,createdAt})=>{
    // console.log(story);
    
    return (
        <div className="single-story">

            <div className="story-dp">
                                {profilePicSrc ? (
                                  <img
                                    
                                    src={
                                      baseURL + "/file/" + profilePicSrc
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <img src="/images/user40.png" alt="" />
                                )}
            </div>

            <div className="story-author">
                <p className="name">{username}</p>
                <p className="time">{timeshower(Date.now()-createdAt)}</p>
            </div>
        
        </div>
    )
}
export default SingleStory;