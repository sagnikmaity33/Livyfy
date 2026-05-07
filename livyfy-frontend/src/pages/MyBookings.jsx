import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserBookings } from "../api/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings()
      .then((res) => setBookings(res.data.data || []))
      .catch((err) => {
        console.error(err);
        setBookings([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
          <div className="relative rounded-[32px] overflow-hidden bg-[#111] border border-yellow-400/20 p-10 min-h-[330px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="bookings"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative z-10">
              <p className="text-yellow-400 font-semibold">Your booking status</p>
              <h1 className="text-5xl font-bold mt-3">My Bookings</h1>
              <p className="text-gray-300 mt-4 max-w-xl">
                Track owner approval without sharing phone numbers publicly.
              </p>
            </div>
          </div>

          <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] p-8">
            <div className="text-7xl mb-4">🔐</div>
            <h3 className="text-3xl font-bold">Safe approval flow</h3>
            <p className="text-gray-400 mt-3">
              Your request goes to the owner first. You see status here.
            </p>
          </div>
        </section>

        {bookings.length === 0 && (
          <div className="bg-[#111] border border-yellow-400/20 p-8 rounded-[28px] text-gray-400 text-center">
            No booking requests yet.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-[#111] border border-yellow-400/20 p-6 rounded-[28px] shadow-lg">
              <h3 className="text-2xl font-bold">
                Listing #{booking.listingId}
              </h3>

              <p className="text-gray-400 mt-3">
                Message: {booking.message || "Interested"}
              </p>

              <p className="mt-5">
                Status:{" "}
                <span
                  className={
                    booking.status === "ACCEPTED"
                      ? "text-green-400 font-bold"
                      : booking.status === "REJECTED"
                      ? "text-red-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {booking.status || "PENDING"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyBookings;