import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import Sidebar from '../../components/Stories/SIdebar/Sidebar';
import ViewStory from '../../components/Stories/ViewStory/ViewStory';
import { baseURL } from "../../api";

import './Story.css';

function StoryContent() {

  const [stories, setStories] = useState(null);
  const { userData } = useSelector((state) => state.user);
  
  const user_id = userData?._id;
  const [dataRecaller, setDataRecaller] = useState(false);
  const {id}=useParams();
  console.log(id);
  useEffect(() => {
    // console.log("use effect");
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
  }, [dataRecaller]);

  return (



    <div className="App">

      {/* <div>kjdsjfaks</div> */}

            <Sidebar
                stories={stories}
                user_id={user_id}
                dataRecaller={dataRecaller}
                setDataRecaller={setDataRecaller}
            />

      

            <ViewStory
              user_id={user_id}
              dataRecaller={dataRecaller}
              setDataRecaller={setDataRecaller}
            />
          }

       

    </div>


  );
}

export default StoryContent;