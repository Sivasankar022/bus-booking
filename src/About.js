import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About <span>Reciprocal Travels</span></h1>
        <p>We provide a seamless, stylish, and hassle-free bus booking experience. With our modern interface and top-notch services, your journey is now easier than ever.</p>
      </div>

      <div className="cards-container">
        <div className="card">
          <h3>Fast Booking</h3>
          <p>Book your bus tickets in seconds with our smooth and fast interface.</p>
        </div>
        <div className="card">
          <h3>Luxury Buses</h3>
          <p>Enjoy high-class travel with luxury buses at affordable rates.</p>
        </div>
        <div className="card">
          <h3>24/7 Support</h3>
          <p>We’re always here to assist you, no matter the time.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

