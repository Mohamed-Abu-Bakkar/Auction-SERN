import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", { email, password });
      alert("Login successful!");
      navigate("/auctions");
    } catch (error) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input className="p-2 mb-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="p-2 mb-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}

export default Login;
