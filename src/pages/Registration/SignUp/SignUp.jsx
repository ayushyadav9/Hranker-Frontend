import React, { useState,useEffect } from "react";
import Footer from "../../../components/Registration/Footer";
import Left from "../../../components/Registration/Left";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { useDispatch,useSelector } from "react-redux";
import { registerUser,googleLoginUser } from "../../../redux/ApiCalls";

const SignUp = ({ seturl}) => {
  const dispatch = useDispatch()
  let  { isLoggedIn,userToken,loadings,notify } = useSelector((state)=>state.user);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({name: "", phone: "", username:"", email: "",password: "", rePassword: ""});

  useEffect(() => {
    if(isLoggedIn===true && userToken){
      seturl(true)
      localStorage.setItem("userJWT", userToken);
      // if(error) toast.info(error);
      navigate("/")
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  useEffect(() => {
    if(notify.register){
      toast.info(notify.register)
    }
  }, [notify.register])
  

  const handelRegister = (e) => {
    e.preventDefault();
    if (
      formData.email &&
      formData.name &&
      formData.password &&
      formData.phone &&
      formData.username &&
      formData.rePassword === formData.password
    ) {
      dispatch(registerUser(formData))
    } else if (formData.rePassword !== formData.password) {
      toast.error("Password didn't match");
    } else {
      toast.info("Please enter valid details");
    }
  };

  const successResponseGoogle = (res) => {
    dispatch(googleLoginUser(res.tokenId))
  };
  
  const failedResponseGoogle = (res) => {
    toast.error("Some error occured");
  };

  return (
    <>
    {loadings.loginLoading && <Loader/>}
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
                        <li data-tab="tab-1" className="animated fadeIn ">
                          <a href="/sign-in" title="">
                            Sign in
                          </a>
                        </li>
                        <li
                          data-tab="tab-2"
                          className="animated fadeIn current"
                        >
                          <a href="/sign-up" title="">
                            Sign up
                          </a>
                        </li>
                      </ul>

                      <div
                        className="sign_in_sec animated fadeIn current"
                        id="tab-2"
                      >
                        <div
                          className="dff-tab animated fadeIn current"
                          id="tab-3"
                        >
                          <h3>Sign Up</h3>
                          <form>
                            <div className="row">
                              <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                  <i className="la la-user"></i>
                                </div>
                              </div>

                              <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                  <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        username: e.target.value,
                                      })
                                    }
                                  />
                                  <i className="la la-globe"></i>
                                </div>
                              </div>

                              <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                  <input
                                    type="text"
                                    name="mobile number"
                                    placeholder="Mobile Number"
                                    value={formData.phone}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                  <i className="la la-user"></i>
                                </div>
                              </div>

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
                                  <i className="la la-dropbox"></i>
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
                                <div className="sn-field">
                                  <input
                                    type="password"
                                    name="repeat-password"
                                    placeholder="Repeat Password"
                                    value={formData.rePassword}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        rePassword: e.target.value,
                                      })
                                    }
                                  />
                                  <i className="la la-lock"></i>
                                </div>
                              </div>

                              {/* <div className="col-lg-12 no-pdd">
                              <div className="checky-sec st2">
                                <div className="fgt-sec">
                                  <input type="checkbox" name="cc" id="c2" />
                                  <label for="c2">
                                    <span></span>
                                  </label>
                                  <small>
                                    Yes, I understand and agree to the Hranker
                                    Terms &amp; Conditions.
                                  </small>
                                </div>
                              </div>
                            </div> */}
                              <div className="col-lg-12 no-pdd">
                                <button
                                  type="submit"
                                  value="submit"
                                  style={{ marginTop: "0px" }}
                                  onClick={handelRegister}
                                >
                                  Register
                                </button>
                              </div>
                              <div
                                className="login-resources"
                                style={{ marginBottom: "0px" }}
                              >
                                <h4>SignUp Via Social Account</h4>
                                <ul>
                                  <li>
                                    <GoogleLogin
                                      clientId="924996333248-b18i1m98ji19j0tfl0emmiv9el52eh2u.apps.googleusercontent.com"
                                      buttonText="Login"
                                      render={(renderProps) => (
                                        <button
                                          onClick={renderProps.onClick}
                                          disabled={renderProps.disabled}
                                          style={{ backgroundColor: "#e93849" }}
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
                                    <button
                                      style={{ backgroundColor: "#3b5998" }}
                                      className="fb"
                                    >
                                      <i className="fa fa-facebook"></i>Facebook
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </form>
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

export default SignUp;
