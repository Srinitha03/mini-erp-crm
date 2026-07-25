import { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf, FaFileExcel, FaSearch } from "react-icons/fa";

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

function Reports() {
  const [reports, setReports] = useState<any[]>([]);
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [status, setStatus] = useState("");
const [customer, setCustomer] = useState("");
useEffect(() => {
  fetchReports();
}, []);

const fetchReports = async () => {
  try {
    const res = await axios.get("http://localhost:5000/reports");
    console.log("Reports API:", res.data);
    setReports(res.data);
  } catch (err) {
    console.log(err);
  }
};
const filteredReports = reports.filter((item) => {
  const matchesCustomer =
    customer === "" ||
    item.customer.toLowerCase().includes(customer.toLowerCase());

  const matchesStatus =
    status === "" ||
    status === "All Status" ||
    item.status === status;

  const matchesFromDate =
    fromDate === "" ||
    item.date >= fromDate;

  const matchesToDate =
    toDate === "" ||
    item.date <= toDate;

  return (
    matchesCustomer &&
    matchesStatus &&
    matchesFromDate &&
    matchesToDate
  );
});  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18000 },
    { month: "Mar", sales: 22000 },
    { month: "Apr", sales: 15000 },
    { month: "May", sales: 27000 },
    { month: "Jun", sales: 35000 },
  ];

  const statusData = [
    { name: "Confirmed", value: 18 },
    { name: "Draft", value: 5 },
    { name: "Cancelled", value: 2 },
  ];

  const productData = [
    { product: "Rice Bag", quantity: 120 },
    { product: "Sugar", quantity: 80 },
    { product: "Oil", quantity: 60 },
    { product: "Wheat", quantity: 40 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];
  const totalSales = reports.reduce((sum, item) => sum + item.amount, 0);

const totalChallans = reports.length;

const totalCustomers = new Set(
  reports.map((item) => item.customer)
).size;

const totalProducts = reports.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Reports</h1>

        <div className="flex gap-3">
          <button
  onClick={() => alert("PDF Export Successful")}
  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
>
            <FaFilePdf />
            Export PDF
          </button>

          <button
  onClick={() => alert("Excel Export Successful")}
  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
>
            <FaFileExcel />
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Sales</h3>
          <h2 className="text-3xl font-bold text-green-600">
  ₹{totalSales.toLocaleString()}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Challans</h3>
          <h2 className="text-3xl font-bold">
  {totalChallans}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Customers</h3>
          <h2 className="text-3xl font-bold">
  {totalCustomers}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Products Sold</h3>
          <h2 className="text-3xl font-bold">
  {totalProducts}
</h2>
        </div>

      </div>
            {/* Monthly Sales Trend */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Monthly Sales Trend</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Challan Status */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Challan Status</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="quantity"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
<div className="bg-white rounded-xl shadow p-6 mb-8">

  <h2 className="text-xl font-bold mb-5">Filters</h2>

  <div className="grid grid-cols-4 gap-4">

    {/* From Date */}
    <div>
      <label className="block text-sm font-medium mb-2">
        From Date
      </label>
      <input
  type="date"
  value={fromDate}
  onChange={(e) => setFromDate(e.target.value)}
  className="border rounded-lg p-3 w-full"
/>
    </div>

    {/* To Date */}
    <div>
      <label className="block text-sm font-medium mb-2">
        To Date
      </label>
      <input
  type="date"
  value={toDate}
  onChange={(e) => setToDate(e.target.value)}
  className="border rounded-lg p-3 w-full"
/>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Status
      </label>

      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="border rounded-lg p-3 w-full"
>
        <option>All Status</option>
        <option>Confirmed</option>
        <option>Draft</option>
        <option>Cancelled</option>
      </select>
    </div>

    {/* Customer */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Customer
      </label>

      <div className="relative">
        <FaSearch className="absolute left-3 top-4 text-gray-400" />

        <input
  type="text"
  value={customer}
  onChange={(e) => setCustomer(e.target.value)}
  placeholder="Search Customer..."
  className="border rounded-lg pl-10 p-3 w-full"
/>
      </div>
    </div>

  </div>

</div>
            {/* Reports Table */}
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">

        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-3">Challan No</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredReports.map((item) => (
            <tr
              key={item.id}
              className="text-center border-b hover:bg-gray-50"
            >
              <td className="p-3">{item.challanNo}</td>

              <td>{item.customer}</td>

              <td>{item.products}</td>

              <td>{item.quantity}</td>

              <td>₹{item.amount}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    item.status === "Confirmed"
                      ? "bg-green-600"
                      : item.status === "Draft"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td>
  {new Date(item.date).toLocaleDateString("en-GB")}
</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Reports;