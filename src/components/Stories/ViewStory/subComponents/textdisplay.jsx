import './textdisplay.css'
// import './textdisplay1.css';
const Textdisplay1=({text})=>{
       return(
        <div className="display1">
            <div>
                <p>
                    {text}
                </p>
            </div>
        </div>
       )
}
// export default Textdisplay1;

const Textdisplay2=({text})=>{
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

export {Textdisplay1,Textdisplay2}
