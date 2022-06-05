// import "./App.css";
import { useEffect, useState } from "react";
import { baseURL } from "./api";
import Navbar from "./components/Home/Navbar";
import Routers from "./routes/Routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState(null);

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
  }, []);
  return (
    <div className="wrapper">
      <BrowserRouter>
      <Navbar userData={userData} />
      <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
