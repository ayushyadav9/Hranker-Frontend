export const func = (millis) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var createdAt = new Date(millis);
    var date = createdAt.getDate() + "";
    date =
      date.padStart(2, "0") +
      " " +
      months[createdAt.getMonth()] +
      ", " +
      createdAt.getFullYear();
    date += " " + createdAt.getHours() + ":" + createdAt.getMinutes();
    return date;
  };
  
  export const getDateAndTime = (millis)=>{
    var today = new Date();
    var postedOn = new Date(millis);
    var diffMs = (today - postedOn);
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  
    // console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes");
    if(diffDays>0 && diffDays<70) return  diffDays + " day ago"
    if(diffDays>=7 && diffDays<=30) return diffDays%7 + " week ago";
    if(diffDays>30) return func(millis);
    if(diffHrs>0) return diffHrs + " hour ago"
    return diffMins + " mins ago"
  }

  export const chatTime = (millis) => {
    var date_format = "12"; /* FORMAT CAN BE 12 hour (12) OR 24 hour (24)*/

    var d = new Date(millis);
    var hour = d.getHours(); /* Returns the hour (from 0-23) */
    var minutes = d.getMinutes(); /* Returns the minutes (from 0-59) */
    var result = hour;
    var ext = "";

    if (date_format === "12") {
      if (hour > 12) {
        ext = "PM";
        hour = hour - 12;
        result = hour;

        if (hour < 10) {
          result = "0" + hour;
        } else if (hour === 12) {
          hour = "00";
          ext = "AM";
        }
      } else if (hour < 12) {
        result = hour < 10 ? "0" + hour : hour;
        ext = "AM";
      } else if (hour === 12) {
        ext = "PM";
      }
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    result = result + ":" + minutes + " " + ext;
    return result
  };


  export const userRank = (id) => {
    if (id === 1) {
      return <img className="rank-img" src="/images/first.png" alt=""></img>;
    } else if (id === 2) {
      return <img className="rank-img" src="/images/second.png" alt=""></img>;
    } else if (id === 3) {
      return <img className="rank-img" src="/images/third.png" alt=""></img>;
    } else {
      return <div style={{ width: "20px", height: "20px" }}>{id}</div>;
    }
  };