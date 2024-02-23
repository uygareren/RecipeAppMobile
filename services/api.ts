import axios from "axios";

const API = process.env.API;

export const api = axios.create({
    baseURL: API,
    headers:{
        "Content-Type" : "application/json"
    }
});

