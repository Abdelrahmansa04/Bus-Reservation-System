import React, {useEffect, useState} from "react";
import axios from "axios";

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [busName, setBusName] = useState('');
    // const [busId, setBusId] = useState('');
    // const [userName, setUserName] = useState('');
    // const [seatsBooked, setSeatsBooked] = useState('');

const fetchBuses = async () => {
    const res = await axios.get('http://localhost:5000/buses');
    setBuses(res.data);
    // setBusName(res.data[0]['busName']);
};
useEffect(() => {
    fetchBuses();
}, []);

// const handleBus = async (e) => {
//     e.preventDefault();
//     for (let i = 0; i < buses.length; i++){
//         console.log(buses[i].busName);
//     }
// }

// const handleBooking = async (e) => {
//     e.preventDefault();
//     try {
//         await axios.post('/api/book', {busId, userName, seatsBooked});
//         alert('Booking successful');
//     } catch (err) {
//         alert('Error booking the bus');
//     }
// };
const handleDel = async (id) =>{
    // busName.preventDefault();
    try {
        await axios.delete(`http://localhost:5000/buses/${id}`);
        setBuses(buses.filter((bus) => bus._id !== id));
        alert("Bus deleted successfully!");
    } catch (err) {
        console.log("Error deleting the bus", err)
        alert("Error deleting the bus.");
    }
}

return (
    <div>
        <h1>Bus details</h1>
        <button onClick={() => fetchBuses()}>Find Buses</button>
        {buses.length > 0 ? (
            buses.map((bus) => (
                <div key={bus._id}>
                    <h2>{bus.busName}</h2>
                    <p>Route: {bus.route}</p>
                    <p>Available Seats: {bus.availableSeats}</p>
                    <p>schedule: {bus.schedule}</p>
                    <button onClick={() => handleDel(bus._id)}>Delete Bus</button>
                </div>
                ))
            ):(
                <p>Loading buses...</p>
            )}
    </div>

);
};

export default BusList;