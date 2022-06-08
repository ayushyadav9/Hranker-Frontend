import React, { useState } from "react";

const QuesPost = ({handelPopupClose, isActive, setisActive,}) => {

  const [question, setQuestion] = useState({
    title:"",
    description:"",
    options:[
      {
        placeholder:"Option 1",
        value:"",
        isCorrect: false
      },
      {
        placeholder:"Option 2",
        value:"",
        isCorrect: false
      },
    ]
  })

  const handelClose = (e)=>{
    e.preventDefault()
    handelPopupClose()
  }
  return (
    <div className={`post-popup pst-pj ${isActive===2?"active":""}`}>
      <div className="post-project">
        <h3>Post a Question</h3>
        <div className="post-project-fields">
          <form>
            <div className="row">
              <div className="col-lg-12">
                <input type="text" name="title" value={question.title} onChange={(e)=>setQuestion({...question, title:e.target.value})} placeholder="Title" />
              </div>
              <div className="col-lg-12">
                <textarea
                  name="description"
                  placeholder="Description"
                ></textarea>
              </div>
              {question.options.map((op,i)=>{
                return (
                  <div className="col-lg-12" key={i}>
                    <input type="text" name="title" placeholder={op.placeholder} />
                  </div>
                )
              })}
              <div className="col-lg-12">
                <ul>
                  <li>
                    <button className="active" type="submit" value="post">
                      Post
                    </button>
                  </li>
                  <li>
                    <button onClick={handelClose} title="">
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>

        <span className="close" onClick={handelClose} title="">
          <i className="la la-times-circle-o"></i>
        </span>
      </div>
    </div>
  );
};

export default QuesPost;
