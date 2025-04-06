// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Availabletrips.css"; 

// const Availabletrip = () => {
//   const [schedules, setSchedules] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/schedules")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched schedules:", data);
       
       
//         setSchedules(data);
//       })
//       .catch((err) => console.error("Error fetching schedules", err));
//   }, []);

//   const handleSelect = (schedule) => {
//     navigate("/booking", { state: schedule });
//   };

//   return (
//     <div className="schedules-container">
//       <h2>Available Trips</h2>

//       {schedules.length === 0 ? (
//         <p>No trips found. Please try again later.</p>
//       ) : (
//         schedules.map((trip) => (
//           <div key={trip.id} className="schedule-card">
//             <p><strong>From:</strong> {trip.from}</p>
//             <p><strong>To:</strong> {trip.to}</p>
//             <p><strong>Departure:</strong> {trip.departure_time}</p>
//             <p><strong>Arrival:</strong> {trip.arrival_time}</p>
//             <p><strong>Seats Left:</strong> {trip.available_seats}</p>
//             <button onClick={() => handleSelect(trip)}>Book This Trip</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Availabletrip;
