import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { checkPhoneNumber, checkEmail, checkConfirmPassword, checkPassword } from "../../utils/validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_SERVER_BASE_URL } from "../../constants";
const Register = () => {
  const [formData, setformData] = useState({});
  const [formErrors, setformErrors] = useState({});
  var isError = true;
  const handleRegister = async () => {

    if(Object.keys(formErrors).length === 0){
      isError = false;
    }

    if(Object.keys(formData).length!==5){
      isError=true;
      console.log('This causes error',formData);
    }
    isError = false;
    Object.values(formErrors).forEach((value) => {
      if (value === false) {
        isError = true;
      }
    });
    if (!isError) {
      // if there is no error proceeed with submitting the form to the server
      console.log("There was no error!");
      const resp = await axios.post(
        `${REACT_APP_SERVER_BASE_URL}/api/register`,
        formData
      );
      // resolve or reject the promise based on response status code
      if (resp.status === 200) {
        console.log("Successfully added donation!");
        return Promise.resolve();
      } else {
        console.log("Error adding donation!");
        return Promise.reject(new Error("Whoops!"));
      }
    } else {
      console.log("There were errors!", formErrors);
      return Promise.reject(new Error("Whoops!"));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if there are no formErrors or all keys are "true" then we can submit the form axios
    toast.promise(handleRegister, {
      pending: "The registration is yet to go through",
      success: "You were successfully registered! You can login now",
      error: isError
        ? "There are some errors in the fields"
        : "The server couldn't get the request",
    });
    // toast("Form submitted");
  }
  return (
    <div className="login-entry">
      <div className="container">
        <div className="forms">
          <div className="form login">
            <span className="title">Register</span>

            <form action="#">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  onChange={(e) => {
                    setformData({ ...formData, name: e.target.value });
                    //console.log(formData);
                  }}
                  required
                />
                <i className="uil uil-user"></i>
              </div>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    setformData({ ...formData, email: e.target.value });
                    setformErrors({ ...formErrors, email: checkEmail(e.target.value) });


                    console.log(formData,formErrors);
                  }}
                  required
                />
                <i className="uil uil-lock icon"></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
              </div>
              <p className="input-error">{formErrors.email===false?"Enter a valid email":""}</p>
              <div className="input-field">
                <input
                  type="tel"
                  placeholder="Enter your Phone Number"
                  onChange={(e) => {
                    setformData({ ...formData, phone: e.target.value });
                    setformErrors({ ...formErrors, phone: checkPhoneNumber(e.target.value) });

                    console.log(formData);
                  }}
                  required
                />
                <i className="uil uil-phone"></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
              </div>
              <p className="input-error">{formErrors.phone===false?"Enter a valid phone number":""}</p>

              <div className="input-field">
                <input
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setformData({ ...formData, password: e.target.value });
                    setformErrors({ ...formErrors, password: checkPassword(e.target.value) });

                    // console.log(formData);
                  }}
                  required
                />
                <i className="uil uil-lock icon"></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
              </div>
              <p className="input-error">{formErrors.password===false?"Password must have atleast 8 characters":""}</p>

              <div className="input-field">
                <input
                  type="password"
                  className="password"
                  placeholder="Confirm your password"
                  onChange={(e) => {
                    setformData({ ...formData, cpassword: e.target.value });
                    setformErrors({ ...formErrors, cpassword: checkConfirmPassword(formData.password,e.target.value) });

                    console.log(formData);
                  }}
                  required
                />
                <i className="uil uil-lock icon"></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
              </div>
              <p className="input-error">{formErrors.cpassword===false?"Passwords don't match":""}</p>

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" id="logCheck" />
                  <label for="logCheck" className="text">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text">
                  Forgot password?
                </a>
              </div>

              <div className="input-field button">
                <input type="button" value="Register" onClick={handleSubmit} />
              </div>
            </form>

            <div className="login-signup">
              <span className="text">
                Already a member?
                <p className="text signup-link">
                  <Link to="/login">Login Now</Link>
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
export default Register;
