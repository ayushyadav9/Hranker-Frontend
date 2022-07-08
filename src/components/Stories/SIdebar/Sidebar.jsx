import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import{useState} from 'react';
import {
    NavLink
} from 'react-router-dom';
// import { baseURL } from '../../../api';

import CreateStory from '../Modals/createStoryModal';
import SingleStory from '../utilities/singleStory';
import './sidebar.css';




const Sidebar = 
    (
        {   stories,
            user_id,
            dataRecaller,
            setDataRecaller
        }
    )=>{
    
    const[createStoryModalState,setCreateStoryModalState]=useState(false);

    return(
        <div>

            <div className="Sidebar">
                
                
                <div className="Sidebar-Content-Scroller">
                    <h2>Stories</h2>
                    <Divider/>
                    <div className="All-Story-List">


                            <p className="divider">Your Stories</p>
                                {
                                    stories && stories[0].length===0 && 
                                    <>
                                        <p className='no-story-message'> No Stories Found  </p>
                                    </>
                                }
                                {
                                    
                                        
                                            stories &&
                                            
                                                stories[0].map(story=>{
                                                    return(
                                                        
                                                            

                                                                <NavLink
                                                                    to={"/stories/"+story._id}
                                                                    key={story._id}
                                                                    className={isActive => " "+ (isActive.isActive ? "navLinkActive":'')}
                                                                >
                                                                    <div
                                                                    >
                                                                        <SingleStory profilePicSrc={story.user.image} username={story.user.name} createdAt={story.createdAt}/>
                                                                        
                                                                    </div>
                                                                </NavLink>
                                                            
                                                    )
                                                })

                                        
                                    
                                }
                            
                            <p className="divider">Others Stories</p>
                            {
                                    stories && stories[1].length===0 && 
                                    <>
                                        <p className='no-story-message'> No Community Stories Found  </p>
                                    </>
                            }

                            {
                                stories &&

                                        stories[1].map(story=>{
                                            return(
                                                
                                                    <NavLink
                                                        to={"/stories/"+story._id}
                                                        key={story._id}
                                                        className={isActive => " "+ (isActive.isActive ? "navLinkActive":'')}

                                                    >
                                                        <SingleStory profilePicSrc={story.user.image} username={story.user.name} createdAt={story.createdAt}/>
            
                                                    </NavLink>

                                                
                                            )
                                        })
                        
                            }
                    </div>
                </div>

                <div className="Sidebar-Footer-Story-Add">
                    <button  className='btn' onClick={()=>setCreateStoryModalState(true)}>
                        
                        <span style={{}}><AddIcon/></span>
                        &nbsp;
                        <span>
                            Create Story
                        </span>
                    </button>
                </div>
            </div>

            {   createStoryModalState && 
                <CreateStory 
                    modalState={createStoryModalState} 
                    setModalState={setCreateStoryModalState} 
                    user_id={user_id}  
                    dataRecaller={dataRecaller} 
                    setDataRecaller={setDataRecaller}
                />
            }
        </div>

            
    )
}

export default Sidebar;