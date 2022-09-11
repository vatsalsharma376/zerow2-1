import Donations from "../models/Donations.js";
import Twilio from "twilio";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);
const sendOTP = async (phoneNumber, key) => {
  console.log("OTP sending function called" + phoneNumber);
  const phoneNumberwithCode = "+91" + phoneNumber;
  const msgBody = "Your donation's verification code from Zerow is " + key;
  console.log(accountSid, authToken, process.env.TWILIO_NUMBER);
  try {
    client.messages
      .create({
        body: msgBody,
        from: process.env.TWILIO_NUMBER,
        to: phoneNumberwithCode,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Error sending message", err);
  }
};

export const addDonation = async (req, res) => {
  console.log("Directed to addDonation Route");
  // add donation to the database
  try {
    // generate a random 6 digit key
    const key = Math.floor(Math.random() * 1000000);
    req.body.verificationKey = key;
    const newDonation = new Donations(req.body);
    const donation = await newDonation.save();
    console.log("The donation is added");
    sendOTP(req.body.phone, key);
    console.log("OTP sent");
    return res
      .status(200)
      .json({ msg: "Donation added successfully", donation });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
};
export const getDonations = async (req, res) => {
  // get all the donations from the database
  try {
    const donations = await Donations.find().sort({"_id": -1});
    // console.log('Fetched all the donations',donations);
    return res
      .status(200)
      .json({ msg: "Donations retrieved successfully", donations });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
};
export const deleteDonation = async (req, res) => {
  console.log('Donation delete route');
  // delete donation document matching _id from req
  try {
    const donation = await Donations.findByIdAndDelete(req.body.id);
    console.log("Donation deleted");
    return res
      .status(200)
      .json({ msg: "Donation deleted successfully", donation });
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
  
};
