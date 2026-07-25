import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const role = localStorage.getItem("role") || "Admin";
  const [dashboard, setDashboard] = useState<{
  customers: number;
  products: number;
  sales: number;
  pending: number;
}>({
  customers: 0,
  products: 0,
  sales: 0,
  pending: 0,
});
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await axios.get("http://localhost:5000/dashboard");
    setDashboard({
  customers: Number(res.data.customers),
  products: Number(res.data.products),
  sales: Number(res.data.sales),
  pending: Number(res.data.pending),
});
  } catch (err) {
    console.log(err);
  }
};
  const inventoryTrend = [
  { month: "Jan", stock: 450 },
  { month: "Feb", stock: 520 },
  { month: "Mar", stock: 480 },
  { month: "Apr", stock: 610 },
  { month: "May", stock: 590 },
  { month: "Jun", stock: 700 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Furniture", value: 25 },
  { name: "Accessories", value: 20 },
  { name: "Others", value: 20 },
];

const stockStatus = [
  { name: "In Stock", count: 350 },
  { name: "Low Stock", count: 40 },
  { name: "Out of Stock", count: 12 },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">
          Welcome, {role} 👋
        </h1>

        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Total Customers" value={String(dashboard.customers)} />
<StatCard title="Products" value={String(dashboard.products)} />
<StatCard title="Today's Sales" value={String(dashboard.sales)} />
<StatCard title="Pending Orders" value={String(dashboard.pending)} />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">

  {/* Line Chart */}
  <div className="bg-white rounded-xl shadow p-5 h-80">
    <h2 className="text-xl font-semibold mb-4">
      Inventory Trend
    </h2>

    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={inventoryTrend}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="stock" stroke="#2563eb" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Pie Chart */}
  <div className="bg-white rounded-xl shadow p-5 h-80">
    <h2 className="text-xl font-semibold mb-4 text-center">
      Category Distribution
    </h2>

    <ResponsiveContainer width="100%" height="90%">
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {categoryData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Bar Chart */}
  <div className="bg-white rounded-xl shadow p-5 h-80">
    <h2 className="text-xl font-semibold mb-4">
      Stock Status
    </h2>

    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={stockStatus}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#16a34a" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>

        <div className="mt-10 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Dashboard Overview
          </h2>

          <p className="text-gray-600">
            This is the main dashboard of the Mini ERP & CRM System.
            Here you can monitor customers, inventory, sales, reports,
            and manage the entire business from one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;