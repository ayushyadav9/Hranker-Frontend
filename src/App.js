// import "./App.css";
import { useEffect, useState } from "react";
import { baseURL } from "./api";
import Navbar from "./components/Home/Navbar";
// import Routers from "./routes/Routers";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Notification from "./pages/Notifications/Notification";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/Registration/SignIn/SignIn";
import SignUp from "./pages/Registration/SignUp/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
import {  useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [dataReset, setdataReset] = useState(0)
  const [url, seturl] = useState(true)

  useEffect(() => {
    if(location.pathname==="/sign-in" || location.pathname==="/sign-up"){
      seturl(false)
    }
  }, [location.pathname])
  

  useEffect(() => {
    let token = localStorage.getItem("userJWT");
    if (token) {
      fetch(`${baseURL}/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setUserData(result.user);
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [dataReset]);

  return (
    <div className="wrapper">
        {url && <Navbar userData={userData}  />}
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage userData={userData} />} />
          </Route>

          <Route path="/sign-in" element={<SignIn setdataReset={setdataReset} />} />
          <Route path="/sign-up" element={<SignUp setdataReset={setdataReset}/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile userData={userData} setdataReset={setdataReset}/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/notification" element={<Notification userData={userData} />} />
          </Route>

        </Routes>
    </div>
  );
}

export default App;
