import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getListingById } from "../api/api";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    getListingById(id)
      .then((res) => setListing(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

const handleBooking = async () => {
  try {
    await createBooking(id);
    alert("Booking request sent!");
    navigate("/my-bookings");
  } catch (err) {
    console.error(err);
    alert("Booking failed");
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
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-bold">{listing.title}</h2>

                <p className="text-gray-400 mt-2">
                  📍 {listing.location}
                </p>
              </div>

              {listing.verified && (
                <span className="text-green-300 text-sm bg-green-400/10 px-4 py-2 rounded-full">
                  ✔ Verified
                </span>
              )}
            </div>

            <p className="text-yellow-300 text-3xl font-bold mt-6">
              ₹{listing.price}
            </p>

            {listing.description && (
              <p className="text-gray-400 mt-4 leading-relaxed">
                {listing.description}
              </p>
            )}

            <div className="glass p-4 rounded-2xl mt-6">
              <p className="text-yellow-300 text-sm font-medium">
                Booking Flow
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Request booking without sharing owner phone number. Owner will
                approve or reject the request from their panel.
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="gold-btn mt-6 px-6 py-3 rounded-full smooth"
            >
              Request Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;