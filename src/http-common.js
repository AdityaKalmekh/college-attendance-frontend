import axios from "axios";

export default axios.create({
  baseURL: "https://college-backend.netlify.app/",
  headers: {
    "Content-type": "application/json",
  },
});
