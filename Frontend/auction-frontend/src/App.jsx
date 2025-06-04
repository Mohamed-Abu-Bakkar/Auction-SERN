import { Routes, Route } from "react-router-dom";
import Auction from "./pages/Auction";
import Login from "./pages/Login";
import Bids from "./pages/Bids";
import AuctionSuccess from "./pages/AuctionSuccess";
import Home from "./pages/Home";
import AuctionDetails from "./pages/BiddingPage";
import Navbar from "./components/Navbar";
import SellerDashboard from './pages/SellerDashboard';
import "./App.css";



function App() {
  return (
    <>
      
      <Routes>
        <Route path="/auction-success" element={<AuctionSuccess />} />

        <Route path="/auction/:id/bid" element={<AuctionDetails />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/bids" element={<Bids />} />
        <Route path="/auctions" element={<Auction />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        
      </Routes>
    </>
  );
}

export default App;
