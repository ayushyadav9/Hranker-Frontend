import React, { useState } from "react";
import { baseURL } from "../../../api";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toggleBlogPopup } from "../../../redux/reducers/postReducers";
import { getNewsFeed } from "../../../redux/ApiCalls";
import { updatePoints } from "../../../redux/reducers/userReducers";

let defaultTags = [
  {
    id: 0,
    name: "SSC",
    isActive: 0,
  },
  {
    id: 1,
    name: "Banking",
    isActive: 0,
  },
  {
    id: 2,
    name: "Railways",
    isActive: 0,
  },
  {
    id: 3,
    name: "Defence",
    isActive: 0,
  },
  {
    id: 4,
    name: "Teaching",
    isActive: 0,
  },
  {
    id: 5,
    name: "Dehli Police",
    isActive: 0,
  },
  {
    id: 6,
    name: "NEET",
    isActive: 0,
  },
  {
    id: 7,
    name: "JEE",
    isActive: 0,
  },
  {
    id: 8,
    name: "HSSC",
    isActive: 0,
  },
  {
    id: 9,
    name: "IB",
    isActive: 0,
  },
];
const BlogPost = () => {
  const [isLoader, setisLoader] = useState(false);
  const {popups} = useSelector((state)=>state.post)
  const {userToken} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const [tags, setTags] = useState(defaultTags);
  const [formData, setformdata] = useState({
    title: "",
    description: "",
    image: null,
    examTags: [],
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
    dispatch(toggleBlogPopup())
  };

  const handelPost = (e) => {
    e.preventDefault();
    let selectedtags = tags.filter((i) => i.isActive).map((key) => key.name);
    formData.examTags = selectedtags;
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
            dispatch(updatePoints(-25))
            dispatch(toggleBlogPopup())
            dispatch(getNewsFeed(userToken))
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
  };

  return (
    <div className={`post-popup pst-pj ${popups.blogPopup===true ? "active" : ""}`}>
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
                  onChange={(e) =>
                    setformdata({ ...formData, title: e.target.value })
                  }
                />
              </div>
              {tags.map((tag, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      handelTagging(tag.id);
                    }}
                    className={`tags ${tag.isActive ? "active" : ""}`}
                  >
                    {tag.name}
                  </div>
                );
              })}

              {/* <div className="col-lg-12">
                <div className="inp-field">
                  <select>
                    <option>Category</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </select>
                </div>
              </div> */}

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
                    <button onClick={(e)=>handelClose(e)} title="">
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
