import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// 🔍 SEARCH
export const hybridSearch = (payload) =>
  API.post("/ai/recommend", payload);

// 🤖 AI
export const aiDebate = (payload) =>
  API.post("/ai/debate", payload);

// 🏠 LISTING
export const getListingById = (id) =>
  API.get(`/listings/${id}`);

// 📦 BOOKINGS
export const createBooking = (listingId) =>
  API.post("/bookings", {
    listingId,
    userId: 101,
    message: "Interested in this PG",
  });

export const getMyBookings = () =>
  API.get("/bookings/user/101");

// 🤖 CHAT
export const chatbotQuery = (message) =>
  API.post("/chat", {
    message,
    previousContext: "",
  });

export const getListings = () =>
  API.get("/listings");                                               
// ================= AUTH =================

export const loginUser = (payload) =>
  API.post("/auth/login", payload);

export const signupUser = (payload) =>
  API.post("/auth/signup", payload);
// ================= OWNER =================

export const createListing = (payload) =>
  API.post("/listings", payload);

// booking endpoints — change only here if backend names differ
export const getOwnerBookings = () =>
  API.get("/bookings/owner");

export const approveBooking = (bookingId) =>
  API.patch(`/bookings/${bookingId}/approve`);

export const rejectBooking = (bookingId) =>
  API.patch(`/bookings/${bookingId}/reject`);