import { useEffect, useState } from "react";
import Navbar from "./components/Home/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Notification from "./pages/Notifications/Notification";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/Registration/SignIn/SignIn";
import SignUp from "./pages/Registration/SignUp/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
import {  useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveLeaderboard, getLeaderboard, getTopPosts, getUser } from "./redux/ApiCalls";
import { setToken } from "./redux/reducers/userReducers";
import Points from "./pages/Points/Points";
import UserProfile from "./pages/UserProfile/UserProfile";
import BlogPost from "./pages/Post/BlogPost";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import QuesPost from "./pages/Post/QuesPost";
import Chat from "./pages/Chat/Chat";
import Congratulations from "./utils/Congratulation";

import { toggleConfetti } from "./redux/reducers/postReducers";

function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isPopupOpen, setisPopupOpen] = useState(false)
  const {popups, confetti} = useSelector((state)=>state.post)
  const {isReLogin} = useSelector((state)=>state.user)
  const [url, seturl] = useState(true)

  useEffect(() => {
    if(location.pathname==="/sign-in" || location.pathname==="/sign-up"){
      seturl(false)
    }
  }, [location.pathname])
  
  useEffect(() => {
    if(isReLogin===true){
      localStorage.removeItem("userJWT")
      navigate("/sign-in")
    }
    // eslint-disable-next-line
  }, [isReLogin])

  useEffect(() => {
    if(confetti){
      setTimeout(()=>{
        dispatch(toggleConfetti())
      }, 5000);
    }
     // eslint-disable-next-line
  }, [confetti])
  
  

  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if(token){
      dispatch(getTopPosts(token))
      dispatch(setToken(token))
      dispatch(getUser(token))
      dispatch(getLeaderboard(token))
      dispatch(getActiveLeaderboard(token))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={popups.blogPopup || popups.quesPopup|| isPopupOpen?"wrapper overlay":"wrapper"}>
        {url && <Navbar/>}
        {confetti && <Congratulations/>}
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage/>} />
          </Route>

          <Route path="/sign-in" element={<SignIn seturl={seturl}/>} />
          <Route path="/sign-up" element={<SignUp seturl={seturl}/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile setisPopupOpen={setisPopupOpen}/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile/:username" element={<UserProfile/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/notification" element={<Notification/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/leaderboard" element={<Leaderboard/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/post/:slug" element={<BlogPost/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/quesPost/:slug" element={<QuesPost/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/points" element={<Points/>} />
          </Route>

        </Routes>
    </div>
  );
}

export default App;
