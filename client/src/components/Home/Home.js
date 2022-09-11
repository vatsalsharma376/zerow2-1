import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
import logo from "../../img/logo.png";

const Home = () => {
  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const goToNext = ()=>{
    setcurrentImageIndex((currentImageIndex + 1) % 3);
    console.log(currentImageIndex);
  }
  const goToPrev = () =>{
    setcurrentImageIndex((currentImageIndex - 1) % 3);

  }
  return (
    <div className="entry-header">
      <div className="header">
        <div className="left-side">
          <img src={logo} className="logo-img"></img>
        </div>

        <div className="right-side">
          <nav >
            <div className="nav-links" id="navlinks">
              <ul>
                <li>
                <p onClick={()=> setcurrentImageIndex(0)}>HOME</p>
                 
                </li>

                <li>
                  <p onClick={()=> setcurrentImageIndex(1)}>ABOUT</p>
                </li>

                <li>
                <p onClick={()=> setcurrentImageIndex(2)}>CONTACT</p>
                 
                </li>
             
              </ul>
            </div>
          </nav>

          <div className="ar-flex">
            <div className="arr-left">
              <i
                className=" fa fa-solid fa-arrow-left "
                onClick={goToPrev}
              ></i>
            </div>

            <Carousel
              selectedItem={currentImageIndex}
              className="right-car"
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
              showArrows={false}
            >
              <div className="right-car-content">
                <div className="home-cont">
                  <div className="home-text">
                    <h1>Welcome</h1>
                    <p>
                      We at Zerow aim to minimize the food wastage. Our works
                      are designed to provide essential food support to
                      underserved areas in the form of food or packaged food
                      products depending on the need.
                    </p>
                    <h4> Our goal is to ensure, Feed people not landfills.</h4>
                  </div>

                  <div className="action-btn">
                  <Link to="/donationform"> <p className="btn">
                      DONATE NOW
                    </p>
                    </Link>
                    <Link to="/register"><p className="btn">
                    
                      VOLUNTEER
                    </p>
                      </Link>
                    
                  </div>

                  <div className="icons">
                    <div className="icons-1">
                      <i className="fa fa-facebook"></i>
                      <i className="fa fa-twitter"></i>
                      <i className="fa fa-instagram"></i>
                      <i className="fa fa-brands fa-youtube-play"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="course">
                  <h1>
                    How Do We Make This Work<b>?</b>
                  </h1>
                  <p>
                    Our portal is a one stop solution to eradicate the food
                    wastage which takes place everyday in any social gathering.
                    We have devised an idea where the person who has excess food
                    can list the amount of plates.
                  </p>

                  <div className="row">
                    <div className="course-col">
                      <h3>Donor</h3>
                      <p>
                        Donors can donate excess or leftover food by listing it
                        on our website without any hectic process of
                        registration. He has to just list his Name, Quantity,
                        City and contact number and his donation will be listed
                        on our website.
                      </p>
                    </div>
                    <div className="course-col">
                      <h3>Volunteer</h3>
                      <p>
                        Volunteers or NGOs can access all donations listed and
                        pick up the leftovers which is feasible for him and
                        distribute it to the needy. They have to confirm that
                        they picked up the food by verifying the OTP sent to
                        Donor by us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="third-page">
       <div>
              <h1>
                    CONTACT US
                  </h1>
                  <p>
                   If anyone wants to join us for the betterment of the cause call us or send an email.
                  </p>
                  </div>
                  
                  <div className="contact">
        <div className="contact-col">
         
          <div>
            <i className="fa fa-phone"></i>
            <span>
              <h5>+91-1234567890</h5>
              <p> Monday To Friday, 9am to 4pm</p>
            </span>
          </div>
          <div>
            <i className="fa fa-envelope-o"></i>
            <span>
              <h5> contact@zerow.com</h5>
              <p>Email Us Your Query</p>
            </span>
          </div>
        </div>
          
            

                
                </div>
                </div>
            </Carousel>
            <div className="arr-right">
              <i
                className="fa fa-solid fa-arrow-right"
                onClick={goToNext}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
