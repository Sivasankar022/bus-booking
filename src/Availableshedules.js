import React, { useState, useEffect } from 'react';
import './Availableshedules.css';

const AvailableSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', age: '' });
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/schedules')
      .then(res => res.json())
      .then(data => setSchedules(data));
  }, []);

  const handleBookClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    // ✅ FORM VALIDATION
    if (!formData.name.trim() || !formData.phone.trim() || !formData.age.trim()) {
      alert("Please fill in all fields: Name, Phone, and Age.");
      return;
    }

    const bookingDetails = {
      ...formData,
      schedule_id: selectedSchedule.id,
    };

    fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails),
    })
      .then(res => res.json())
      .then(data => {
        setShowModal(false);
        setConfirmation({
          ...formData,
          bus_id: selectedSchedule.bus_id,
          route: `${selectedSchedule.start_point} ➜ ${selectedSchedule.end_point}`,
          departure: selectedSchedule.departure_time,
          seat_number: data.seat_number,
          price: selectedSchedule.price,
        });

        // ✅ Update booked_seats locally
        setSchedules(prev =>
          prev.map(schedule =>
            schedule.id === selectedSchedule.id
              ? { ...schedule, booked_seats: schedule.booked_seats + 1 }
              : schedule
          )
        );

        setFormData({ name: '', phone: '', age: '' });
      });
  };

  return (
    <div className="schedule-container">
      <h2>Available Bus Schedules</h2>
      <div className="cards-container">
        {schedules.map(schedule => {
          const availableSeats = schedule.total_seats - schedule.booked_seats;
          return (
            <div className="card" key={schedule.id}>
              <h3>{schedule.start_point} ➜ {schedule.end_point}</h3>
              <p><strong>Departure:</strong> {new Date(schedule.departure_time).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(schedule.arrival_time).toLocaleString()}</p>
              <p><strong>Price:</strong> ₹{schedule.price}</p>
              <p><strong>Seats Left:</strong> {availableSeats}</p>
              <button
                onClick={() => handleBookClick(schedule)}
                disabled={availableSeats === 0}
              >
                {availableSeats > 0 ? 'Book Now' : 'Sold Out'}
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Passenger Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
            />
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="ticket-card elite-card">
          <div className="ticket-header">🎟 Ticket Confirmed</div>
          <div className="ticket-info">
            <div><strong> Name:</strong> {confirmation.name}</div>
            <div><strong> Phone:</strong> {confirmation.phone}</div>
            <div><strong> Age:</strong> {confirmation.age}</div>
            <div><strong> Bus ID:</strong> {confirmation.bus_id}</div>
            <div><strong> Route:</strong> {confirmation.route}</div>
            <div><strong> Departure:</strong> {new Date(confirmation.departure).toLocaleString()}</div>
            <div><strong> Seat No:</strong> {confirmation.seat_number}</div>
            <div><strong> Price:</strong> ₹{confirmation.price}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableSchedules;
