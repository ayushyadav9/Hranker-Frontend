import React from "react";
import Loader from "../../../../utils/Loader";

const Page2 = ({ options, handelClose, setactive, setoptions, handelPost, setdontKnow, dontKnow, isLoader }) => {
  
  const handelBack = (e) => {
    e.preventDefault();
    setactive(0);
  };
  const handelDontKnow = () => {
    setdontKnow((prev) => !prev);
    let t = options.map((item, i) => {
      item.isCorrect = false;
      return item;
    });
    setoptions(t);
  };
  const handelCorrect = (id) => {
    let t = options.map((item, i) => {
      if (item.id === id) {
        item.isCorrect = !item.isCorrect;
      } else {
        item.isCorrect = false;
      }
      return item;
    });
    setdontKnow(false)
    setoptions(t);
  };
  const handelSave = (e)=>{
    e.preventDefault();
    handelPost();
  }
  return (
    <form className="page2">
      <h2>Select the Correct option</h2>
      <div className="row">
        {options.map((op, i) => {
          return (
            <div
              onClick={() => handelCorrect(op.id)}
              className={`col-lg-12 select-options ${
                op.isCorrect ? "isCorrect" : ""
              }`}
              key={i}
            >
              {op.id + ") "} {op.value}
            </div>
          );
        })}
        <div
          onClick={handelDontKnow}
          className={`col-lg-12 select-options-dont-know ${dontKnow ? "isCorrect" : ""}`}
        >
          Don't Know
        </div>
        <div className="col-lg-12">
          <ul>
            <li>
              <button onClick={handelBack} title="">
                Back
              </button>
            </li>
            <li>
              <button onClick={handelClose} title="">
                Cancel
              </button>
            </li>
            <li>
              <button onClick={handelSave} className="active" type="submit" value="post">
              {isLoader ? <Loader isSmall={true} /> : "Post"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default Page2;
