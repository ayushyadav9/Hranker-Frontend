import { Dialog, DialogContent, DialogTitle,Button, Divider  } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SingleStory from "../utilities/singleStory";


const ViewersListShow= ({Viewers,openViewersList,setOpenViewersList})=>{
    const length=Viewers.length
    return(
        <Dialog
            open={openViewersList}
        >
            <DialogTitle>
                    <div
                        style={
                            {
                                "display":'flex',
                                "justifyContent":'space-between',
                            }}
                    >

                        <storng>
                            viewed by {length}
                        </storng>
                        <Button style={{padding:"0",minWidth:"0"}} onClick={async()=> await setOpenViewersList(false)}>

                                <CloseIcon/>
                        </Button>
                    </div>
                
            </DialogTitle>
            <Divider/>
            <DialogContent
                sx={{
                    
                    position: 'relative',
                    height: 400,
                    width: 'auto',
                    minWidth: 500 ,
                  }}
            >
                {
                    Viewers.slice(0).reverse().map((viewer,index)=>{
                        return(
                            <div key={index}>

                                <SingleStory profilePicSrc={viewer.image} username={viewer.username} createdAt={viewer.createdAt}/>
                            </div>
                        )
                    })
                }
            </DialogContent>
        </Dialog>
    )
}

export default ViewersListShow;