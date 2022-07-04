import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import Sidebar from '../../components/Stories/SIdebar/Sidebar';
import { baseURL } from "../../api";

import './Story.css';


function Story() {

  const [stories, setStories] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const user_id = userData?._id;
  const [dataRecaller, setDataRecaller] = useState(false);

  useEffect(() => {
    // console.log("use effect");
    if(user_id){

      fetch(baseURL + "/stories", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          user_id: user_id
        })
      })
        .then((res) => {
  
          return res.json();
        })
        .then((data) => {
  
          setStories(data.data);
  
        })
    }
  }, [dataRecaller,user_id]);

  return (



    <div className="App">

      {
        user_id &&
        <Sidebar
          stories={stories}
          user_id={user_id}
          dataRecaller={dataRecaller}
          setDataRecaller={setDataRecaller}
        />
      }
      {
        user_id &&
          <div className="no-story-view-message" >
            
            <img src="/images/no-story.svg" style={{maxWidth:"400px",maxHeight:"300px"}}alt=""/>
            <h2>
              Click on Stories to See..., Or Create Your Own
            </h2>
            <h2>

            </h2>

          </div>
      }

    </div>


  );
}

export default Story;