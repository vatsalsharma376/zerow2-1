import React, { useEffect,useState } from "react";
import logo from "../../img/logo.png";
import "./Dashboard.css";
import Tables from "../Table/Tables";
import { Link } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const [searchText,setsearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      location.state &&
      location.state.loggedIn &&
      location.state.loggedIn === true
    ) {
      console.log("Logged in");
    } else {
      console.log("Not logged in");
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div id="dheader">
        <a href="#">
          <img src={logo} id="nav-img"></img>
        </a>

        <div>
          <ul id="dnavbar">
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/">About</Link>
            </li>
            <li>
            <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div id="dpage">
        <h2>Donations</h2>
      </div>

      <div id="dtable">
        <div className="filter-input">
          <input
            type="text"
            placeholder="      Enter Your City"
            style={{ outline: "none" }}
            value={searchText}
            onChange={(txt) => setsearchText(txt.target.value)}
          />
          <i className=" fa fa-search"></i>
        </div>
        <Tables searchText={searchText}/>
      </div>
    </div>
  );
};

export default Dashboard;
