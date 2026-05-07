import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createListing,
  getOwnerBookings,
  updateBookingStatus,
} from "../api/api";

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);

  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    amenities: "",
    ownerName: "",
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

  const handleAccept = async (id) => {
    try {
      await updateBookingStatus(id, "ACCEPTED");
      loadBookings();
    } catch (err) {
      alert(err?.response?.data?.message || "Accept failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateBookingStatus(id, "REJECTED");
      loadBookings();
    } catch (err) {
      alert(err?.response?.data?.message || "Reject failed");
    }
  };

  const handleSubmitListing = async () => {
    try {
      await createListing({
        ...listing,
        price: Number(listing.price),
      });

      alert("Listing created successfully!");

      setListing({
        title: "",
        description: "",
        price: "",
        location: "",
        amenities: "",
        ownerName: "",
      });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Listing create failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="glass p-6 rounded-3xl mb-8">
          <p className="text-yellow-300 text-sm">Owner Control Panel</p>
          <h1 className="text-4xl font-bold mt-2">Manage your PG business 🏠</h1>
          <p className="text-gray-400 mt-3">
            Create listings and manage student booking requests.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={activeTab === "bookings" ? "gold-btn px-5 py-2 rounded-full" : "glass px-5 py-2 rounded-full"}
          >
            Booking Requests
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={activeTab === "add" ? "gold-btn px-5 py-2 rounded-full" : "glass px-5 py-2 rounded-full"}
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
                      Listing #{booking.listingId}
                    </h3>

                    <span className="text-yellow-300 text-sm">
                      {booking.status || "PENDING"}
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3">
                    Message: {booking.message || "Interested"}
                  </p>

                  <p className="text-gray-400 mt-2">
                    Email: {booking.contactEmail || "N/A"}
                  </p>

                  <p className="text-gray-400 mt-2">
                    Phone: {booking.contactPhone || "N/A"}
                  </p>

                  {booking.status === "PENDING" && (
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold"
                      >
                        Accept
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
            <h2 className="text-3xl font-bold mt-2">Add PG / Flat Details</h2>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Title"
                value={listing.title}
                onChange={(e) => setListing({ ...listing, title: e.target.value })}
              />

              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Location"
                value={listing.location}
                onChange={(e) => setListing({ ...listing, location: e.target.value })}
              />

              <input
                type="number"
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Price"
                value={listing.price}
                onChange={(e) => setListing({ ...listing, price: e.target.value })}
              />

              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Amenities: wifi,food,ac"
                value={listing.amenities}
                onChange={(e) => setListing({ ...listing, amenities: e.target.value })}
              />

              <input
                className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none md:col-span-2"
                placeholder="Owner name"
                value={listing.ownerName}
                onChange={(e) => setListing({ ...listing, ownerName: e.target.value })}
              />
            </div>

            <textarea
              className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none mt-4 min-h-32"
              placeholder="Description"
              value={listing.description}
              onChange={(e) => setListing({ ...listing, description: e.target.value })}
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