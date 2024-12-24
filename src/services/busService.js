import axios from "axios";

const API_URL = 'http://localhost::5000/api/buses';

export const getBuses = async () => {
    return await axios.get(API_URL);
};

export const addBus = async (busData) => {
    return await axios.post(API_URL, busData);
};