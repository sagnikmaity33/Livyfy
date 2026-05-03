import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const getListings = () => API.get("/listings");

export const hybridSearch = (data:any) =>
  API.post("/search/hybrid", data);

export const aiQuery = (query: string) =>
  API.post(`/ai/query?query=${query}`);