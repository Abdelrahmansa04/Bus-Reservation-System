import React, {useState} from "react";
import axios from 'axios';

const AddBus = () => {
    const [busName, setBusName] = useState('');
    const [route, setRoute] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [schedule, setSchedule] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.get('http://localhost:5000/buses');
            const buses = res.data;

            if (busName.trim() === ""){
                alert('Please enter bus name');
                return;
            }

            const busExists = buses.some((bus) => bus.busName === busName);
            if (busExists){
                alert('Bus already exists');
                return;
            }

            await axios.post('http://localhost:5000/buses', {busName, route, availableSeats, schedule});
            alert('Bus added successfully');
        } catch (err) {
            alert('Error adding bus');
            console.log(err);
        }
        


        // try {
        //     const buses = await axios.get("http://localhost:5000/buses");
        //     console.log(buses.data);

        //     const busses = buses.data;

        //     const checkBus = async (busses) => (
        //         buses.forEach((bus) => {
        //         if (bus.busName === busName) {
        //             alert("Bus already exists");
        //             console.log(bus.busName)
        //         }else {
        //             await axios.post('http://localhost:5000/buses', {busName, route, availableSeats, schedule});
        //             alert('Bus added successfully');                
        //         }
        //     })
        //     )
        //     // if (bus) {
        //     //     return alert('Bus already exists');
        //     // } else {
        //         await axios.post('http://localhost:5000/buses', {busName, route, availableSeats, schedule});
        //         alert('Bus added successfully');                
        //     // }
        // } catch (err){
        //     alert('Error adding bus');
        //     console.log(err);
        // }
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
