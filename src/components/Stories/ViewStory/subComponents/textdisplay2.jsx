
import './textdisplay2.css'
const Textdisplay2 =({text})=>{
    console.log(text);
    return(
        <div className="display2">
            
            <div >
                <p>
                    {text}
                </p>
                
            </div>

            
        </div>
    )
}

export default Textdisplay2;