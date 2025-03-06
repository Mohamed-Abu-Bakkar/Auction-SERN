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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bids" element={<Bids />} />

      </Routes>
    </>
  );
}

export default App;
