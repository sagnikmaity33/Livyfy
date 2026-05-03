import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/listings/${id}`)
      .then((res) => setListing(res.data.data));
  }, [id]);

  const handleBooking = () => {
    axios.post("http://localhost:8080/api/v1/bookings", {
      listingId: id,
      message: "Interested",
    });

    alert("Booking request sent!");
  };

  if (!listing) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-6 glass rounded-xl">
        <h2 className="text-xl font-semibold">
          {listing.title}
        </h2>

        <p className="text-gray-400 mt-2">
          ₹{listing.price}
        </p>

        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 smooth"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ListingDetail;