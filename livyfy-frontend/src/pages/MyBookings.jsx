import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyBookings } from "../api/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then((res) => {
      setBookings(res.data.data || []);
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-6">
          My Bookings
        </h2>

        {bookings.length === 0 && (
          <p className="text-gray-400">
            No bookings yet.
          </p>
        )}

        {bookings.map((b) => (
          <div key={b.bookingId} className="glass p-5 rounded-2xl mb-4">
            <p>Listing ID: {b.listingId}</p>

            <p
              className={`mt-2 ${
                b.status === "APPROVED"
                  ? "text-green-400"
                  : b.status === "REJECTED"
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
            >
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;