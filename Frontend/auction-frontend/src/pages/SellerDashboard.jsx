import { useState } from 'react';
import axios from 'axios';

function SellerDashboard() {
  const [auctionData, setAuctionData] = useState({
    title: '',
    description: '',
    starting_price: '',
    start_time: '',
    end_time: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auctions/new', auctionData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNotification({
        message: `Auction created successfully! Auction ID: ${response.data.auction_id}`,
        type: 'success'
      });

      setAuctionData({
        title: '',
        description: '',
        starting_price: '',
        start_time: '',
        end_time: ''
      });

      // Clear notification after 5 seconds
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    } catch (error) {
      console.error('Error creating auction:', error);
      setNotification({
        message: error.response?.data?.message || 'Failed to create auction',
        type: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setAuctionData({
      ...auctionData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Create New Auction</h2>
      {notification.message && (
        <div className={`p-4 mb-4 rounded ${
          notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={auctionData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={auctionData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-2">Starting Price:</label>
          <input
            type="number"
            name="starting_price"
            value={auctionData.starting_price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={auctionData.start_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={auctionData.end_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Auction
        </button>
      </form>
    </div>
  );
}

export default SellerDashboard;
