import React from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

const TicketConfirmation = () => {
  const { state: ticket } = useLocation();

  if (!ticket) return <p>No ticket info available.</p>;

  return (
    <div className="ticket-confirmation">
      <h2>Ticket Confirmed!</h2>
      <p><strong>Name:</strong> {ticket.name}</p>
      <p><strong>Phone:</strong> {ticket.phone}</p>
      <p><strong>Age:</strong> {ticket.age}</p>
      <p><strong>From:</strong> {ticket.from}</p>
      <p><strong>To:</strong> {ticket.to}</p>
      <p><strong>Departure:</strong> {ticket.departure_time}</p>
      <p><strong>Seat Number:</strong> {ticket.seat_number}</p>
      <p><strong>Price:</strong> ₹{ticket.price}</p>
    </div>
  );
};

export default TicketConfirmation;
