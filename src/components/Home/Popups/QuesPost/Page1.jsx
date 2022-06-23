import React from "react";
import Loader from "../../../../utils/Loader";

const Page1 = ({
  handelUpdateOption,
  handelDeleteOption,
  handelAddOptions,
  handelTagging,
  question,
  setQuestion,
  options,
  setoptions,
  tags,
  handelClose,
  setactive,
  handelPost,
  isLoader
}) => {
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
