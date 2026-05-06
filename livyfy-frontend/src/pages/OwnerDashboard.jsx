import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createListing,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
} from "../api/api";

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);

  const [listing, setListing] = useState({
    title: "",
    location: "",
    price: "",
    food: "YES",
    safety: "SAFE",
    description: "",
    imageUrl: "",
  });

  const loadBookings = () => {
    getOwnerBookings()
      .then((res) => setBookings(res.data.data || []))
      .catch((err) => {
        console.error(err);
        setBookings([]);
      });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  const handleSubmitListing = async () => {
    try {
      await createListing({
        title: listing.title,
        location: listing.location,
        price: Number(listing.price),
        food: listing.food,
        safety: listing.safety,
        description: listing.description,
        imageUrl: listing.imageUrl,
      });

      alert("Listing submitted successfully!");

      setListing({
        title: "",
        location: "",
        price: "",
        food: "YES",
        safety: "SAFE",
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
      alert("Listing submission failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="glass p-6 rounded-3xl mb-8">
          <p className="text-yellow-300 text-sm">Owner Control Panel</p>

          <h1 className="text-4xl font-bold mt-2">
            Manage your PG business 🏠
          </h1>

          <p className="text-gray-400 mt-3">
            Approve booking requests and publish verified stays for students.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={
              activeTab === "bookings"
                ? "gold-btn px-5 py-2 rounded-full"
                : "glass px-5 py-2 rounded-full"
            }
          >
            Booking Requests
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={
              activeTab === "add"
                ? "gold-btn px-5 py-2 rounded-full"
                : "glass px-5 py-2 rounded-full"
            }
          >
            Add PG / Flat
          </button>
        </div>

        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 && (
              <div className="glass p-6 rounded-3xl text-center text-gray-400">
                No booking requests yet.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="glass p-6 rounded-3xl">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold">
                      {booking.listingTitle || "PG Booking Request"}
                    </h3>

                    <span className="text-yellow-300 text-sm">
                      {booking.status || "PENDING"}
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3">
                    Requested by: {booking.userEmail || booking.userName || "Student"}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Booking ID: {booking.id}
                  </p>

                  {(booking.status === "PENDING" || !booking.status) && (
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(booking.id)}
                        className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="glass p-6 rounded-3xl max-w-3xl">
            <p className="text-yellow-300 text-sm">Submit your property</p>

            <h2 className="text-3xl font-bold mt-2">
              Add PG / Flat Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="PG / Flat title"
                value={listing.title}
                onChange={(e) =>
                  setListing({ ...listing, title: e.target.value })
                }
              />

              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Address / Location"
                value={listing.location}
                onChange={(e) =>
                  setListing({ ...listing, location: e.target.value })
                }
              />

              <input
                type="number"
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Monthly rent"
                value={listing.price}
                onChange={(e) =>
                  setListing({ ...listing, price: e.target.value })
                }
              />

              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Image URL"
                value={listing.imageUrl}
                onChange={(e) =>
                  setListing({ ...listing, imageUrl: e.target.value })
                }
              />

              <select
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                value={listing.food}
                onChange={(e) =>
                  setListing({ ...listing, food: e.target.value })
                }
              >
                <option value="YES">Food Available</option>
                <option value="NO">No Food</option>
              </select>

              <select
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                value={listing.safety}
                onChange={(e) =>
                  setListing({ ...listing, safety: e.target.value })
                }
              >
                <option value="SAFE">Safe</option>
                <option value="MODERATE">Moderate</option>
                <option value="HIGH_SECURITY">High Security</option>
              </select>
            </div>

            <textarea
              className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none mt-4 min-h-32"
              placeholder="Write bio / description about your PG..."
              value={listing.description}
              onChange={(e) =>
                setListing({ ...listing, description: e.target.value })
              }
            />

            <button
              onClick={handleSubmitListing}
              className="gold-btn px-6 py-3 rounded-full mt-5 smooth"
            >
              Submit Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;