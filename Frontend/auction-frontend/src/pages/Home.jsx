import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 max-w-xl w-full flex flex-col items-center border-2 border-blue-300">
        <img
        src="https://reverse.auctionindia.com/assets/images/auction.png"
        alt="Auction Icon"
        className="w-32 h-32 mb-6 rounded-full shadow-md"
        />
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4 drop-shadow text-center">
        Welcome to the Auction System
        </h2>
        <p className="mb-8 text-blue-900 text-lg text-center">
        Browse, bid, and win auctions in real-time.<br />
        Join the excitement and find your next treasure!
        </p>
        <button 
        onClick={() => navigate('/auctions')}
        className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all"
        >
        Enter Auction Market
        </button>
      </div>
      </div>
    );
}

export default Home;
