import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const getListings = () => API.get("/listings");

export const getListingById = (id) => API.get(`/listings/${id}`);

export const hybridSearch = (payload) =>
  API.post("/search/hybrid", payload);

export const aiQuery = (query) =>
  API.post("/ai/query", { query });

export const chatbotQuery = (message) =>
  API.post("/ai/query", { query: message });
// ================= BOOKINGS =================

export const createBooking = (listingId) =>
  API.post("/bookings", {
    listingId,
    message: "Interested in this PG",
  });

export const getMyBookings = () =>
  API.get("/bookings/my");

export const getOwnerBookings = () =>
  API.get("/bookings/owner");

export const approveBooking = (bookingId) =>
  API.patch(`/bookings/${bookingId}/approve`);

export const rejectBooking = (bookingId) =>
  API.patch(`/bookings/${bookingId}/reject`);