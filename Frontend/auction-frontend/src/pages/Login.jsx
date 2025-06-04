import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "bidder",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userId", response.data.user.id); // Save userId separately

        alert(response.data.message || "Login successful!");

        // Navigate based on role
        navigate("/home");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }
        );
        alert(response.data.message || "Registration successful!");
        setIsLogin(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `${isLogin ? "Login" : "Registration"} failed.`
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 items-center justify-center ">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-full border-2 border-blue-300">
        {/* Auction Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-blue-400 p-8 w-1/2">
          <img
            src="https://oldportal.autobazaarauction.com/assets/images/login_bg.png"
            alt="Auction Illustration"
            className="w-64 h-64 mb-6 drop-shadow-lg"
          />
          <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center ">
            Welcome to Dmitri's Auction{" "}
          </h2>
          <br />
          <p className="text-blue-900 text-lg text-center ">
            <b>Bid Win Sell </b>
            <br />
            your treasures!
          </p>
        </div>
        {/* Login/Register Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="">
            <div>
              <h2 className=" w-full  text-center text-3xl font-extrabold text-blue-800 mb-4 drop-shadow">
                {isLogin ? "Sign in to Auction" : "Create Auction Account"}
              </h2>
            </div>
            {!isLogin && (
              <div>
                <input
                  className=" appearance-none rounded-md block w-full px-4 py-2 border border-blue-300 placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base bg-blue-50"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <input
                className="appearance-none rounded-md block w-full px-4 py-2 border border-blue-300 placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base bg-blue-50"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="appearance-none rounded-md block w-full px-4 py-2 border border-blue-300 placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base bg-blue-50"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <select
                  className="appearance-none rounded-md block w-full px-4 py-2 border border-blue-300 text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base bg-blue-50"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required={!isLogin}
                >
                  <option value="bidder">Bidder</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            )}
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white font-bold bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 shadow-lg transition-all"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center py-2 px-4 text-sm text-blue-700 hover:text-blue-900 transition"
              >
                {isLogin
                  ? "Create new account"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
