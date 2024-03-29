import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import Sidebar from '../../components/Stories/SIdebar/Sidebar';
import ViewStory from '../../components/Stories/ViewStory/ViewStory';
import { baseURL } from "../../api";
import Loader from "../../utils/Loader";

import './Story.css';

function StoryContent() {

    const [stories, setStories] = useState(null);
    // let  { isLoggedIn } = useSelector((state)=>state.user);

    const { userData } = useSelector((state) => state.user);

    const user_id = userData?._id;
    const[loaderState,setLoaderState]=useState(true);
    const [dataRecaller, setDataRecaller] = useState(false);

    useEffect(() => {
        // if(user_id){

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
                    await setLoaderState(false)
    
                })
        // }
    }, [dataRecaller,user_id]);

    return (



        <div className="App">
            {loaderState && user_id && <Loader isSmall={true}/>}

            
            {
                !loaderState && 
                <Sidebar
                    stories={stories}
                    user_id={user_id}
                    dataRecaller={dataRecaller}
                    setDataRecaller={setDataRecaller}
                />
            }    

            
            {
                stories && 
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