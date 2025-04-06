import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Reciprocal Travels</h1>
      <p>Your journey starts here. Book your tickets now!</p>
      <Link to="/schedules" className="book-btn">Book Now</Link>

    </div>
  );
};

export default Home;


