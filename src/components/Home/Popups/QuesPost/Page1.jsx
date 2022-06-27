import React from "react";
import Loader from "../../../../utils/Loader";
import FileBase64 from 'react-file-base64';
import { useState } from "react";
import { defaultTags } from "../../../../utils/defaultTags";


const Page1 = ({
  handelUpdateOption,
  handelDeleteOption,
  handelAddOptions,
  question,
  setQuestion,
  options,
  setoptions,
  selectedTags,
  setselectedTags,
  handelClose,
  setactive,
  handelPost,
  isLoader
}) => {
  const [examTagText, setExamTagText] = useState("")
  const [filteredTags, setFilteredTags] = useState([])

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
    const newFilter = defaultTags.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredTags([]);
    } else {
      setFilteredTags(newFilter);
    }
  };

  const handelTagSelection = (tag) =>{
    if(selectedTags.indexOf(tag) === -1) {
      setselectedTags([...selectedTags,tag]);
    }
  }

  const handelTagRemove = (tag) =>{
    let t = [...selectedTags]
    const index = t.indexOf(tag)
    t.splice(index, 1);
    setselectedTags(t);
  }

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
        <div className="col-lg-12">
          <ul>
            {selectedTags.map((val,i)=>{
              return(
                <li>
                  <div title="" className="skl-name">
                    {val}
                    <i onClick={()=>{handelTagRemove(val)}} className="la la-close"></i>
                  </div>
                </li>
              )
            })}
            
          </ul>
          <form>
            <input
              type="text"
              onChange={handleFilter}
              value={examTagText}
              placeholder="ExamTags"
            />
            {filteredTags.length !== 0 && (
              <div className="dataResult">
                {filteredTags.slice(0, 5).map((value, key) => {
                  return (
                    <div onClick={()=>handelTagSelection(value.name)} className="dataItem">
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
            multiple={false}
            onDone={({ base64 }) => setQuestion({ ...question, image: base64 })}
          />
        </div>

        <div className="col-lg-12">
          <textarea
            style={{ height: "64%" }}
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
