import { useParams } from "react-router-dom";

function AuctionDetails() {
  const { id } = useParams();
  return <h1>Auction Details for ID: {id}</h1>;
}

export default AuctionDetails;
