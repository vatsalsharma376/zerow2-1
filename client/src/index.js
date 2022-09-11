import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DonationForm from "./components/Home/DonationForm";
import Dashboard from "./components/Dashboard/Dashboard";
const root = ReactDOM.createRoot(document.getElementById("root"));
// add /login /register and /app routes in react-router-dom
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="donationform" element={<DonationForm />} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
