import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole]= useState("Admin");
  const handleLogin = () => {
    localStorage.setItem("role", role);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2 border border-gray-200">

        {/* Left Section */}

        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex flex-col justify-center items-center p-12">

          <img
          src="https://cdn-icons-png.flaticon.com/512/681/681494.png"
          alt="Team"
          className="w-44 mb-8"
          />
          <h1 className="text-5xl font-extrabold mb-4 text-white">
  Mini ERP & CRM Portal
</h1>

          <p className="text-center text-blue-100 text-lg leading-8">
  Smart Business Management Solution
  <br />
  Manage Customers, Products, Inventory,
  Sales Challans, Reports and Accounts
  from one powerful dashboard.
</p>

        </div>

        {/* Right Section */}

        <div className="p-12">

          <h2 className="text-3xl font-bold text-blue-700">
            Welcome 
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to access your ERP Portal
          </p>

          {/* Email */}

          <div className="relative mb-5">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
            />

          </div>

          {/* Password */}

          <div className="relative mb-5">

            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* Role */}

          <div className="relative mb-5">

            <FaUserShield className="absolute left-4 top-4 text-gray-400" />

            <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
>
  <option value="Admin">Admin</option>
  <option value="Sales">Sales</option>
  <option value="Warehouse">Warehouse</option>
  <option value="Accounts">Accounts</option>
</select>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          {/* Button */}

          <button
          onClick={handleLogin} 
          className="w-full bg-blue-700 hover:bg-blue-800 hover:scale-105 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-xl">

            Login

          </button>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 Mini ERP + CRM Operations Portal
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;