import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyBookings } from "../api/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings()
      .then((res) => setBookings(res.data.data || []))
      .catch((err) => {
        console.error(err);
        setBookings([]);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-yellow-300 text-sm">Your booking requests</p>
        <h2 className="text-3xl font-bold mt-1 mb-6">My Bookings</h2>

        {bookings.length === 0 && (
          <div className="glass p-6 rounded-3xl text-gray-400 text-center">
            No booking requests yet.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="glass p-5 rounded-3xl">
              <h3 className="text-xl font-semibold">
                {booking.listingTitle || "PG Booking"}
              </h3>

              <p className="text-gray-400 mt-2">
                Booking ID: {booking.id}
              </p>

              <p className="mt-4">
                Status:{" "}
                <span
                  className={
                    booking.status === "APPROVED"
                      ? "text-green-300"
                      : booking.status === "REJECTED"
                      ? "text-red-300"
                      : "text-yellow-300"
                  }
                >
                  {booking.status || "PENDING"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;