import React, {useEffect, useState} from "react";
import axios from "axios";


const Dashboard = () => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    // const [busName, setBusName] = useState('');
    const [busIds, setBusIds] = useState([]);
    // const [userName, setUserName] = useState('');
    // const [seatsBooked, setSeatsBooked] = useState('');

const fetchBuses = async () => {
    const res = await axios.get('http://localhost:3001/buses');
    setBuses(res.data);
    setIsLoading(false);
};


// const fetchUsersBuses = async () => {
//     const res = await axios.get("http://localhost:3001/user/bus");
//     setBuses(res.data);
//     console.log("users", res);
// }



useEffect(() => {
    setIsLoading(true);
    fetchBuses();
    // fetchUsersBuses();
}, []);


return (
    <>
    <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-cards">
                <br />
                {buses.length > 0 ? (
                    buses.map((bus) => (
                        <div>
                            {/* {busIds.map((bus => 
                                <p>{bus}</p>
                            ))} */}
                            <div className="card">
                                {/* <h2>Bus {bus._id}</h2> */}
                                <p>{bus.location.pickupLocation} To {bus.location.arrivalLocation}</p>
                                <p>{bus.time.departureTime}:pm to {bus.time.arrivalTime}:pm</p>
                                <p>Seat : {bus.seats.totalSeats}</p>
                            </div>

                        </div>
                        ))
                    ):(
                        isLoading ? <p>Loading buses...</p> : <p>No buses found.</p>
                    )}                    
            </div>
    </div>
    </>
);
};

export default Dashboard;