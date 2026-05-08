import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getListingById, createBooking } from "../api/api";
import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";


function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState("Interested in this PG");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    getListingById(id)
      .then((res) => setListing(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBooking = async () => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (role !== "USER") {
      alert("Only users can create bookings. Please login as USER.");
      return;
    }

    try {
      await createBooking({
        listingId: Number(id),
        message,
        contactEmail: email,
        contactPhone,
      });

      alert("Booking request sent to owner!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  if (!listing) {
    return (
      <div>
        <Navbar />
        <p className="p-6 text-gray-400">Loading listing...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-yellow-400/30 to-black flex items-center justify-center text-8xl">
            🏡
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold">{listing.title}</h2>

            <p className="text-yellow-300 text-3xl font-bold mt-4">
              ₹{listing.price}
            </p>

            <p className="text-gray-400 mt-2">📍 {listing.location}</p>

            {listing.verified && (
              <p className="text-green-300 mt-3">✔ Verified listing</p>
            )}

            <p className="text-gray-400 mt-4">{listing.description}</p>

            <div className="glass p-5 rounded-2xl mt-6 space-y-4">
              <p className="text-yellow-300 font-semibold">
                Request Booking
              </p>

              <textarea
                className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {listing.latitude && listing.longitude && (
  <div className="mt-6">

    <p className="text-yellow-300 mb-3 font-semibold">
      Property Location
    </p>

    <MapContainer
      center={[
        listing.latitude,
        listing.longitude,
      ]}
      zoom={15}
      className="h-[350px] w-full rounded-3xl overflow-hidden z-0"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          listing.latitude,
          listing.longitude,
        ]}
      />
    </MapContainer>
  </div>
)}
              <input
                className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
                placeholder="Contact phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />

              <button
                onClick={handleBooking}
                className="gold-btn px-6 py-3 rounded-full smooth"
              >
                Send Booking Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;