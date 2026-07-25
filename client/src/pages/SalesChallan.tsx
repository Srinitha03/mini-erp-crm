import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

function SalesChallan() {
  const [search, setSearch] = useState("");

  const [challans, setChallans] = useState<any[]>([]);
  const [stock, setStock] = useState([
  { product: "Rice Bag", quantity: 100 },
  { product: "Sugar", quantity: 50 },
  { product: "Sunflower Oil", quantity: 30 },
]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
const [deleteId, setDeleteId] = useState<number | null>(null);
const fetchSales = async () => {
  try {
    const res = await axios.get("http://localhost:5000/sales");
    setChallans(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchSales();
}, []);

type ChallanProduct = {
  product: string;
  quantity: number;
};

const [form, setForm] = useState<{
  challanNo: string;
  customer: string;
  product: string;
  quantity: string;
  status: string;
  createdBy: string;
  products: ChallanProduct[];
}>({
  challanNo: `CH${String(challans.length + 1).padStart(4, "0")}`,
  customer: "",
  product: "",
  quantity: "",
  status: "Draft",
  createdBy: "Sales",
  products: [],
});
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Sales Challan</h1>

        <button
  onClick={() => {
    setForm({
      challanNo: `CH${String(challans.length + 2).padStart(4, "0")}`,
      customer: "",
      product: "",
      quantity: "",
      status: "Draft",
      createdBy: "Sales",
      products:[],
    });

    setShowForm(true);
  }}
  className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
>
  <FaPlus />
  Add Challan
</button>
{deleteId !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">

      <h2 className="text-xl font-bold text-red-600 mb-4">
        Delete Challan
      </h2>

      <p className="mb-6">
        Are you sure you want to delete this challan?
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setDeleteId(null)}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
  try {
    await axios.delete(
      `http://localhost:5000/sales/${deleteId}`
    );

    fetchSales();
    setDeleteId(null);
  } catch (err) {
    console.log(err);
  }
}}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}
      </div>
      {showForm && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white p-8 rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Add Sales Challan
      </h2>

      <input
        type="text"
        value={form.challanNo}
        readOnly
        className="w-full border p-3 rounded-lg mb-4 bg-gray-100"
      />

      <select
        value={form.customer}
        onChange={(e) =>
          setForm({ ...form, customer: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      >
        <option value="">Select Customer</option>
        <option>Rahul Kumar</option>
        <option>Priya</option>
        <option>Ramesh</option>
      </select>

      <select
        value={form.product}
        onChange={(e) =>
          setForm({ ...form, product: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      >
        <option value="">Select Product</option>
        <option>Rice Bag</option>
        <option>Sugar</option>
        <option>Sunflower Oil</option>
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />
<button
  type="button"
  onClick={() => {
    if (!form.product || !form.quantity) return;

    setForm({
      ...form,
      products: [
        ...form.products,
        {
          product: form.product,
          quantity: Number(form.quantity),
        },
      ],
      product: "",
      quantity: "",
    });
  }}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mb-4"
>
  Add Product
</button>
<div className="mb-4">
  <h3 className="font-semibold mb-2">Added Products</h3>
  <div className="mb-4">
  <h3 className="font-semibold mb-2">Current Stock</h3>

  <table className="w-full border rounded">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2">Product</th>
        <th>Available</th>
      </tr>
    </thead>

    <tbody>
      {stock.map((s) => (
        <tr key={s.product} className="text-center border-t">
          <td className="p-2">{s.product}</td>
          <td>{s.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  {form.products.length === 0 ? (
    <p className="text-gray-500">No products added.</p>
  ) : (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Product</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        {form.products.map((item, index) => (
          <tr key={index} className="text-center border-t">
            <td className="p-2">{item.product}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      >
        <option>Draft</option>
        <option>Confirmed</option>
        <option>Cancelled</option>
      </select>

      <input
        type="text"
        value={form.createdBy}
        readOnly
        className="w-full border p-3 rounded-lg mb-6 bg-gray-100"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={async() => {
    if (form.status === "Confirmed") {
  for (const p of form.products) {
    const item = stock.find((s) => s.product === p.product);

    if (!item || item.quantity < p.quantity) {
      alert(`Insufficient Stock for ${p.product}`);
      return;
    }
  }
}
    const data = {
  challan_no: form.challanNo,
  customer: form.customer,
  products: form.products
    .map((p) => `${p.product} (${p.quantity})`)
    .join(", "),
  total_qty: form.products.reduce((a, b) => a + b.quantity, 0),
  status: form.status,
  created_by: form.createdBy,
  created_date: new Date().toISOString().split("T")[0],
};

try {
  if (editingId) {
    await axios.put(
      `http://localhost:5000/sales/${editingId}`,
      data
    );
  } else {
    await axios.post(
      "http://localhost:5000/sales",
      data
    );
  }

  fetchSales();
  setShowForm(false);
} catch (err) {
  console.log(err);
}    if (form.status === "Confirmed") {
  setStock(
    stock.map((s) => {
      const sold = form.products.find(
        (p) => p.product === s.product
      );

      if (sold) {
        return {
          ...s,
          quantity: s.quantity - sold.quantity,
        };
      }

      return s;
    })
  );
}

    setForm({
      challanNo: `CH${String(challans.length + 2).padStart(4, "0")}`,
      customer: "",
      product: "",
      quantity: "",
      status: "Draft",
      createdBy: "Sales",
      products:[],
    });
  }}
  className="bg-blue-700 text-white px-5 py-2 rounded-lg"
>
  Save Challan
</button>

      </div>

    </div>

  </div>
)}

      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Challan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-12 p-3 shadow-sm"
        />
      </div>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th>Challan No</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total Qty</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {challans
            .filter((item) =>
              item.customer.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 text-center"
              >
                <td className="p-3">{item.id}</td>

                <td>{item.challan_no}</td>

                <td className="font-semibold">{item.customer}</td>

                <td>
  {item.products}
</td>

                <td>{item.total_qty}</td>

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

                <td>{item.createdBy}</td>

                <td>{new Date(item.createdDate).toLocaleDateString("en-IN")}</td>

                <td className="py-3">
                  <button
  onClick={() => {
    setForm({
  challanNo: item.challan_no,
  customer: item.customer,
  product: "",
  quantity: "",
  status: item.status,
  createdBy: item.createdBy,
  products: [],
});

    setEditingId(item.id);
    setShowForm(true);
  }}
  className="text-blue-600 hover:text-blue-800 text-lg mr-4"
>
  <FaEdit />
</button>

                  <button
  onClick={() => setDeleteId(item.id)}
  className="text-red-600 hover:text-red-800 text-lg"
>
  <FaTrash />
</button>
                </td>
              </tr>
            ))}

        </tbody>

      </table>

    </div>
  );
}

export default SalesChallan;