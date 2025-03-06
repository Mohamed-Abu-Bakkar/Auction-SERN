import { useEffect, useState } from "react";
import axios from "axios";

function Auctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auctions")
      .then(res => setAuctions(res.data))
      .catch(err => console.error("Error fetching auctions:", err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Active Auctions</h2>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id} className="border p-4 mb-2">
            <h3 className="text-xl">{auction.itemName}</h3>
            <p>Starting Price: ${auction.startPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Auctions;
