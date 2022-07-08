import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../api";
import { getConversations } from "../../redux/ApiCalls";
import { chatTime } from "../../utils/timeCalculator";
import { io } from "socket.io-client";
import Loader from "../../utils/Loader";
import { isLastMessage, isSameSender } from "../../utils/ChatLogic";
var socket;


const Chat = () => {
  const dispatch = useDispatch();
  const { userToken, userData } = useSelector((state) => state.user);
  const { conversations, loadings } = useSelector((state) => state.chat);
  const [convoData, setconvoData] = useState(null);
  const [searchUserText, setsearchUserText] = useState("");
  const [activeChat, setactiveChat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false)
  const [messageText, setmessageText] = useState("");
  const [onlineUsers, setonlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messageLoader, setmessageLoader] = useState(false);
  const [searchBar, setsearchBar] = useState(false);
  const [filteredUsers, setfilteredUsers] = useState(null);
  const [filterLoading, setfilterLoading] = useState(false);
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [newMessage, setnewMessage] = useState([])
  const scrollRef = useRef();
  const userDrop = useRef();

  // const socket = useRef();

  useEffect(() => {
    if (userToken) {
      dispatch(getConversations(userToken));
    }
    // eslint-disable-next-line
  }, [userToken]);

  useEffect(() => {
    socket = io(baseURL);
    if(userData){
      socket.emit("setup", userData._id);
    }
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => {
      setIsTyping(true)
    });
    socket.on("stop typing", () => setIsTyping(false));
  }, [userData]);
  
  useEffect(() => {
    console.log("AS")
  }, [isTyping])
  

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        convId: data.convId,
        senderId: data.senderId,
        text: data.text,
        createdAt: data.createdAt,
      });
      console.log(data)

      if(!activeChat || activeChat?.convId !== data.convId){
        console.log(data)
        setnewMessage([...newMessage, data.convId])
      }else{
        setnewMessage([])
      }
    });
  })
  

  useEffect(() => {
    // console.log(arrivalMessage);
    // let t = [activeChat?._id, userData?._id];
    // console.log(t);
    arrivalMessage &&
      [activeChat?._id, userData?._id].includes(arrivalMessage.senderId) &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, activeChat, userData]);

  useEffect(() => {
    if (userData) {
      socket.emit("addUser", userData._id);
      socket.on("getUsers", (users) => {
        console.log(users);
        let t = users.map((item) => {
          return item.userId;
        });
        setonlineUsers(t);
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
        console.log(mems)
        if(mems.length===0){ 
          setconvoData(null) 
          return; 
        }
        let tmems = JSON.parse(JSON.stringify(mems));
        tmems.convId = conversations[i]._id;
        tmems.createdAt = conversations[i].createdAt;
        tmems.lastMessage = conversations[i].lastMessage
          ? conversations[i].lastMessage
          : "";
        t.push(tmems);
      }
      console.log(t)
      setconvoData(t);
    }
  }, [conversations, userData]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        !userDrop.current.contains(e.target) 
      ) {
        setfilteredUsers(null)
        setfilterLoading(false)
      }
    });
    // eslint-disable-next-line
  }, []);

  const handelChatData = async (con) => {
    setmessages([]);
    setactiveChat(con);
    let t = newMessage.filter((item)=> item!==con.convId)
    setnewMessage(t)
    socket.emit("join chat", con.convId);
    setmessageLoader(true);
    fetch(`${baseURL}/chat/getMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ convId: con.convId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setmessageLoader(false);
          if (result.success) {
            setmessages(result.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handelSendMessage = (e) => {
    e.preventDefault();
    if (messageText.length > 0) {
      socket.emit("sendMessage", {
        convId: activeChat.convId,
        senderId: userData._id,
        receiverId: activeChat._id,
        text: messageText,
      });
      setmessageText("");
      setmessages([
        ...messages,
        {
          conversationId: activeChat.convId,
          senderId: userData._id,
          createdAt: new Date().getTime(),
          text: messageText,
        },
      ]);
      fetch(`${baseURL}/chat/addMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ text: messageText, convId: activeChat.convId }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const handelChangeSearchUser = (e) => {
    setsearchUserText(e.target.value);
    setfilteredUsers(null);
    if (e.target.value.length > 0) {
      setfilterLoading(true);
      fetch(`${baseURL}/user/getUserFromSearch/${e.target.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setfilterLoading(false);
            if (result.success) {
              setfilteredUsers(result.data);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }else{

    }
  };

  const handelStartConvo = (id) =>{
    setfilteredUsers(null)
    let t = convoData.filter((item)=>{
      return item._id===id
    })
    if(t.length>0){
      handelChatData(t[0]);
      return;
    }
    fetch(`${baseURL}/chat/addConversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ senderId: userData?._id, receiverId: id})
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setfilterLoading(false);
          if (result.success) {
            setmessages([])
            setconvoData([...convoData, result.data]);
            setactiveChat(result.data)
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }


  const handelTyping = (e)=>{
    setmessageText(e.target.value)
    console.log(socketConnected)
    if (!socketConnected) return;
      let lastTypingTime = new Date().getTime();
      var timerLength = 1000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength) {
          socket.emit("stop typing", activeChat.convId);
          setTyping(false);
        }
      }, timerLength);
    if(!typing){
      setTyping(true)
      socket.emit("typing", activeChat.convId);
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
                  {(filterLoading || filteredUsers?.length > 0) && (
                    <div class="search-user-list" ref={userDrop}>
                      <ul>
                        {filterLoading ? (
                          <Loader isSmall={true} />
                        ) : (
                          filteredUsers?.map((item, i) => {
                            return (
                              <li onClick={() => handelStartConvo(item._id)}>
                                <div>
                                  <img
                                    src={
                                      item.image
                                        ? baseURL + "/file/" + item.image
                                        : "/images/luser.jpg"
                                    }
                                    alt=""
                                  ></img>
                                </div>
                                <div className="user-d">
                                  <span>{item.name}</span>
                                  <span className="username">
                                    ({item.username})
                                  </span>
                                </div>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  )}
                  <div class="msg-title">
                    <h3>Messages</h3>
                    <ul>
                      <li>
                        <div ref={userDrop}>
                          <input
                            placeholder="Search User..."
                            className={searchBar ? "show" : ""}
                            value={searchUserText}
                            onChange={handelChangeSearchUser}
                          />
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => setsearchBar((prev) => !prev)}
                          title=""
                        >
                          <img src="/images/ser.svg" alt=""></img>
                        </div>
                      </li>
                      {/* <li>
                        <div title="">
                          <i class="fa fa-ellipsis-v"></i>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                  <div class="messages-list">
                    {loadings.getCovoLoading ? (
                      <Loader isSmall={true} />
                    ) : (
                      <ul>
                        {convoData &&
                          convoData
                            .slice()
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .map((con, i) => {
                              return (
                                <li
                                  onClick={() => handelChatData(con)}
                                  key={i}
                                  class={
                                    activeChat && activeChat._id === con._id
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <div class="usr-msg-details">
                                    <div class="usr-ms-img">
                                      <img
                                        src={
                                          con.image
                                            ? baseURL + "/file/" + con.image
                                            : "/images/luser.jpg"
                                        }
                                        alt=""
                                      />
                                      {onlineUsers.includes(con._id) && (
                                        <span class="msg-status"></span>
                                      )}
                                    </div>
                                    <div class="usr-mg-info">
                                      <h3>{con.name}</h3>
                                      {con.lastMessage && (
                                        <p>
                                          {con.lastMessage.text.length > 27
                                            ? con.lastMessage.text.slice(
                                                0,
                                                27
                                              ) + "..."
                                            : con.lastMessage.text}
                                        </p>
                                      )}
                                    </div>
                                    <span class="posted_time">
                                      {con.lastMessage
                                        ? chatTime(con.lastMessage.createdAt)
                                        : ""}
                                    </span>
                                    {newMessage.includes(con.convId) && (
                                      <span class="msg-notifc"></span>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-12 pd-right-none pd-left-none">
                {activeChat ? (
                  <div class="main-conversation-box">
                    <div class="message-bar-head">
                      <div class="usr-msg-details">
                        <div class="usr-ms-img">
                          <img
                            src={
                              activeChat?.image
                                ? baseURL + "/file/" + activeChat.image
                                : "/images/luser.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div class="usr-mg-info">
                          {onlineUsers.includes(activeChat?._id) ? (
                            <>
                              <h3>{activeChat ? activeChat.name : ""}</h3>
                              <p style={{ color: "#07d007" }}>{isTyping===true?"Typing...":"Online"}</p>
                            </>
                          ) : (
                            <h3 className="isOnline">
                              {activeChat ? activeChat.name : ""}
                            </h3>
                          )}
                        </div>
                      </div>
                      {/* <a href="/" title="">
                        <i class="fa fa-ellipsis-v"></i>
                      </a> */}
                    </div>
                    <div class="messages-line">
                      {messageLoader ? (
                        <Loader isSmall={true} />
                      ) : (
                        <>
                          {userData &&
                            messages?.map((mes, i) => {
                              return mes.senderId === userData._id ? (
                                <div
                                  ref={scrollRef}
                                  class="main-message-box ta-right"
                                >
                                  <div class="message-dt">
                                    <div class="message-inner-dt">
                                      <p>
                                        {mes.text}
                                        <span>{chatTime(mes.createdAt)}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="messg-usr-img">
                                    {(isSameSender(
                                      messages,
                                      mes,
                                      i,
                                      userData._id
                                    ) ||
                                      isLastMessage(
                                        messages,
                                        i,
                                        userData._id
                                      )) && (
                                      <img
                                        src={
                                          userData?.image
                                            ? baseURL +
                                              "/file/" +
                                              userData.image
                                            : "/images/luser.jpg"
                                        }
                                        alt=""
                                      />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  ref={scrollRef}
                                  class="main-message-box st3"
                                >
                                  <div class="message-dt st3">
                                    <div class="message-inner-dt">
                                      <p>
                                        {mes.text}
                                        <span>{chatTime(mes.createdAt)}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="messg-usr-img">
                                    {(isSameSender(
                                      messages,
                                      mes,
                                      i,
                                      userData._id
                                    ) ||
                                      isLastMessage(
                                        messages,
                                        i,
                                        userData._id
                                      )) && (
                                      <img
                                        src={
                                          activeChat.image
                                            ? baseURL +
                                              "/file/" +
                                              activeChat.image
                                            : "/images/luser.jpg"
                                        }
                                        alt=""
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          {/* {(
                            isTyping===true && <div ref={scrollRef}
                              // class="main-message-box st3"
                            >
                              <div class="message-dt st3">
                                <Lottie
                                  options={defaultOptions}
                                // height={50}
                                  width={86}
                                  style={{ marginBottom: 0, marginLeft: 0 , padding: "10px"}}/>
                              </div>
                              <div class="messg-usr-img"></div>
                            </div>
                          )} */}
                        </>
                      )}
                    </div>
                    <div class="message-send-area">
                      <form>
                        <div class="mf-field">
                          <input
                            type="text"
                            name="message"
                            value={messageText}
                            onChange={(e) => handelTyping(e)}
                            placeholder="Type a message here"
                          />
                          <button type="submit" onClick={handelSendMessage}>
                            <svg
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              class=""
                            >
                              <path
                                fill="currentColor"
                                d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div class="no-chat">
                    <div>
                      <img src="/images/conv.png" alt=""></img>
                    </div>
                    <div>
                      <h1>Select a chat to start conversation</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
