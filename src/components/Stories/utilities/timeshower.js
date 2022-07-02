function timeshower(millis){
    let timesecond=millis/1000;
    if(timesecond<60) return "few seconds ago";
    let timeminute=timesecond/60;
    if(timeminute<2) return "1 minute ago";
    if(timeminute<60) return `${Math.floor(timeminute)} minutes ago`;
    let timehr=timeminute/60;
    if(timehr<2) return "1 hour ago";
    return `${Math.floor(timehr)} hours ago`;
}

module.exports =timeshower;