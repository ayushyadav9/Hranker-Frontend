import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../api";
import { getConversations } from "../../redux/ApiCalls";
import { getDateAndTime } from "../../utils/timeCalculator";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const { userToken, userData } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.chat);
  const [convoData, setconvoData] = useState(null);
  const [activeChat, setactiveChat] = useState(null);
  const [messages, setmessages] = useState(null);
  const [messageText, setmessageText] = useState("")
  const [onlineUsers, setonlineUsers] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef()
  const socket = useRef();

  useEffect(() => {
    if (userToken) {
      dispatch(getConversations(userToken));
    }
    // eslint-disable-next-line
  }, [userToken]);

  useEffect(() => {
    socket.current = io(baseURL);
    socket.current.on("getMessage", (data) => {
      console.log(data)
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: data.createdAt,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
    activeChat._id === arrivalMessage.senderId &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, activeChat]);

  useEffect(() => {
    if(userData){
      socket.current.emit("addUser", userData._id);
      socket.current.on("getUsers", (users) => {
        let t = users.map(item=>{
          return item.userId
        })
        setonlineUsers(t)
      });
    }
  }, [userData]);

  useEffect(() => {
    if (conversations && userData) {
      let t = [];
      for (let i = 0; i < conversations.length; i++) {
        let mems = conversations[i].members.filter((it) => {
          return it._id !== userData._id;
        })[0];
        let tmems = JSON.parse(JSON.stringify(mems));
        tmems.convId = conversations[i]._id;
        tmems.lastMessage = conversations[i].lastMessage
          ? conversations[i].lastMessage
          : "";
        t.push(tmems);
      }
      console.log(t)
      setconvoData(t);
    }
  }, [conversations, userData]);

  const handelChatData = async (con) => {
    setactiveChat(con);
    setmessages([])
    fetch(`${baseURL}/chat/getMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
      },
      body: JSON.stringify({ convId: con.convId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setmessages(result.data);
          } 
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handelSendMessage = (e)=>{
    e.preventDefault()

    socket.current.emit("sendMessage", {
      senderId: userData._id,
      receiverId: activeChat._id,
      text: messageText,
    });
    setmessages([
      ...messages,
      {
        conversationId: activeChat.convId,
        senderId: userData._id,
        createdAt: new Date().getTime(),
        text: messageText,
      },
    ]);
    if(messageText.length>0){
      fetch(`${baseURL}/chat/addMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userJWT")}`,
        },
        body: JSON.stringify({ text: messageText, convId: activeChat.convId }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setmessageText("")
            if (result.success) {
              // setmessages([...messages,result.data])
            } 
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  return (
    <>
      <section class="messages-page">
        <div class="container">
          <div class="messages-sec">
            <div class="row">
              <div class="col-lg-4 col-md-12 no-pdd">
                <div class="msgs-list">
                  <div class="msg-title">
                    <h3>Messages</h3>
                    <ul>
                      <li>
                        <a href="/" title="">
                          <i class="fa fa-cog"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/" title="">
                          <i class="fa fa-ellipsis-v"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="messages-list">
                    <ul>
                      {convoData?.map((con, i) => {
                        return (
                          <li
                            onClick={() => handelChatData(con)}
                            key={i}
                            class={activeChat && activeChat._id === con._id ? "active" : ""}
                          >
                            <div class="usr-msg-details">
                              <div class="usr-ms-img">
                                <img src={con.image?baseURL + "/file/" + con.image:"/images/luser.jpg"} alt="" />
                                {onlineUsers.includes(con._id) && <span class="msg-status"></span>}
                              </div>
                              <div class="usr-mg-info">
                                <h3>{con.name}</h3>
                                <p>{con.lastMessage?.text} </p>
                              </div>
                              <span class="posted_time">{con.lastMessage? getDateAndTime(con.lastMessage.createdAt): ""}</span>
                              {/* <span class="msg-notifc">1</span> */}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-12 pd-right-none pd-left-none">
                <div class="main-conversation-box">
                  <div class="message-bar-head">
                    <div class="usr-msg-details">
                      <div class="usr-ms-img">
                        <img src={activeChat?.image? baseURL + "/file/" + activeChat.image:"/images/luser.jpg"} alt="" />
                      </div>
                      <div class="usr-mg-info">
                        {onlineUsers.includes(activeChat?._id)? 
                          <><h3>{activeChat? activeChat.name:""}</h3>
                          <p>Online</p></>:
                          <h3 className="isOnline">{activeChat? activeChat.name:""}</h3>
                        }
                        
                      </div>
                    </div>
                    <a href="/" title="">
                      <i class="fa fa-ellipsis-v"></i>
                    </a>
                  </div>
                  <div class="messages-line">
                    
                    {userData && messages?.map((mes, i) => {
                      return mes.senderId === userData._id ? (
                        <div ref={scrollRef} class="main-message-box ta-right">
                          <div class="message-dt">
                            <div class="message-inner-dt">
                              <p>{mes.text}</p>
                            </div>
                            <span>{getDateAndTime(mes.createdAt)}</span>
                          </div>
                          <div class="messg-usr-img">
                            <img src={userData?.image?baseURL + "/file/" + userData.image:"/images/luser.jpg"} alt="" />
                          </div>
                        </div>
                      ) : (
                        <div ref={scrollRef} class="main-message-box st3">
                          <div class="message-dt st3">
                            <div class="message-inner-dt">
                              <p>
                                {mes.text}
                              </p>
                            </div>
                            <span>{getDateAndTime(mes.createdAt)}</span>
                          </div>
                          <div class="messg-usr-img">
                            <img src={activeChat.image?baseURL + "/file/" + activeChat.image:"/images/luser.jpg"} alt="" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div class="message-send-area">
                    <form>
                      <div class="mf-field">
                        <input
                          type="text"
                          name="message"
                          value={messageText}
                          onChange={(e)=>setmessageText(e.target.value)}
                          placeholder="Type a message here"
                        />
                        <button type="submit" onClick={handelSendMessage}>Send</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </>
  );
};

export default Chat;
