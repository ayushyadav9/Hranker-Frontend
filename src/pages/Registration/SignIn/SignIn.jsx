import React, { useState } from "react";
import Footer from "../../../components/Registration/Footer";
import Left from "../../../components/Registration/Left";
import { GoogleLogin } from "react-google-login";
import { baseURL } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";

const SignIn = ({setdataReset,seturl}) => {
  const [isLoader, setisLoader] = useState(false)
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setisLoader(true)
      fetch(`${baseURL}/auth/login/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setisLoader(false)
            if (result.success) {
              localStorage.setItem("userJWT", result.data.token);
              toast.success(`Logged in as ${result.data.user.name}`);
              setdataReset(pre=>!pre)
              seturl(true)
              navigate("/");
            } else {
              toast.info(result.message);
            }
            console.log(result);
          },
          (error) => {
            toast.info(error.message);
            console.log(error);
          }
        );
    } else {
      toast.info("Please enter valid details");
    }
  };
  const successResponseGoogle = (res) => {
    setisLoader(true)
    fetch(`${baseURL}/auth/googleSignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: res.tokenId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setisLoader(false)
          if (result.success) {
            localStorage.setItem("userJWT", result.data.token);
            toast.success(result.message);
            setdataReset(pre=>!pre)
            seturl(true)
            navigate("/");
          } else {
            toast.info(result.message);
          }
          console.log(result);
        },
        (error) => {
          toast.info(error.message);
          console.log(error);
        }
      );
  };
  const failedResponseGoogle = (res) => {
    toast.error("Some error occured");
    console.log(res);
  };

  return (
    <>
    {isLoader && <Loader isSmall={false}/>}
      <div className="sign-in">
        <div className="wrapper">
          <div className="sign-in-page">
            <div className="signin-popup">
              <div className="signin-pop">
                <div className="row">
                  <Left />
                  <div className="col-lg-6">
                    <div className="login-sec">
                      <ul className="sign-control">
                        <li
                          data-tab="tab-1"
                          className="animated fadeIn current"
                        >
                          <a href="/sign-in" title="">
                            Sign in
                          </a>
                        </li>
                        <li data-tab="tab-2" className="animated fadeIn">
                          <a href="/sign-up" title="">
                            Sign up
                          </a>
                        </li>
                      </ul>
                      <div
                        className="sign_in_sec animated fadeIn current"
                        id="tab-1"
                      >
                        <h3>Sign in</h3>
                        <form>
                          <div className="row">
                            <div className="col-lg-12 no-pdd">
                              <div className="sn-field">
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                />
                                <i className="la la-user"></i>
                              </div>
                            </div>

                            <div className="col-lg-12 no-pdd">
                              <div className="sn-field">
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      password: e.target.value,
                                    })
                                  }
                                />
                                <i className="la la-lock"></i>
                              </div>
                            </div>

                            <div className="col-lg-12 no-pdd">
                              <div className="checky-sec">
                                <div className="fgt-sec">
                                  <input type="checkbox" name="cc" id="c1" />
                                  <label htmlFor="c1">
                                    <span></span>
                                  </label>
                                  <small>Remember me</small>
                                </div>
                                <a href="/" title="">
                                  Forgot Password?
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                              <button
                                type="submit"
                                value="submit"
                                onClick={handelLogin}
                              >
                                Sign in
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="login-resources">
                          <h4>Login Via Social Account</h4>
                          <ul>
                            <li>
                              <GoogleLogin
                                clientId="924996333248-b18i1m98ji19j0tfl0emmiv9el52eh2u.apps.googleusercontent.com"
                                buttonText="Login"
                                render={(renderProps) => (
                                  <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="go"
                                  >
                                    <i className="fa fa-google"></i>Google
                                  </button>
                                )}
                                onSuccess={successResponseGoogle}
                                onFailure={failedResponseGoogle}
                                cookiePolicy={"single_host_origin"}
                              />
                            </li>
                            <li>
                              <button title="" className="fb">
                                <i className="fa fa-facebook"></i>Facebook
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
