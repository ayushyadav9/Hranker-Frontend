import React, { useRef } from "react";
import Loader from "../../../../utils/Loader";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { subjects } from "../../../../utils/defaultTags";
import { useEffect } from "react";

const Page1 = ({
  handelUpdateOption,
  handelDeleteOption,
  handelAddOptions,
  question,
  setQuestion,
  options,
  setoptions,
  examTags,
  handelTagging,
  subjectTags,
  setsubjectTags,
  handelClose,
  setactive,
  handelPost,
  isLoader,
}) => {
  const [examTagText, setExamTagText] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const tagRef = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!tagRef.current.contains(e.target)) {
        setFilteredTags([]);
      }
    });
    // eslint-disable-next-line
  }, []);

  const handelSave = (e) => {
    e.preventDefault();
    handelPost();
  };
  const handelChange = (e) => {
    let t = options.filter((item) => item.value.length > 0);
    setoptions(t);
    e.preventDefault();
    setactive(1);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setExamTagText(searchWord);
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
    setExamTagText("");
  };

  const handelTagRemove = (tag) => {
    let t = [...subjectTags];
    const index = t.indexOf(tag);
    t.splice(index, 1);
    setsubjectTags(t);
  };

  return (
    <form>
      <div className="row">
        <div className="col-lg-12">
          <input
            type="text"
            name="title"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
            placeholder="Title"
          />
        </div>
        <div className="col-lg-12" style={{marginBottom:"10px"}}>
          {examTags.map((tag, i) => {
            return (
              <div
                key={i}
                onClick={() => {handelTagging(tag.id)}}
                className={`tags ${tag.isActive ? "active" : ""}`}
              >
                {tag.name}
              </div>
            );
          })}
        </div>

        <div ref={tagRef} className="col-lg-12">
          {subjectTags.length > 0 && (
            <ul>
              {subjectTags.map((val, i) => {
                return (
                  <li>
                    <div title="" className="skl-name">
                      {val}
                      <i
                        onClick={() => {
                          handelTagRemove(val);
                        }}
                        className="la la-close"
                      ></i>
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
              value={examTagText}
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
          <FileBase64
            className="custom-file-input"
            type="file"
            placeholder="nsd"
            multiple={false}
            onDone={({ base64 }) => setQuestion({ ...question, image: base64 })}
          />
        </div>

        <div className="col-lg-12">
          <textarea
            style={{ height: "80px" }}
            name="description"
            placeholder="Question"
            value={question.description}
            onChange={(e) =>
              setQuestion({ ...question, description: e.target.value })
            }
          ></textarea>
        </div>
        {options.map((op, i) => {
          return (
            <div className="col-lg-6 ques-options" key={i}>
              <textarea
                type="textarea"
                name="title"
                placeholder={"Option " + op.id}
                value={op.value}
                onChange={(e) => handelUpdateOption(e, op.id)}
              />

              <div onClick={() => handelDeleteOption(op.id)}>
                <img src="/images/close.svg" alt=""></img>
              </div>
            </div>
          );
        })}
        <div className="col-lg-12">
          <ul>
            {options.length > 0 ? (
              <li>
                <button
                  onClick={handelChange}
                  className="active"
                  type="submit"
                  value="post"
                >
                  Next
                </button>
              </li>
            ) : (
              <li>
                <button className="active" value="post" onClick={handelSave}>
                  {isLoader ? <Loader isSmall={true} /> : "Post"}
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handelAddOptions}
                className="active"
                type="submit"
                value="post"
              >
                Add Options
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
  );
};

export default Page1;
