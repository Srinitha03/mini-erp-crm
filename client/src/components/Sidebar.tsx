import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBoxes,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaBoxOpen,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const role = localStorage.getItem("role") || "Admin";

  const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Customers", path: "/customers", icon: <FaUsers /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxes /> },
    { name: "Sales", path: "/sales", icon: <FaShoppingCart /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Users", path: "/users", icon: <FaUserShield /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const salesMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Customers", path: "/customers", icon: <FaUsers /> },
    { name: "Sales", path: "/sales", icon: <FaShoppingCart /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const warehouseMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxes /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const accountsMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Sales", path: "/sales", icon: <FaShoppingCart /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  let menuItems = adminMenu;

  if (role === "Sales") {
    menuItems = salesMenu;
  } else if (role === "Warehouse") {
    menuItems = warehouseMenu;
  } else if (role === "Accounts") {
    menuItems = accountsMenu;
  }

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-blue-700 text-white flex flex-col">

      <div className="text-center py-6 border-b border-blue-500">
        <h1 className="text-3xl font-bold">Mini ERP</h1>
        <p className="text-blue-200">{role} Portal</p>
      </div>

      <ul className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg ${
                location.pathname === item.path
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-blue-500">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500"
          onClick={() => localStorage.removeItem("role")}
        >
          <FaSignOutAlt />
          Logout
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;