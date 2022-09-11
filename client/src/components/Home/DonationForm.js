import React, { useState } from "react";
import "./DonationForm.css";
import { checkPhoneNumber, checkQuantity } from "../../utils/validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_SERVER_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
const DonationForm = () => {
  const [formData, setformData] = useState({});
  const [formErrors, setformErrors] = useState({});
  var isError = true;
  const navigate = useNavigate();
  const submitDonationForm = async () => {
    // if formErrors object is empty then isError = false
    if (Object.keys(formErrors).length === 0) {
      isError = false;
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
        `${REACT_APP_SERVER_BASE_URL}/api/addDonation`,
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
  };

  const handleSubmit = async (e) => {
    // e.prevenetDefault();
    // if there are no formErrors or all keys are "true" then we can submit the form axios
    const donationToast = await toast.promise(submitDonationForm, {
      pending: "The donation is yet to go through",
      success: "The donation was added successfully",
      error: isError
        ? "There are some errors in the fields"
        : "The server couldn't get the request",
    });
    // toast("Form submitted");
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div className="donation-form-entry">
      <div className="container2">
        <div className="forms">
          <div className="form login">
            <span className="title">Donor</span>

            <form action="#">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => {
                    setformData({ ...formData, name: e.target.value });
                    // console.log(formData);
                  }}
                ></input>
                <i className="uil uil-user"></i>
              </div>

              <div className="input-field">
                <input
                  type="tel"
                  placeholder="PhoneNumber"
                  size="50%"
                  required
                  onChange={(e) => {
                    setformData({ ...formData, phone: e.target.value });
                    setformErrors({
                      ...formErrors,
                      phone: checkPhoneNumber(e.target.value),
                    });
                    // console.log(formErrors);
                  }}
                ></input>
                <i className="uil uil-phone"></i>
              </div>
              <p className="input-error">
                {formErrors.phone === false ? "Phone number is invalid" : ""}
              </p>
              <div className="input-field">
                <input
                  type="number"
                  placeholder="Items quantity"
                  required
                  onChange={(e) => {
                    setformData({ ...formData, quantity: e.target.value });
                    setformErrors({
                      ...formErrors,
                      quantity: checkQuantity(e.target.value),
                    });
                  }}
                ></input>
                <i className="uil uil-utensils"></i>
              </div>
              <p className="input-error">
                {formErrors.quantity === false
                  ? "Quantity should be greater than five"
                  : ""}
              </p>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="City"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, city: e.target.value })
                  }
                ></input>
                <i className="uil uil-home"></i>
              </div>
              <div className="input-field button">
                <input
                  type="button"
                  value="Submit"
                  onClick={handleSubmit}
                ></input>
              </div>
            </form>
          </div>
          <div className="form signup">
            <span className="title">Registration</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DonationForm;
