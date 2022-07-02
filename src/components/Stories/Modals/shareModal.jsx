import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    RedditShareButton
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    RedditIcon
} from "react-share";

const ShareModal=({shareModal,setShareModal})=>{

    const myStyle={
        paddingRight:"5px"
    }
    return(
        <>
            <Dialog
            open={shareModal}
            >
                <DialogTitle>
                    <div
                        style={{
                            "display":"flex",
                            "justifyContent":"space-between"

                        }}
                    >

                        <strong>
                            Share Your Story
                        </strong>
                        <Button style={{padding:"0",minWidth:"0"}} onClick={async()=> await setShareModal(false)}>

                            <CloseIcon/>
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                
                    <EmailShareButton
                     url={window.location.href}
                    >
                        <EmailIcon style={myStyle} size={48} round={true}/>
                    </EmailShareButton >
                    <FacebookShareButton
                     url={window.location.href}
                    >
                        <FacebookIcon style={myStyle} size={48} round={true}/>
                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                     url={window.location.href}
                    >
                        <FacebookMessengerIcon style={myStyle} size={48} round={true}/>
                    </FacebookMessengerShareButton>

                    <RedditShareButton
                     url={window.location.href}
                    >
                        <RedditIcon style={myStyle} size={48} round={true}/>
                    </RedditShareButton>
                    

                    <TelegramShareButton
                     url={window.location.href}
                    >
                        <TelegramIcon style={myStyle} size={48} round={true}/>
                    </TelegramShareButton>

                    <WhatsappShareButton
                     url={window.location.href}
                    >
                        <WhatsappIcon style={myStyle} size={48} round={true}/>
                    </WhatsappShareButton>
                    
                    <LinkedinShareButton
                     url={window.location.href}
                    >
                        <LinkedinIcon style={myStyle} size={48} round={true}/>
                    </LinkedinShareButton>
                    
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShareModal;