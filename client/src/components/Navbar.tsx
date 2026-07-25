import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const role = localStorage.getItem("role") || "Admin";

  return (
    <div className="h-20 bg-white shadow flex justify-between items-center px-8">

      <h2 className="text-2xl font-bold text-gray-700">
        Dashboard
      </h2>

      <div className="flex items-center gap-6">

        <FaBell size={22} className="cursor-pointer text-gray-600" />

        <div className="flex items-center gap-3">

          <FaUserCircle size={38} className="text-blue-700" />

          <div>
            <p className="font-semibold text-gray-800">{role}</p>
            <p className="text-xs text-gray-500">Logged In</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;