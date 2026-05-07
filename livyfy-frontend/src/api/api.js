import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// 🔍 SEARCH

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH
export const loginUser = (payload) => API.post("/auth/login", payload);
export const signupUser = (payload) => API.post("/auth/signup", payload);

// LISTINGS
export const getListings = () => API.get("/listings");
export const getListingById = (id) => API.get(`/listings/${id}`);
export const createListing = (payload) => API.post("/listings", payload);
export const verifyListing = (id) =>
  API.patch(`/listings/${id}/verify?adminKey=secret123`);

export const hybridSearch = (payload) =>
  API.post("/search/hybrid", payload);

// BOOKINGS
export const createBooking = (payload) => API.post("/bookings", payload);
export const getOwnerBookings = () => API.get("/bookings/owner");
export const getUserBookings = () => API.get("/bookings/user");

export const updateBookingStatus = (bookingId, status) =>
  API.patch(`/bookings/${bookingId}/status`, { status });





// AI
export const aiRecommend = (payload) =>
  API.post("/ai/recommend", payload);

export const aiDebate = (payload) =>
  API.post("/ai/debate", payload);