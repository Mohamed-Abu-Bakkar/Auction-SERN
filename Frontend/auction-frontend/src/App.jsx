import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auctions from "./pages/Auctions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bids from "./pages/Bids";
import Navbar from "./components/Navbar";
import "./App.css";



function App() {
  return (
    <>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bids" element={<Bids />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
