import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import { getDateAndTime } from "../../utils/timeCalculator";
import { baseURL } from "../../api";

const QuesPost = ({ post,postUserData }) => {
  let { userData } = useSelector((state) => state.user);
  const [optionAnswered, setoptionAnswered] = useState(null);
  const [isAnswered, setisAnswered] = useState(false);
  const [correctOption, setcorrectOption] = useState(null)
 
  const calcPercentage = (id) => {
    if (post.answeredBy.length > 0) {
      let votecnts = post.options[id - 1].votes.length;
      let pcnt = (votecnts / post.answeredBy.length) * 100.0;
      return parseFloat(pcnt.toFixed(2));
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (post.options.length > 0 && userData) {
      let t = post.answeredBy.filter((id) => id === userData._id);
      // console.log(t)
      if(t.length===0) setisAnswered(false);
      if (t.length > 0) {
        setisAnswered(true);
      }
      let copt = post.options.filter((it) => it.isCorrect);
      setcorrectOption(copt)
      for (let i = 0; i < post.options.length; i++) {
        let tmp = post.options[i].votes.filter((it) => it === userData._id);
        if (tmp.length > 0) {
          setoptionAnswered(post.options[i]);
          break;
        }
      }
    }else{
      setisAnswered(false)
    }
   // eslint-disable-next-line
  }, [post.answeredBy,userData]);

  return (
    <>
      {postUserData && userData && post ? (
        <div className="post-bar">
          <div className="post_topbar">
          <div className="usy-dt" style={{ marginBottom: "20px" }}>
              {postUserData.image ? (
                <img
                  className="postUserDP"
                  src={baseURL + "/file/" + postUserData.image}
                  alt=""
                />
              ) : (
                <div className="user-dummy">{postUserData.name.charAt(0)}</div>
              )}
              <div className="usy-name">
                <Link
                  to={`/user-profile/${postUserData.username}`}
                  target="_blank"
                >
                  <h3>{postUserData.name}</h3>
                </Link>
                <span>
                  <img src="/images/clock.svg" alt="" />
                  {getDateAndTime(post.createdAt)} <span>•</span>
                  {post.subjectTags.map((sub, i) => {
                    return (
                      <span>
                        {sub} {post.subjectTags.length === i + 1 ? "" : "|"}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
            <div className="ed-opts">
              <ul className="bk-links">
                <li>
                  <Link to={`/quesPost/${post.slug}`} target="_blank">
                    <div className="open-newtab">
                      <img src="/images/open.svg" alt=""></img>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="job_descp">
            <h3>{post.title}</h3>
            <ul className="job-dt">
              {post.examTags?.map((tag, i) => {
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
          </div>
          <div className="options-list">
            <div className="answers">
              {post.options.length > 0 && isAnswered && optionAnswered 
                ? post.options.map((opt, i) => {
                    return (
                      <div
                        class={`answer ${
                          opt.id === optionAnswered?.id ? "selected" : ""
                        }`}
                      >
                        <span class="option-value">
                          {String.fromCharCode(opt.id + 96) + ") "}
                          {opt.value}
                        </span>
                        <span
                          class="percentage-bar"
                          style={{ width: calcPercentage(opt.id) + "%" }}
                        ></span>
                        <span class="percentage-value">
                          {calcPercentage(opt.id) + "%"}
                        </span>
                      </div>
                    );
                  }): post.options.map((opt, i) => {
                    return (
                      <div class={`answer`} >
                        <span class="option-value">
                          {String.fromCharCode(opt.id + 96) + ") "}
                          {opt.value}
                        </span>
                      </div>
                    );
                })}
            </div>
          </div>
          {isAnswered===true && post.dontKnow === false && correctOption && (
            <div className="correct-ans">
              Correct Answer: <span style={{fontWeight:700}}>{correctOption.map((com, i) => String.fromCharCode(com.id + 96) + ") " + com.value)}</span>
            </div>
          )}
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <div
                  className={
                    post.likers.filter((i) => i._id === userData?._id).length > 0
                      ? "isLiked"
                      : ""
                  }
                >
                  <i className="fas fa-heart"></i> {" "}
                  {post.likers ? post.likers.length : 0}
                </div>
              </li>
              <li>
                <div className="com">
                  <i className="fas fa-comment-alt"></i>{" "}
                   {post.comments && post.comments.length}
                </div>
              </li>
            </ul>
            <div href="/">
              <i className="fas fa-eye"></i>Views {post.viewers && post.viewers.length}
            </div>
            {post.options.length > 0 && (
              <div>
                <i class="far fa-calendar-check"></i>Votes{" "}
                {post.answeredBy ? post.answeredBy.length : 0}
              </div>
            )}
          </div>

        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default QuesPost;
