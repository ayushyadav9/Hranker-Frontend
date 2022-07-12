import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import Sidebar from '../../components/Stories/SIdebar/Sidebar';
import { baseURL } from "../../api";

import './Story.css';
import Loader from "../../utils/Loader";


function Story() {

  const [stories, setStories] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const user_id = userData?._id;
  const [dataRecaller, setDataRecaller] = useState(false);
  const[loaderState,setLoaderState]=useState(true);

  useEffect(() => {
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
        .then(async(data) => {
  
          await setStories(data.data);
          await setLoaderState(false);
  
        })
    }
  }, [dataRecaller,user_id]);

  return (



    <div className="App">
      {loaderState && <Loader isSmall={true}/>}
      {
        user_id && !loaderState &&
        <Sidebar
          stories={stories}
          user_id={user_id}
          dataRecaller={dataRecaller}
          setDataRecaller={setDataRecaller}
        />
      }

      {
        user_id && !loaderState &&
          <div className="no-story-view-message" >
            
            <img src="/images/no-story.svg" style={{maxWidth:"45%",maxHeight:"45%",marginBottom:"18px",padding:"20px"}}alt=""/>
            <h2>
              Select a Story to Watch
            </h2>
            <h2>

            </h2>

          </div>
      }

    </div>


  );
}

export default Story;