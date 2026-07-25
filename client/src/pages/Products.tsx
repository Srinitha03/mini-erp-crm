import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSearch , FaEdit, FaTrash} from "react-icons/fa";

function Products() {
  type Product = {
  id: number;
  sku: string;
  product_name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
};

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
  });
  useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      <div className="relative mb-6">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Product..."
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
      <th>Category</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Status</th>
      <th>Actions</th>

    </tr>

  </thead>

  <tbody>

    {products
      .filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      )
      .map((product) => (

        <tr
          key={product.id}
          className="border-b hover:bg-gray-50 text-center"
        >

          <td className="p-3">{product.id}</td>
          <td>{product.sku}</td>

          <td className="font-semibold">
            {product.product_name}
          </td>

          <td>{product.category}</td>

          <td>₹ {product.price}</td>

          <td>{product.stock}</td>

          <td>

            <span
              className={`px-3 py-1 rounded-full text-white text-sm
              ${
                product.status === "In Stock"
                  ? "bg-green-600"
                  : product.status === "Low Stock"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
            >
              {product.status}
            </span>

          </td>

          <td className="py-3">

  <button
  onClick={() => {
    setForm(product);
    setEditingId(product.id);
    setShowForm(true);
  }}
  className="text-green-600 hover:text-green-800 text-xl mr-5"
>
  <FaEdit />
</button>
<button
  onClick={async () => {
    try {
      await axios.delete(
        `http://localhost:5000/products/${product.id}`
      );
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  }}
  className="text-red-600 hover:text-red-800 text-xl"
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
  {editingId !== null ? "Edit Product" : "Add Product"}
</h2>


<input
type="text"
placeholder="SKU Code"
value={form.sku}
onChange={(e)=>setForm({...form,name:e.target.value})}
className="w-full border p-3 rounded-lg mb-4"
/>

<input
type="text"
placeholder="Product Name"
value={form.product_name}
onChange={(e)=>setForm({...form,product_name:e.target.value})}
className="w-full border p-3 rounded-lg mb-4"
/>

<input
type="text"
placeholder="Category"
value={form.category}
onChange={(e)=>setForm({...form,category:e.target.value})}
className="w-full border p-3 rounded-lg mb-4"
/>

<input
type="number"
placeholder="Price"
value={form.price}
onChange={(e)=>setForm({...form,price:e.target.value})}
className="w-full border p-3 rounded-lg mb-4"
/>

<input
type="number"
placeholder="Stock Quantity"
value={form.stock}
onChange={(e)=>setForm({...form,stock:e.target.value})}
className="w-full border p-3 rounded-lg mb-4"
/>

<select
value={form.status}
onChange={(e)=>setForm({...form,status:e.target.value})}
className="w-full border p-3 rounded-lg mb-6"
>

<option value="In Stock">In Stock</option>

<option value="Low Stock">Low Stock</option>

<option value="Out of Stock">Out of Stock</option>

</select>

<div className="flex justify-end gap-3">

<button
onClick={async  ()=>setShowForm(false)}
className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
>

Cancel

</button>

<button
onClick={async () => {
  try {
    if (editingId === null) {
      await axios.post("http://localhost:5000/products", form);
    } else {
      await axios.put(
        `http://localhost:5000/products/${editingId}`,
        form
      );
    }

    fetchProducts();

    setShowForm(false);

    setEditingId(null);

    setForm({
      sku: "",
      product_name: "",
      category: "",
      price: "",
      stock: "",
      status: "In Stock",
    });

  } catch (err) {
    console.log(err);
  }
}}
className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
>

Save Product

</button>

</div>

</div>

</div>

)}
</div>
  );
}
export default Products;