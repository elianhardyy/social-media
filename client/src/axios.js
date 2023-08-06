import axios from "axios";

const formData = new FormData();
export const request = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const requestfile = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
  },
});
