import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuctionSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auctionId, highestBid, bidderId } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full flex flex-col items-center border-2 border-blue-300">
        <img
          src="https://www.shutterstock.com/image-vector/auction-hammer-line-icon-bid-260nw-2185146829.jpg"
          alt="Auction Sold"
          className="w-30 h-24 mb-6 rounded-full shadow-md object-top object-cover"
        />
        <h1 className="text-3xl font-extrabold text-green-600 mb-4 drop-shadow text-center">
          Auction Closed!
        </h1>
        <p className="mb-2 text-lg text-blue-900 text-center">
          Auction <span className="font-semibold">#{auctionId}</span> was
          successfully won by bidder{" "}
          <span className="font-semibold">#{bidderId}</span> with a bid of{" "}
          <span className="font-semibold">${highestBid}</span>.
        </p>
        <p className="mb-8 text-gray-700 text-center">
          This auction is now closed.
        </p>
        <button
          onClick={() => navigate("/auctions")}
          className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all"
        >
          Back to Auctions
        </button>
      </div>
    </div>
  );
}

export default AuctionSuccess;
