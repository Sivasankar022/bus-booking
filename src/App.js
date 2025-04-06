import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Booking from "./Booking";
import Login from "./Login";
import "./App.css";
import Availableschedules from "./Availableshedules";
import TicketConfirmation from "./TicketConfirmation";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/booking" element={isAuthenticated ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/schedules" element={isAuthenticated ? <Availableschedules /> : <Navigate to="/login" />} />
        <Route path="/ticket" element={<TicketConfirmation />} />
        
      

      </Routes>
    </Router>
  );
};

export default App;


