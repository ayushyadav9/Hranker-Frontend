import React, { useEffect, useState } from "react";
import Footer from "../../../components/Registration/Footer";
import Left from "../../../components/Registration/Left";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { useDispatch,useSelector } from "react-redux";
import { googleLoginUser, loginUser } from "../../../redux/ApiCalls";
import {gapi} from "gapi-script"
import { clientId } from "../../../api";

const SignIn = ({seturl}) => {
  const dispatch = useDispatch()
  let  { isLoggedIn,userToken,loadings,error,notify } = useSelector((state)=>state.user);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({email: "",password: ""});

  useEffect(() => {
    if(isLoggedIn===true && userToken){
      seturl(true)
      localStorage.setItem("userJWT", userToken);
      if(error) toast.info(error);
      navigate("/")
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: clientId,
        scope:""
      })
    }
    gapi.load('client:auth2',start)
  }, [])

  useEffect(() => {
    if(notify.login){
      toast.info(notify.login)
    }
  }, [notify.login])
  
  
  const handelLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      dispatch(loginUser(formData));
    } else {
      toast.info("Please enter valid details");
    }
  };

  const successResponseGoogle = (res) => {
    dispatch(googleLoginUser(res.tokenId))
    // console.log(res)
  };

  const failedResponseGoogle = (res) => {
    console.log(res);
  };
  const successResponseFb = (res) => {
    console.log(res)
  };

  const failedResponsefb = (res) => {
    console.log(res);
  };
  return (
    <>
    {loadings.loginLoading && <Loader isSmall={false}/>}
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
                                clientId={clientId}
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
                                // cookiePolicy={"single_host_origin"}
                              />
                            </li>
                            <li>
                            <FacebookLogin
                              appId="586840939622859"
                              autoLoad={true}
                              cssClass="fb"
                              icon="fa fa-facebook"
                              textButton="Facebook"
                              fields="name,email,picture"
                              onClick={successResponseFb}
                              callback={failedResponsefb} />
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
