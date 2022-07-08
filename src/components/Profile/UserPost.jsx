import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import {deletePost} from "../../redux/ApiCalls"

const UserPost = ({ post }) => {
  let { userData,userToken } = useSelector((state) => state.user);
  const [isOpen, setisOpen] = useState(false)
  const dispatch = useDispatch();
  const handelDeletePost = ()=>{
    let data = {
      postId: post._id,
      type: post.type,
      token: userToken
    }
    dispatch(deletePost(data))
    console.log(data)
  }
  return (
    <>
      {userData ? (
        <div className="post-bar">
          <div className="post_topbar">
            <div className="ed-opts">
              <div onClick={()=>setisOpen(prev=>!prev)} className="ed-opts-open">
                <i className="la la-ellipsis-v"></i>
              </div>
              <ul className={`ed-options ${isOpen?"active":""}`}>
                <li>
                  <div onClick = {handelDeletePost}>
                    Delete Post
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="job_descp">
            <h3>{post.title}</h3>
            <ul className="job-dt">
              {post.examTags.map((tag, i) => {
                return (
                  <li key={i}>
                    <div href="/" title="">
                      {tag}
                    </div>
                  </li>
                );
              })}
            </ul>
            {post.image && <img src={post.image} alt=""></img>}
            <p>
              {post.description && post.description.split(" ").length > 25 ? (
                <>
                  {post.description.split(" ").slice(0, 25).join(" ") + "..."}
                    <span style={{color:"#e44d3a", fontWeight: "600", display: "block"}} title="">
                  <Link to={`/post/${post.slug}`} target="_blank">
                      View more
                  </Link>
                    </span>
                </>
              ) : (
                post.description
              )}
            </p>
            <ul className="skill-tags">
              {post.subjectTags.map((item,i)=>{
                return (<li key={i}>
                  <div href="/" title="">
                    {item}
                  </div>
                </li>)
              })}
            </ul>
          </div>
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i._id === userData._id).length > 0
                      ? "isLiked"
                      : ""
                  }
                >
                  <i className="fas fa-heart"></i> Like{" "}
                  {post.likers ? post.likers.length : 0}
                </div>
              </li>
              <li>
                <div href="/" className="com">
                  <i className="fas fa-comment-alt"></i>
                  Comment {post.comments && post.comments.length}
                </div>
              </li>
            </ul>
            <div href="/">
              <i className="fas fa-eye"></i>Views 50
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPost;
