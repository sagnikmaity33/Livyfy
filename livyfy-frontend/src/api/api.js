import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// 🔍 SEARCH
export const hybridSearch = (payload) =>
  API.post("/search/hybrid", payload);

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