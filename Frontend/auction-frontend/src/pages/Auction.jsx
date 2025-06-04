import { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user?.role === "seller";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auctions/list")
      .then((res) => setAuctions(res.data))
      .catch((err) => {
        const errorDetails = {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          endpoint: "/api/auctions/list",
          timestamp: new Date().toISOString(),
        };
        console.error("Error fetching auctions:", errorDetails);
        setError(err.response?.data?.error || "Failed to load auctions");
      });
  }, []);

  const handleBidClick = (auctionId) => {
    // Find the auction object
    const auctionObj = auctions.find((a) => a.id === auctionId);
    // If auction is completed or end_time has passed, redirect to success page
    if (
      auctionObj.status === "completed" ||
      new Date() > new Date(auctionObj.end_time)
    ) {
      navigate("/auction-success", {
        state: {
          auctionId: auctionObj.id,
          highestBid: auctionObj.current_bid || auctionObj.current_price,
          bidderId: auctionObj.bidder_id,
        },
      });
    } else {
      navigate(`/auction/${auctionId}/bid`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 ">
      <br />
      <div className="w-full max-w-1xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className=" text-4xl font-extrabold text-blue-800 drop-shadow">
            Active Auctions
          </h2>
          {isSeller && (
            <button
              onClick={() => navigate("/seller-dashboard")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow transition-all"
            >
              <PlusIcon className="h-6 w-6" />
              Create Auction
            </button>
          )}
        </div>
        <br />
        <br />
        {error && <div className="p-4 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-6 flex flex-col justify-between w-full md:w-[32rem] lg:w-[32rem] mx-auto mb-"
            >
              {/* Auction Image Placeholder */}
              <div className="flex justify-center mb-4">
                {auction.image_url ? (
                  <img
                    src={auction.image_url}
                    alt={auction.title}
                    className="w-40 h-32 object-cover rounded-lg border border-blue-100 shadow"
                  />
                ) : (
                  <div className="w-40 h-32 flex items-center justify-center bg-blue-50 rounded-lg border border-blue-100 text-blue-300 text-6xl">
                    <span role="img" aria-label="Auction">
                      📦
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                  {auction.title}
                </h3>
                <p className="text-blue-900 mb-1">
                  <span className="font-semibold">Seller ID:</span>{" "}
                  {auction.seller_id}
                </p>
                <p className="text-gray-700 mb-2">{auction.description}</p>
                <p className="mb-1">
                  <span className="font-semibold text-blue-600">
                    Starting Price:
                  </span>{" "}
                  ${auction.starting_price}
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-blue-600">
                    Current Bid:
                  </span>{" "}
                  ${auction.current_bid}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Start Time:</span>{" "}
                  {auction.start_time}
                </p>
                <p className="mb-3">
                  <span className="font-semibold">End Time:</span>{" "}
                  {auction.end_time}
                </p>
              </div>
              <button
                onClick={() => handleBidClick(auction.id)}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow transition-all"
              >
                Bid Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Auctions;
