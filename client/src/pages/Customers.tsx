import { useState ,useEffect} from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";


function Customers() {
  type Customer = {
  id: number;
  name: string;
  business: string;
  phone: string;
  email: string;
  type: string;
  status: string;
};

const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
  fetchCustomers();
}, []);

const fetchCustomers = async () => {
  try {
    const res = await axios.get("https://mini-erp-crm-rf8if.onrender.com/customers");
    setCustomers(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
  name: "",
  business: "",
  phone: "",
  email: "",
  type: "Retail",
  status: "Active",
});

  const openAdd = () => {
  setEditingId(null);

  setForm({
    name: "",
    business: "",
    phone: "",
    email: "",
    type: "Retail",
    status: "Active",
  });

  setShowForm(true);
};

  const openEdit = (customer: any) => {
    setEditingId(customer.id);
    setForm(customer);
    setShowForm(true);
  };

  const saveCustomer = async () => {
  try {
    if (editingId === null) {
      await axios.post("http://localhost:5000/customers", form);
    } else {
      await axios.put(
        `http://localhost:5000/customers/${editingId}`,
        form
      );
    }

    fetchCustomers();
    setShowForm(false);

    setForm({
      name: "",
      business: "",
      phone: "",
      email: "",
      type: "Retail",
      status: "Active",
    });

    setEditingId(null);
  } catch (err) {
    console.log(err);
  }
};
  const deleteCustomer = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5000/customers/${id}`);
    fetchCustomers();
  } catch (err) {
    console.log(err);
  }
};
  const filteredCustomers = customers.filter((c) =>
  c.name.toLowerCase().includes(search.toLowerCase()) ||
  c.business.toLowerCase().includes(search.toLowerCase()) ||
  c.phone.includes(search) ||
  c.email.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Customers
        </h1>

        <button
          onClick={openAdd}
          className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
        >
          <FaPlus />
          Add Customer
        </button>

      </div>

      <div className="relative mb-6">

  < FaSearch className="absolute left-4 top-4 text-gray-400" />

  <input
    type="text"
    placeholder="Search customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg pl-12 p-3 shadow-sm"
  />

</div>
      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-blue-700 text-white">

  <tr>

    <th className="p-3">ID</th>
    <th>Customer</th>
    <th>Business</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Type</th>
    <th>Status</th>
    <th>Actions</th>

  </tr>

</thead>

        <tbody>

          {filteredCustomers.map((customer) => (

            <tr
  key={customer.id}
  className="border-b hover:bg-gray-50 text-center"
>

  <td className="p-3">{customer.id}</td>

  <td className="font-semibold">
    {customer.name}
  </td>

  <td>{customer.business}</td>

  <td>{customer.phone}</td>

  <td>{customer.email}</td>

  <td>

    <span
  className={`px-3 py-1 rounded-full text-white text-sm ${
    customer.type === "Retail"
      ? "bg-blue-600"
      : "bg-purple-600"
  }`}
>
  {customer.type}
</span>

  </td>

  <td>

    <span
      className={`px-3 py-1 rounded-full text-white text-sm ${
        customer.status === "Active"
          ? "bg-green-600"
          : customer.status === "Lead"
          ? "bg-yellow-500"
          : "bg-red-600"
      }`}
    >
      {customer.status}
    </span>

  </td>

  <td>

    <button
      onClick={() => openEdit(customer)}
      className="text-green-600 hover:text-green-800 mr-4"
    >
      <FaEdit />
    </button>

    <button
      onClick={() => deleteCustomer(customer.id)}
      className="text-red-600 hover:text-red-800"
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

        {editingId ? "Edit Customer" : "Add Customer"}

      </h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="text"
        placeholder="Business Name"
        value={form.business}
        onChange={(e) =>
          setForm({ ...form, business: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4"
      >
        <option value="Retail">Retail</option>
        <option value="Wholesale">Wholesale</option>
      </select>

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-6"
      >
        <option value="Active">Active</option>
        <option value="Lead">Lead</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={saveCustomer}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
        >
          {editingId ? "Update Customer" : "Save Customer"}
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}

export default Customers;
