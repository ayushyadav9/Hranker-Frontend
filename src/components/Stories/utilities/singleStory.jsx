import './singleStory.css';
//  css done


const timeshower =require('./timeshower');


const SingleStory =({profilePicSrc,username,createdAt})=>{
    // console.log(story);
    
    return (
        <div className="single-story">

            <div className="story-dp">
                <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" alt=""  />
            </div>

            <div className="story-author">
                <p className="name">{username}</p>
                <p className="time">{timeshower(Date.now()-createdAt)}</p>
            </div>
        
        </div>
    )
}
export default SingleStory;