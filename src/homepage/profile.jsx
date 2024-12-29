import React, {useState, useEffect} from "react";
import axios from "axios";
import "./UserProfile.css";
import BusList from '../components/Buslist';
import Dashboard from "./Dashboard";


const UserProfile = ({ user }) => {

    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // const [busName, setBusName] = useState('');
    // const [busId, setBusId] = useState('');
    // const [userName, setUserName] = useState('');
    // const [seatsBooked, setSeatsBooked] = useState('');

  const fetchBuses = async () => {
    const res = await axios.get('http://localhost:3001/buses');
    setBuses(res.data);
    setIsLoading(false);
  };

  const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3001/user");
      setUsers(res.data[1]);
      console.log("users", res);
  }
  
  useEffect(() => {
      setIsLoading(true);
      fetchBuses();
      fetchUsers();
  }, []);

  return (
    <>
    <nav></nav>
    <div className="user-profile">
      {/* <img  alt="User Avatar" className="avatar" /> */}
      <div  className="avatar"></div>
      <h1>{users.name}</h1>
      <p>{users.email}</p>
      <p>Phone Number</p>
    </div>
    <Dashboard />    
    <footer></footer>
    </>
  );
};

export default UserProfile;
