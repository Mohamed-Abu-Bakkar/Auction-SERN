import { useEffect, useState } from "react";
import axios from "axios";

function Bids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bids")
      .then(res => setBids(res.data))
      .catch(err => console.error("Error fetching bids:", err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Your Bids</h2>
      <ul>
        {bids.map((bid) => (
          <li key={bid.id} className="border p-4 mb-2">
            <h3>Auction ID: {bid.auctionId}</h3>
            <p>Your Bid: ${bid.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bids;
