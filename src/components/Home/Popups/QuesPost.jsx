import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../../api";
import { getNewsFeed } from "../../../redux/ApiCalls";
import { toast } from "react-toastify";
import { toggleQuesPopup } from "../../../redux/reducers/postReducers";
import { updatePoints } from "../../../redux/reducers/userReducers";
import { defaultTags } from "../../../utils/defaultTags";
import Page1 from "./QuesPost/Page1";
import Page2 from "./QuesPost/Page2";
import { useEffect } from "react";

const QuesPost = () => {
  const dispatch = useDispatch();
  const { popups } = useSelector((state) => state.post);
  const { userToken } = useSelector((state) => state.user);
  const [tags, setTags] = useState(defaultTags);
  const [question, setQuestion] = useState({ title: "", description: "",image:null });
  const [options, setoptions] = useState([]);
  const [dontKnow, setdontKnow] = useState(false);
  const [active, setactive] = useState(0);
  const [isLoader, setisLoader] = useState(false)

  useEffect(() => {
    setTags(defaultTags)
  }, [])
  

  const handelTagging = (id) => {
    let t = [...tags];
    t[id].isActive = !t[id].isActive;
    setTags(t);
  };
  const handelAddOptions = (e) => {
    e.preventDefault();
    setoptions([
      ...options,
      {
        id: (options.length + 1),
        value: "",
        isCorrect: false,
      },
    ]);
  };
  const handelDeleteOption = (id) => {
    console.log(id);
    let t = options.filter((item) => {
      return item.id !== id;
    });
    for(let i=id-1;i<t.length;i++){
      t[i].id--;
    }
    setoptions(t);
  };
  const handelUpdateOption = (e, id) => {
    let t = options.map((item, i) => {
      if (item.id === id) {
        item.value = e.target.value;
      }
      return item;
    });
    setoptions(t);
  };
  const resetData = ()=>{
    setQuestion({
      title: "",
      description: ""
    });
    setTags(defaultTags);
    setactive(0)
    setoptions([])
  }

  const handelPost = ()=>{
    let t = question;
    t.options = options;
    t.dontKnow = dontKnow
    let selectedtags = tags.filter((i) => i.isActive).map((key) => key.name);
    t.examTags = selectedtags;

    setisLoader(true);
    fetch(`${baseURL}/post/addQues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
      body: JSON.stringify({formData: t}),
    })
      .then((res) => res.json())
      .then(
        async (result) => {
          
          if (result.success) {
            resetData();
            dispatch(getNewsFeed(userToken));
            dispatch(updatePoints(-25));
            
            toast.success("Post added successfuly");
            // window.location.reload()
          } else {
          }
          console.log(result);
          dispatch(toggleQuesPopup());
          setisLoader(false);
        },
        (error) => {
          console.log(error);
        }
      );
      
    console.log(t)
  }
  
  const handelClose = (e) => {
    e.preventDefault();
    dispatch(toggleQuesPopup());
  };
  
  return (
    <div
      className={`post-popup pst-pj ${
        popups.quesPopup === true ? "active" : ""
      }`}
    >
      <div className="post-project">
        <h3>Post a Question</h3>
        <div className="post-project-fields">
          {active === 0 && (
            <Page1
              handelUpdateOption={handelUpdateOption}
              handelDeleteOption={handelDeleteOption}
              handelAddOptions={handelAddOptions}
              handelTagging={handelTagging}
              question={question}
              setQuestion={setQuestion}
              options={options}
              setoptions = {setoptions}
              tags={tags}
              isLoader={isLoader}
              handelClose={handelClose}
              setactive={setactive}
              handelPost={handelPost}
            />
          )}
          {active === 1 && (
            <Page2 
              options={options} 
              handelClose={handelClose}
              setactive={setactive}
              setoptions={setoptions}
              handelPost={handelPost}
              dontKnow={dontKnow} 
              isLoader={isLoader}
              setdontKnow={setdontKnow}
            />
          )}
        </div>

        <span className="close" onClick={handelClose} title="">
          <i className="la la-times-circle-o"></i>
        </span>
      </div>
    </div>
  );
};

export default QuesPost;
