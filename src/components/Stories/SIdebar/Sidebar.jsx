import{useState} from 'react';
import {
    NavLink
} from 'react-router-dom';
import { baseURL } from '../../../api';

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
                    <div className="All-Story-List">


                            <p className="divider">Your Stories</p>
                                {
                                    
                                        
                                            stories &&
                                            stories[0].map(story=>{
                                                return(
                                                    
                                                        
                                                        <NavLink
                                                            to={story._id}
                                                        >
                                                            <div
                                                            >
                                                                <SingleStory profilePicSrc={baseURL+"/file/"+story.user.image} username={story.user.name} createdAt={story.createdAt}/>
                                                                
                                                            </div>
                                                        </NavLink>
                                                )
                                            })
                                        
                                    
                                }

                            <p className="divider">Others Stories</p>

                            {
                                stories &&

                                        stories[1].map(story=>{
                                            return(
                                                <NavLink
                                                    to={story._id}
                                                >
                                                    <SingleStory profilePicSrc={baseURL+"/file/"+story.user.image} username={story.user.name} createdAt={story.createdAt}/>
        
                                                </NavLink>
                                            )
                                        })
                        
                            }
                    </div>
                </div>

                <div className="Sidebar-Footer-Story-Add">
                    <button  className='btn' onClick={()=>setCreateStoryModalState(true)}>
                        
                        <span style={{fontSize:"22px"}}>+</span>
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