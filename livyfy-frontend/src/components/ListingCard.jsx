import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="glass p-4 rounded-2xl cursor-pointer smooth hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{listing.title}</h3>

        {listing.verified && (
          <span className="text-green-400 text-xs">
            ✔ Verified
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mt-2">
        ₹{listing.price}
      </p>

      <p className="text-xs text-gray-500">
        {listing.location}
      </p>
    </div>
  );
}

export default ListingCard;