import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "buyer"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email: formData.email,
          password: formData.password
        });
        alert(response.data.message || "Login successful!");
        navigate("/auctions");
      } else {
        const response = await axios.post("http://localhost:5000/api/users/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        alert(response.data.message || "Registration successful!");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || `${isLogin ? "Login" : "Registration"} failed.`);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-center gap-4 mb-4">
        <button 
          className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
        {!isLogin && (
          <>
            <input
              className="p-2 mb-2 border rounded"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
            />
            <select
              className="p-2 mb-2 border rounded"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required={!isLogin}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </>
        )}
        
        <input
          className="p-2 mb-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="p-2 mb-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <button 
          className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsLogin(false)}
        >
          {!(isLogin) ? "Login" : "Register"}
        </button>

      </form>
    </div>
  );
}

export default Login;
