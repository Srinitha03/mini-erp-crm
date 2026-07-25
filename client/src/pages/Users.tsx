import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  } catch (err) {
    console.log(err);
  }
};
const [editingId, setEditingId] = useState<number | null>(null);
const [search, setSearch] = useState("");
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);

const [form, setForm] = useState({
  name: "",
  email: "",
  role: "",
  phone: "",
  status: "Active",
});

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <button
  onClick={async () => {
    setEditingId(null);
    setForm({
      name: "",
      email: "",
      role: "",
      phone: "",
      status: "Active",
    });
    setShowForm(true);
  }}
  className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
>          <FaPlus />
          Add User
        </button>

      </div>
      {showForm && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit User" : "Add User"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border rounded-lg p-3 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border rounded-lg p-3 w-full"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="border rounded-lg p-3 w-full"
        >
          <option value="">Select Role</option>
          <option>Admin</option>
          <option>Sales</option>
          <option>Warehouse</option>
          <option>Accounts</option>
        </select>

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border rounded-lg p-3 w-full"
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="border rounded-lg p-3 w-full"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={async () => {
    try {
  if (editingId !== null) {
    await axios.put(
      `http://localhost:5000/users/${editingId}`,
      form
    );
  } else {
    await axios.post(
      "http://localhost:5000/users",
      form
    );
  }

  fetchUsers();
} catch (err) {
  console.log(err);
}

    setShowForm(false);

    setForm({
      name: "",
      email: "",
      role: "",
      phone: "",
      status: "Active",
    });
  }}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
>
  Save
</button>

      </div>

    </div>

  </div>
)}

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <div className="relative w-96">

          <FaSearch className="absolute left-3 top-4 text-gray-400"/>

          <input
  type="text"
  placeholder="Search User..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border rounded-lg pl-10 p-3 w-full"
/>

        </div>

      </div>

      {/* Users Table */}

      <table className="w-full bg-white rounded-xl shadow">

        <thead className="bg-blue-700 text-white">

          <tr>

            <th className="p-3">ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr
              key={user.id}
              className="text-center border-b hover:bg-gray-50"
            >

              <td className="p-3">{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>{user.phone}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    user.status === "Active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {user.status}
                </span>

              </td>

              <td>

                <button
  onClick={() => {
    setEditingId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
    });

    setShowForm(true);
  }}
  className="text-blue-600 mr-3"
>
  <FaEdit />
</button>
                <button
  onClick={async () => {
  if (window.confirm("Delete this user?")) {
    try {
      await axios.delete(
        `http://localhost:5000/users/${user.id}`
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  }
}}
  className="text-red-600"
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

export default Users;