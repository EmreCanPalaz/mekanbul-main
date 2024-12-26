import axios from "axios";
export default axios.create({
  //baseURL: "http://localhost:3000/api",
  baseURL:"mekanbul-main.vercel.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
