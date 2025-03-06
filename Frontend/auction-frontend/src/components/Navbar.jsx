import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl">Auction System</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/auctions" className="mx-2">Auctions</Link>
        <Link to="/bids" className="mx-2">Bids</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/register" className="mx-2">Register</Link>

      </div>
    </nav>
  );
}

export default Navbar;
