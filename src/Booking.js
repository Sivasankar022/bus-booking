
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { state: selectedTrip } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
  });

  const [bookingStatus, setBookingStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...formData,
      trip_id: selectedTrip.id,
    };

    try {
      const response = await fetch("http://localhost:5000/book-seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/ticket", { state: result }); 
      } else {
        setBookingStatus(result.message || "Booking failed");
      }
    } catch (error) {
      setBookingStatus("Error booking seat");
      console.error(error);
    }
  };

  if (!selectedTrip) return <p>No trip selected. Go back to schedule list.</p>;

  return (
    <div className="booking-container">
      <h2>Booking for: {selectedTrip.start_point} → {selectedTrip.end_point}</h2>
      <p>Departure: {selectedTrip.departure_time}</p>
      <p>Price: ₹{selectedTrip.price}</p>

      <form onSubmit={handleSubmit} className="booking-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <button type="submit" className="booking-btn">Confirm Booking</button>
      </form>

      {bookingStatus && <p className="status">{bookingStatus}</p>}
    </div>
  );
};

export default Booking;





