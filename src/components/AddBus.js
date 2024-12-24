import React, {useState} from "react";
import axios from 'axios';

const AddBus = () => {
    const [busName, setBusName] = useState('');
    const [route, setRoute] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [schedule, setSchedule] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/bus', {busName, route, availableSeats, schedule});
            alert('Bus added successfully');
    } catch (err){
        alert('Error adding bus');
    }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Bus Name" value={busName} onChange={(e) => setBusName(e.target.value)} />
            <input type="text" placeholder="Route" value={route} onChange={(e) => setRoute(e.target.value)} />
            <input type="number" placeholder="Available Seats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
            <input type="text" placeholder="Schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            <button type="submit">Add Bus</button>            
        </form>
    );
};

export default AddBus;
