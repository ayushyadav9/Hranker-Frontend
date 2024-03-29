import React from "react";
import { useState,useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import CropIcon from '@mui/icons-material/Crop';
import Button from '@mui/material/Button';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Dialog,DialogTitle,DialogContent,DialogActions } from "@mui/material";
import CropEasy from "./imageCropModal";
import { baseURL } from "../../../api";

// css done
import "../Modals/createStoryModal.css";
import { Close } from "@mui/icons-material";



function CreateStory({ modalState,setModalState,user_id,dataRecaller,setDataRecaller }) {
    const [message,setMessage]=useState("Choose Image");
    const [btnState,setBtnState]=useState("disabled");
    const [imageUploadState,setImageUploadState]=useState(false);
    const [textState,setTextState]=useState(false);
    const [photoURL,setPhotoURL]=useState("");
    const [openCrop,setOpenCrop]=useState(false);


    const btnHandler=async ()=>{
        if(imageUploadState || textState){
            await setBtnState("contained");
        }
        else{
            await setBtnState("disabled");
        }
    }
    
    const textAreaHandler=async (e)=>{
        if(e.target.value===""){
            await setTextState(false);
        }
        else{
            await setTextState(true);
        }
        
    }
    
    async function imageUploadHandler(e){
        const file=e.target.files[0];
        let encoded="";
        var reader = new FileReader();  
        reader.onloadend = async function() {  
            encoded = reader.result;  
            await setPhotoURL(encoded);
        }  
        reader.readAsDataURL(file);
        
        await setMessage("Image Uploaded");
        await setImageUploadState(true);
        await setOpenCrop(true);
        
        
    }

    const dataPostHandler =async (e)=>{
        const text=document.getElementById("textHere").value;
        let type=2;
        if(imageUploadState){
            type=1;
        }
        
        
        await fetch(baseURL+"/stories/addStories",{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                user_id:user_id,
                type:type,
                image:photoURL,
                text:text
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{

        })
        

        await setDataRecaller(!dataRecaller);
        await setModalState(false);
    }
    
    useEffect(()=>{
        btnHandler();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[imageUploadState,textState]);



  return (
    <Dialog
        open={modalState}
        
    >
        <DialogTitle
            sx={{
                
               
            }}
        >
            <div
                style={{
                    "display":"flex",
                    "justifyContent":"space-between"

                }}
            >
                <strong style={{fontWeight:"bold"}}>
                    Create Story 
                </strong>
                <button style={{background:'none',border:'none'}}
                onClick={()=> setModalState(false)}>
                            <Close/>
                </button>
            </div>
        </DialogTitle>
        <DialogContent
            sx={{
                position: 'relative',
                height: 'fitContent',
                width: 'auto',
                minWidth: { sm: 500 },
            }}
        >
        

            <label htmlFor="image-input" id="image-label">
                <InsertPhotoIcon fontSize="large"/>
                <p>
                    {message}
                </p>
            </label>
            <input type="file" accept="image/*" name="imageInput" id="image-input" style={{}} onChange={(e)=>imageUploadHandler(e)}/>
            


            {
            (photoURL)&&
                <React.Fragment>
                    <div className="afterImageUpload">

                        <Avatar src={photoURL} sx={{ width: 50, height: 50 }}/>
                        <Button onClick={()=>setOpenCrop(true)}><CropIcon/></Button>
                    </div>
                </React.Fragment>
            }

            {/* <Divider/> */}

            <div className="text-input">
            <textarea name="" id="textHere" placeholder="Enter Your Story Here..." onChange={(e)=>textAreaHandler(e)}></textarea>
            </div>


        </DialogContent>

        <DialogActions
        >
                    
                        <Button variant="contained" onClick={()=>setModalState(false)}>Cancel</Button>
                        
                        <Button variant={btnState} onClick={(e)=>dataPostHandler(e)}>Create </Button>
                   
        </DialogActions>
            
        {
            (openCrop) &&
            <CropEasy photoURL={photoURL} setOpenCrop={setOpenCrop} setPhotoURL={setPhotoURL}/>
        }


    </Dialog>
    
  );
}

export default CreateStory;