import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="glass rounded-3xl overflow-hidden cursor-pointer smooth hover:scale-[1.03] hover:shadow-2xl"
    >
      <div className="h-40 bg-gradient-to-br from-yellow-400/30 to-black flex items-center justify-center text-6xl">
        🏡
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-lg">{listing.title}</h3>

          {listing.verified && (
            <span className="text-green-300 text-xs bg-green-400/10 px-3 py-1 rounded-full">
              ✔ Verified
            </span>
          )}
        </div>

        <p className="text-yellow-300 text-xl font-bold mt-3">
          ₹{listing.price}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          📍 {listing.location}
        </p>

        <p className="text-xs text-gray-500 mt-3">
          AI Match: Good budget fit, trusted location and student-friendly stay.
        </p>
      </div>
    </div>
  );
}

export default ListingCard;