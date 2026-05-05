import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getOwnerBookings,
  approveBooking,
  rejectBooking,
} from "../api/api";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);

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
    await approveBooking(id);
    loadBookings();
  };

  const handleReject = async (id) => {
    await rejectBooking(id);
    loadBookings();
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-yellow-300 text-sm">Owner approval panel</p>
        <h2 className="text-3xl font-bold mt-1 mb-6">Booking Requests</h2>

        {bookings.length === 0 && (
          <div className="glass p-6 rounded-3xl text-gray-400 text-center">
            No booking requests received.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="glass p-5 rounded-3xl">
              <h3 className="text-xl font-semibold">
                {booking.listingTitle || "PG Booking Request"}
              </h3>

              <p className="text-gray-400 mt-2">
                Requested by: {booking.userName || "Student"}
              </p>

              <p className="mt-3">
                Status:{" "}
                <span className="text-yellow-300">
                  {booking.status || "PENDING"}
                </span>
              </p>

              {booking.status === "PENDING" && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleApprove(booking.id)}
                    className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold"
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
    </div>
  );
}

export default OwnerBookings;