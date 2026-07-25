import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

function Inventory() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  type InventoryItem = {
  id: number;
  sku: string;
  product: string;
  quantity: number;
  type: string;
  reason: string;
  createdBy: string;
  timestamp: string;
};

const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [form, setForm] = useState({
    sku:"",
    product: "",
    quantity: "",
    type:"IN",
    reason:"",
    createdBy:"",
  });
  useEffect(() => {
  fetchInventory();
}, []);

const fetchInventory = async () => {
  try {
    const res = await axios.get("http://localhost:5000/inventory");
    setInventory(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Inventory</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
        >
          <FaPlus />
          Add Inventory
        </button>
      </div>

      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-12 p-3 shadow-sm"
        />
      </div>
      <table className="w-full bg-white shadow rounded-lg">

  <thead className="bg-blue-700 text-white">
    <tr>
      <th className="p-3">ID</th>
      <th>SKU</th>
      <th>Product</th>
      <th>Quantity Changed</th>
<th>Movement Type</th>
<th>Reason</th>
<th>Created By</th>
<th>Timestamp</th>
    </tr>
  </thead>

  <tbody>

    {inventory
      .filter((item) =>
        item.product.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => (

        <tr
          key={item.id}
          className="border-b hover:bg-gray-50 text-center"
        >

          <td className="p-3">{item.id}</td>
          <td>{item.sku}</td>

          <td className="font-semibold">
            {item.product}
          </td>

          <td>
  {item.type === "IN"
    ? `+${item.quantity}`
    : `-${item.quantity}`}
</td>

<td>
  <span
    className={`px-3 py-1 rounded-full text-white text-sm ${
      item.type === "IN"
        ? "bg-green-600"
        : "bg-red-600"
    }`}
  >
    {item.type}
  </span>
</td>

<td>{item.reason}</td>

<td>{item.createdBy}</td>

<td>
  {new Date(item.timestamp).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</td>
          <td className="py-3">

           <button
  onClick={() => {
    setForm({
       sku: item.sku,
  product: item.product,
  quantity: item.quantity.toString(),
  type: item.type,
  reason: item.reason,
  createdBy: item.createdBy,

    });

    setEditingId(item.id);
    setShowForm(true);
  }}
  className="text-blue-600 hover:text-blue-800 text-lg mr-4"
  title="Edit"
>
  <FaEdit />
</button>

           <button
  onClick={() => setDeleteId(item.id)}
  className="text-red-600 hover:text-red-800 text-lg"
  title="Delete"
>
  <FaTrash />
</button>

          </td>

        </tr>

      ))}

  </tbody>

</table>
{showForm && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white p-8 rounded-2xl w-[500px] shadow-2xl">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
  {editingId !== null ? "Edit Inventory" : "Add Inventory"}
</h2>
<input
        type="text"
        placeholder="SKU Code"
        value={form.sku}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        className="w-full border p-3 rounded-lg mb-4"
      />
      
      <input
        type="text"
        placeholder="Product Name"
        value={form.product}
        onChange={(e) => setForm({ ...form, product: e.target.value })}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="text"
        placeholder="Quantity Changed"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="w-full border p-3 rounded-lg mb-4"
      />


      <select
value={form.type}
onChange={(e) =>
  setForm({ ...form, type: e.target.value })
}
className="w-full border p-3 rounded-lg mb-4"
>
  <option value="IN">IN</option>
  <option value="OUT">OUT</option>
</select>

<input
type="text"
placeholder="Reason"
value={form.reason}
onChange={(e) =>
  setForm({ ...form, reason: e.target.value })
}
className="w-full border p-3 rounded-lg mb-4"
/>

<input
type="text"
placeholder="Created By"
value={form.createdBy}
onChange={(e) =>
  setForm({ ...form, createdBy: e.target.value })
}
className="w-full border p-3 rounded-lg mb-4"
/>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
  try {

    if (editingId === null) {

      await axios.post(
        "http://localhost:5000/inventory",
        form
      );

    } else {

      await axios.put(
        `http://localhost:5000/inventory/${editingId}`,
        form
      );

    }

    fetchInventory();

    setShowForm(false);

    setEditingId(null);

    setForm({
      sku: "",
      product: "",
      quantity: "",
      type: "IN",
      reason: "",
      createdBy: "",
    });

  } catch (err) {
    console.log(err);
  }
}}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
        >
          Save Inventory
        </button>

      </div>

    </div>

  </div>
)}
{deleteId !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

    <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">

      <h2 className="text-xl font-bold text-red-600 mb-4">
        Delete Inventory
      </h2>

      <p className="text-gray-700 mb-6">
        Are you sure you want to delete this inventory item?
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setDeleteId(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
  try {

    await axios.delete(
      `http://localhost:5000/inventory/${deleteId}`
    );

    fetchInventory();

    setDeleteId(null);

  } catch (err) {
    console.log(err);
  }
}}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
</div>
  );
}

export default Inventory;