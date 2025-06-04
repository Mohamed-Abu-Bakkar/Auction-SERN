import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BiddingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState("");
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auctions/${id}`
        );
        if (!response.data) {
          throw new Error("Auction not found");
        }
        setAuction(response.data);
      } catch (err) {
        setError(err.response?.data?.error || `Unable to load auction #${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bidValue = parseFloat(bidAmount);
      if (isNaN(bidValue) || bidValue <= 0) {
        throw new Error("Invalid bid amount");
      }

      if (bidValue <= auction.current_price) {
        throw new Error(
          `Bid must be higher than current bid: $${auction.current_price}`
        );
      }

      // Get the logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("You must be logged in to place a bid.");
      }

      await axios.post("http://localhost:5000/api/bids", {
        auction_id: id,
        bid_amount: bidValue,
        bidder_id: user.id,
       
      });
 console.log(user.id)
      const updatedAuction = await axios.get(
        `http://localhost:5000/api/auctions/${id}`
      );
      setAuction(updatedAuction.data);
      setBidAmount("");
      alert("Bid placed successfully!");
    } catch (err) {
      alert(err.response?.data?.error || err.message || "Failed to place bid");
      console.error("Bid submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-4 text-blue-700 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (!auction) return <div className="p-4 text-center">Auction not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div 
        className="bg-white bg-opacity-95 bg-[url('/bg.jpg')] bg-cover bg-center bg-blend-overlay rounded-2xl shadow-2xl p-8 w-full max-w-3xl border-2 border-blue-200"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Rest of your existing code remains the same */}
        <div className="flex justify-center mb-6">
          {auction.image_url ? (
            <img
              src={auction.image_url}
              alt={auction.title}
              className="w-48 h-36 object-cover rounded-lg border border-blue-100 shadow"
            />
          ) : (
            <div className="w-48 h-36 flex items-center justify-center bg-blue-50 rounded-lg border border-blue-100 text-blue-300 text-7xl">
              <span role="img" aria-label="Auction">
                📦
              </span>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow">
          {auction.title}
        </h1>
        <div className="space-y-2 mb-8 text-center">
          <p className="text-gray-700">{auction.description}</p>
          <p className="font-bold text-xl text-blue-700">
            Current Bid: $
            {auction.current_bid ||
              auction.current_price ||
              auction.starting_price}
          </p>
          <p className="text-blue-900">
            <span className="font-semibold">Starting Price:</span> $
            {auction.starting_price}
          </p>
          <p>
            <span className="font-semibold">End Time:</span>{" "}
            {new Date(auction.end_time).toLocaleString()}
          </p>
        </div>
        <form onSubmit={handleSubmitBid} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Your Bid Amount ($)
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min={auction.current_price * 1.01}
              max={999999999}
              step="1"
              className="w-full p-3 border border-blue-300 rounded-md bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder={`Min bid: $${(auction.current_price * 1.01).toFixed(
                2
              )}`}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md text-white font-bold bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 shadow-lg transition-all ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Placing Bid..." : "Place Bid"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BiddingPage;
