import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../../api";
import { getBlockedChats, unblockUser } from "../../../redux/ApiCalls";
import Loader from "../../../utils/Loader";

const Bids = ({activeTab}) => {
  const {userToken,userData,blockedChats,loadings} = useSelector((state)=>state.user)
  const [blockData, setblockData] = useState(null)
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(userToken){
      dispatch(getBlockedChats(userToken))
    }
  }, [userToken,dispatch])

  useEffect(() => {
    if(blockedChats && userData){
      let t = blockedChats.map((item)=>{
        let user = item.members.filter((i)=>i._id!==userData._id)
        let data = {
          convId:item._id,
          user:user[0]
        }
        return data
      })
      setblockData(t)
    }
  }, [blockedChats,userData])
  
  const handelUnblock = (id)=>{
    if(id){
      let data={
        token:userToken,
        convoId:id,
      }
      dispatch(unblockUser(data))
    }
  }
  
  return (
    <>
    {!loadings.getBlockedLoading?
    setblockData?.length>0?
    <div className={`product-feed-tab ${activeTab===3? "current":""}`} id="my-bids">
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home">
          {blockData?.map((chat,i)=>{
            return(
            <div key={i} className="post-bar" style={{padding:"20px",cursor:"pointer"}}>
              <div className="post_topbar" style={{justifyContent: "space-between", display: "flex"}}>
                <div className="wordpressdevlp">
                  <img  src={chat?.user?.image?baseURL+"/file/"+ chat?.user?.image:"/images/luser.jpg"} alt=""></img>
                  <div>
                  <h2>{chat?.user?.name}</h2>
                  <p>({chat?.user?.username})</p>
                  </div>
                </div>
                <div className="cadidatesbtn bidsbtn">
                  <button onClick={()=>handelUnblock(chat.convId)} type="button" className="btn btn-primary">
                    {/* {loadings.unblockLoading?"Loading...":"Unblock"} */}
                    Unblock
                  </button>
                </div>
              </div>
            </div>)
          })}
      </div>
    </div>
    </div>:<div>No One in Blocked list</div>
    :<Loader isSmall={true}/>}
    </>
  );
};

export default Bids;
