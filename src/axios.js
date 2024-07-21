import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,//api cloud function rl
})
export default instance;
//http://127.0.0.1:5001/ecommerce-website-7817c/us-central1/api
//https://us-central1-ecommerce-website-7817c.cloudfunctions.net/api