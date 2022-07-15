import React, { useState } from "react";
import { baseURL } from "../../../api";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toggleBlogPopup } from "../../../redux/reducers/postReducers";
import { getNewsFeed } from "../../../redux/ApiCalls";
import { updatePoints } from "../../../redux/reducers/userReducers";
import FileBase64 from "react-file-base64";
import { defaultTags, subjects } from "../../../utils/defaultTags";
import { useRef } from "react";

const BlogPost = () => {
  const [isLoader, setisLoader] = useState(false);
  const { popups } = useSelector((state) => state.post);
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const tagRef = useRef();
  const [tags, setTags] = useState(defaultTags);
  const [otherTag, setotherTag] = useState("")
  const [subjectTags, setsubjectTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [subSearchText, setsubSearchText] = useState("");
  const [formData, setformdata] = useState({
    title: "",
    description: "",
    image: null,
    examTags: [],
    subjectTags: [],
  });

  const resetData = () => {
    setformdata({
      title: "",
      description: "",
      image: null,
      examTags: [],
    });
    setTags([...defaultTags]);
  };

  const handelTagging = (id) => {
    let t = [...tags];
    t[id].isActive = !t[id].isActive;
    setTags(t);
  };

  const handelClose = (e) => {
    e.preventDefault();
    dispatch(toggleBlogPopup());
  };

  const handelPost = (e) => {
    e.preventDefault();
    if (formData.title.length > 0 && formData.description.length > 0) {
      let selectedtags = tags.filter((i) => i.isActive).map((key) => key.name);
      formData.examTags = selectedtags;
      formData.subjectTags = subjectTags;
      setisLoader(true);
      fetch(`${baseURL}/post/addBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setisLoader(false);
            if (result.success) {
              dispatch(updatePoints(-25));
              dispatch(toggleBlogPopup());
              dispatch(getNewsFeed(userToken));
              toast.success("Post added successfuly");
              resetData();
            } else {
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      toast.info("Please add title and description");
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setsubSearchText(searchWord);
    const newFilter = subjects.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredTags([]);
    } else {
      setFilteredTags(newFilter);
    }
  };

  const handelTagSelection = (tag) => {
    if (subjectTags.indexOf(tag) === -1) {
      setsubjectTags([...subjectTags, tag]);
    }
    setFilteredTags([]);
    setsubSearchText("");
  };

  const handelTagRemove = (tag) => {
    let t = [...subjectTags];
    const index = t.indexOf(tag);
    t.splice(index, 1);
    setsubjectTags(t);
  };

  const handelOtherTag=(e)=>{
    e.preventDefault()
    if(otherTag.length>0){
      let t ={
        id: tags.length,
        name: otherTag,
        isActive: 1,
      };
      setTags([...tags,t]);
      setotherTag("")
    }
  }

  return (
    <div
      className={`post-popup pst-pj ${
        popups.blogPopup === true ? "active" : ""
      }`}
    >
      <div className="post-project">
        <h3>Post a Blog</h3>
        <div className="post-project-fields">
          <form>
            <div className="row">
              <div className="col-lg-12">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>setformdata({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="col-lg-12" style={{marginBottom:"10px"}}>
                {tags.map((tag, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {handelTagging(tag.id) }}
                      className={`tags ${tag.isActive ? "active" : ""}`}
                    >
                      {tag.name}
                    </div>
                  );
                })}
                <div className="tags">
                  <form onSubmit={handelOtherTag}>
                    <input 
                      className="tag-input"
                      value={otherTag}
                      onChange = {(e)=>setotherTag(e.target.value)}
                      placeholder="Other"/>
                      <button type="submit" style={{display:"none"}} onClick={handelOtherTag}></button>
                  </form>
                </div>
              </div>

              <div ref={tagRef} className="col-lg-12">
                {subjectTags.length > 0 && (
                  <ul>
                    {subjectTags.map((val, i) => {
                      return (
                        <li>
                          <div title="" className="skl-name">
                            {val}
                            <i onClick={() => {handelTagRemove(val)}} className="la la-close"></i>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <form>
                  <input
                    type="text"
                    onChange={handleFilter}
                    value={subSearchText}
                    placeholder="Search for Subjects"
                  />
                  {filteredTags.length !== 0 && (
                    <div className="dataResult">
                      {filteredTags.map((value, key) => {
                        return (
                          <div
                            onClick={() => handelTagSelection(value.name)}
                            className="dataItem"
                          >
                            <p>{value.name} </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </form>
              </div>
              <div className="col-lg-12">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setformdata({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="col-lg-12">
                <div className="">
                  <FileBase64
                    className="custom-file-input"
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setformdata({ ...formData, image: base64 })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <ul>
                  <li>
                    <button
                      onClick={handelPost}
                      className="active"
                      type="submit"
                      value="post"
                    >
                      {isLoader ? <Loader isSmall={true} /> : "Post"}
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => handelClose(e)} title="">
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

export default BlogPost;
