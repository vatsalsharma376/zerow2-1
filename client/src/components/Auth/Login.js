import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { REACT_APP_SERVER_BASE_URL } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  let correctLogin = false;
  const handleLogin = async () => {
    console.log("Before axios", formData);

    const resp = await axios.post(
      `${REACT_APP_SERVER_BASE_URL}/api/login`,
      formData
    );
      
    console.log("After axios", resp);
    if (resp.status === 200) {
      console.log("Successfully logged in!");
      return Promise.resolve();
    } else {
      console.log("Error loggin in!");
      return Promise.reject(new Error("Whoops!"));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationToast = await toast.promise(handleLogin, {
      pending: "The login is yet to go through",
      success: "You are logged in successfully",
      error: "Incorrect username or password",
    });
    navigate("/dashboard",{state:{loggedIn:true}});

  };
  return (
    <div className="login-entry">
      <div className="container">
        <div className="forms">
          <div className="form login">
            <span className="title">Login</span>

            <form action="#">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    //console.log(formData);
                  }}
                  required
                />
                <i className="uil uil-envelope icon"></i>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    //console.log(formData);
                  }}
                />
                <i className="uil uil-lock icon"></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
              </div>

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" id="logCheck" />
                  <label htmlFor="logCheck" className="text">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text">
                  Forgot password?
                </a>
              </div>

              <div className="input-field button">
                <input type="button" value="Login" onClick={handleSubmit} />
              </div>
            </form>

            <div className="login-signup">
              <span className="text">
                Not a member?
                <p className="text signup-link">
                  <Link to="/register">Signup Now</Link>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
