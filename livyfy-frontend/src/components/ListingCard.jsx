import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="glass p-4 rounded-2xl cursor-pointer smooth hover:scale-[1.02]"
    >
      <h3 className="font-semibold">{listing.title}</h3>

      <p className="text-gray-400 text-sm mt-1">
        📍 {listing.location}
      </p>

      <p className="text-yellow-300 mt-2 font-bold">
        ₹{listing.price}
      </p>

      {listing.verified && (
        <span className="text-green-400 text-xs">
          ✔ Verified
        </span>
      )}
    </div>
  );
}

export default ListingCard;